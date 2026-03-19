const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const version = process.argv[2] || '6.8.8.0';
const variant = process.argv[3] || 'audio';
const libavRoot = path.join(__dirname, '..', '..', '..');
const distDir = path.join(libavRoot, 'src', 'libav.js', 'dist');
const outBaseDir = path.join(libavRoot, 'dist', `libav-${version}-${variant}`);

if (!fs.existsSync(outBaseDir)) {
    fs.mkdirSync(outBaseDir, { recursive: true });
}

// Group into the 6 engines
const engines = [
    { name: 'asm.js', files: [`libav-${version}-${variant}.asm.js`, `libav-${version}-${variant}.js`], main: `libav-${version}-${variant}.js`, format: 'cjs' },
    { name: 'asm.mjs', files: [`libav-${version}-${variant}.asm.mjs`, `libav-${version}-${variant}.mjs`], main: `libav-${version}-${variant}.mjs`, format: 'esm' },
    { name: 'wasm.js', files: [`libav-${version}-${variant}.wasm.js`, `libav-${version}-${variant}.wasm.wasm`, `libav-${version}-${variant}.js`], main: `libav-${version}-${variant}.js`, format: 'cjs' },
    { name: 'wasm.mjs', files: [`libav-${version}-${variant}.wasm.mjs`, `libav-${version}-${variant}.wasm.wasm`, `libav-${version}-${variant}.mjs`], main: `libav-${version}-${variant}.mjs`, format: 'esm' },
    { name: 'thr.js', files: [`libav-${version}-${variant}.thr.js`, `libav-${version}-${variant}.thr.wasm`, `libav-${version}-${variant}.js`], main: `libav-${version}-${variant}.js`, format: 'cjs' },
    { name: 'thr.mjs', files: [`libav-${version}-${variant}.thr.mjs`, `libav-${version}-${variant}.thr.wasm`, `libav-${version}-${variant}.mjs`], main: `libav-${version}-${variant}.mjs`, format: 'esm' }
];

engines.forEach(engine => {
    const engineDirName = `libav-${version}-${variant}.${engine.name}`;
    const engineDir = path.join(outBaseDir, engineDirName);
    const engineDistDir = path.join(engineDir, 'dist');
    
    if (!fs.existsSync(engineDistDir)) {
        fs.mkdirSync(engineDistDir, { recursive: true });
    }

    engine.files.forEach(file => {
        const srcPath = path.join(distDir, file);
        const destPath = path.join(engineDistDir, file);
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
        } else {
            console.warn(`Warning: File ${file} does not exist for engine ${engine.name}`);
        }
    });

    const isEsm = engine.format === 'esm';
    
    const pkg = {
        "name": `@divortio/libav.js-${variant}-${engine.name.replace('.', '-')}`,
        "version": version,
        "description": `Custom libav.js build for audio manipulation. Engine: ${engine.name}`,
        "main": `dist/${engine.main}`,
        "directories": {
            "test": "tests"
        },
        "repository": {
            "type": "git",
            "url": `git+https://github.com/divortio/libav.js-${variant}.git`
        },
        "keywords": ["ffmpeg", "libav", "audio", "video", "av", "encode", "decode", "transcode", "mux", "demux"],
        "author": "divortio",
        "bugs": {
            "url": `https://github.com/divortio/libav.js-${variant}/issues`
        },
        "homepage": `https://github.com/divortio/libav.js-${variant}#readme`
    };

    if (isEsm) {
        pkg.type = "module";
        pkg.exports = {
            "import": `./dist/${engine.main}`,
            "default": `./dist/${engine.main}`
        };
    } else {
        pkg.exports = {
            "require": `./dist/${engine.main}`,
            "default": `./dist/${engine.main}`
        };
    }

    fs.writeFileSync(path.join(engineDir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
    
    // Create zip for this engine variant securely intuitively cleanly
    execSync(`zip -r ../${engineDirName}.zip .`, { cwd: engineDir });

    console.log(`Packaged and zipped ${engineDirName} successfully.`);
});

console.log('All builds packaged successfully.');

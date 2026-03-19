import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function validateBuild(engineName, variant = 'audio', version = '6.8.8.0') {
    const pkgDir = path.join(__dirname, 'vendor', 'libav.js', 'dist', `libav-${version}-${variant}`, `libav-${version}-${variant}.${engineName}`);
    const pkgFile = path.join(pkgDir, 'package.json');
    if (!fs.existsSync(pkgFile)) {
        throw new Error(`Package directory not found: ${pkgDir}`);
    }

    // Read package to find entry
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
    const entryPath = path.join(pkgDir, pkg.main);

    if (!fs.existsSync(entryPath)) {
        throw new Error(`Entry file not found: ${entryPath}`);
    }

    try {
        let LibAVFactory;
        
        if (engineName.endsWith('.mjs')) {
            // ESM dynamic import
            // Need to use file:// protocol for absolute paths in Node
            const module = await import(`file://${entryPath}`);
            LibAVFactory = module.default || module;
        } else {
            // CJS require
            const { createRequire } = await import('module');
            const req = createRequire(import.meta.url);
            LibAVFactory = req(entryPath);
        }

        if (!LibAVFactory || typeof LibAVFactory.LibAV !== 'function') {
            throw new Error('LibAV factory not exported correctly.');
        }

        // Initialize LibAV instance without web workers (force node/direct mode for basic node test)
        const libav = await LibAVFactory.LibAV({ noworker: true }); 
        
        if (!libav || typeof libav.ff_init_demuxer_file !== 'function') {
            throw new Error('LibAV instance failed to initialize or missing expected demuxer methods.');
        }

        // Terminate instance successfully
        await libav.terminate(); 
        
        return true;
    } catch (err) {
        throw new Error(`Integration testing failed for engine ${engineName}: ${err.message}`);
    }
}

import test from 'node:test';
import assert from 'node:assert';
import { validateBuild } from './validateBuilds.mjs';

const engines = [
    'asm.js',
    'asm.mjs',
    'wasm.js',
    'wasm.mjs',
    'thr.js',
    'thr.mjs'
];

test('libav.js advanced audio packaging validation', async (t) => {
    for (const engine of engines) {
        await t.test(`Successfully imports and triggers ${engine} libav instance`, async () => {
             const result = await validateBuild(engine);
             assert.strictEqual(result, true);
        });
    }
});

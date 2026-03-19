# Local FFmpeg Builder Graph

`libav.js` represents the foundational upstream engine block that recursively compiles raw `ffmpeg` via the `emscripten/emsdk` native architecture toolchain down to 6 respective JS targets simultaneously.

## Execution Sequence

In order to construct local development structures, launch the master sequential orchestration tool from the project root:

```sh
# Connects to docker locally to pull compilation dependencies and compiles standard FFmpeg 8.0 natively
bash ./build/sync_and_build.sh
```

### Script Behaviors
- **00_SYNC / 01_PATCH** - Reserved for structurally modifying `libav.js` (un-used natively).
- **02_CONFIG** - Computes `generate_fragments.js` specifying the explicit `demuxer`/`decoder`/`muxer`/`filter` array boundaries that are injected into WebAssembly payloads reducing compilation size targets massively.
- **03_BUILD** - Launches an inline `docker run --rm emscripten/emsdk` targeting the `ROOT_DIR/src/libav.js` C-extensions graph natively triggering compilation via the configurations above!
- **04_VALIDATE & 05_TEST** - Triggers `node:test` sequences evaluating that `.ff_init_demuxer_file` natively mounts and functions properly against all 6 outputted distributions!
- **06_PACKAGE** - Bundles the `.zip` artifacts mapping out the variants explicitly into `dist/libav-x...`.

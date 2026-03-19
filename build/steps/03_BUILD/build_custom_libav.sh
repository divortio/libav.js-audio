#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd "$DIR/../../.." && pwd )"

echo "Generating custom fragment configuration..."
FRAG_JSON=$(node "$DIR/../02_CONFIG/generate_fragments.js")

echo "Building custom libav.js (audio variant) with FFmpeg 8.0 inside Docker (emscripten/emsdk)..."

docker run --rm -v "$ROOT_DIR/src/libav.js":/src -v "$DIR/../02_CONFIG/generate_fragments.js":/src/configs/generate_fragments.js emscripten/emsdk bash -c "
  apt-get update && apt-get install -y pkg-config && \
  cd /src/configs && \
  node mkconfig.js audio '${FRAG_JSON}' && \
  cd .. && \
  make build-audio
"

echo "Done! The compiled outputs are mapped back to the host at $ROOT_DIR/src/libav.js/dist/"

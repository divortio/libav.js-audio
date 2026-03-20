#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$DIR")"

echo "Executing LibAV custom build steps sequentially..."

# 00_SYNC
echo "--- Running Step 00_SYNC ---"
if [ -d "$DIR/steps/00_SYNC" ]; then
    cd "$DIR/steps/00_SYNC"
    for script in *.sh; do [ -f "$script" ] && bash "$script"; done
fi

# 01_PATCH
echo "--- Running Step 01_PATCH ---"
if [ -d "$DIR/steps/01_PATCH" ]; then
    cd "$DIR/steps/01_PATCH"
    for script in *.sh; do [ -f "$script" ] && bash "$script"; done
fi

# 02_CONFIG
echo "--- Running Step 02_CONFIG ---"
cd "$DIR/steps/02_CONFIG"
if [ -f "generate_fragments.js" ]; then node generate_fragments.js; fi

# 03_BUILD
echo "--- Running Step 03_BUILD ---"
cd "$DIR/steps/03_BUILD"
if [ -f "build_custom_libav.sh" ]; then bash build_custom_libav.sh; fi

# 04_PACKAGE
echo "--- Running Step 04_PACKAGE ---"
cd "$DIR/steps/06_PACKAGE"
if [ -f "package_builds.js" ]; then node package_builds.js; fi

# 05_VALIDATE
echo "--- Running Step 05_VALIDATE ---"
cd "$DIR/steps/04_VALIDATE"
if [ -f "validateBuilds.test.mjs" ]; then node --test validateBuilds.test.mjs; fi

# 06_TEST
echo "--- Running Step 06_TEST ---"
cd "$DIR/steps/05_TEST"
if [ -f "testBuilds.test.mjs" ]; then node --test testBuilds.test.mjs; fi

echo "LibAV build pipeline completed successfully!"

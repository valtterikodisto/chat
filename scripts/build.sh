#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
UI_DIR="$ROOT_DIR/packages/ui"
SERVER_DIR="$ROOT_DIR/packages/server"
TYPES_DIR="$ROOT_DIR/packages/types"

rm -rf "$SERVER_DIR/public/*" && \
cd "$TYPES_DIR" && npm run build && \
cd "$UI_DIR" && npm install && npm run build && \
cp -a "$UI_DIR/build/." "$SERVER_DIR/public/" && \
cd "$SERVER_DIR" && npm run build

#!/usr/bin/env bash
set -e
echo "Checking Node.js"; node -v || true
echo "Checking npm"; npm -v || true
echo "Checking FFmpeg"; ffmpeg -version >/dev/null 2>&1 || echo "Install via: sudo apt install ffmpeg"
echo "Checking Playwright Chromium"; npx playwright install chromium
test -w renders && echo "renders writable" || echo "renders not writable"

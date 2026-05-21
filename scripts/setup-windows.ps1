Write-Host "Checking Node.js"; node -v
Write-Host "Checking npm"; npm -v
Write-Host "Checking FFmpeg"; ffmpeg -version
Write-Host "Checking Playwright Chromium"; npx playwright install chromium
if (Test-Path renders) { Write-Host "renders exists" }

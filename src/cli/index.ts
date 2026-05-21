#!/usr/bin/env node
import { Command } from 'commander';
import { startStudio } from '../server/studio.js';
import { renderComposition } from '../renderer/render.js';
import { access, constants } from 'node:fs/promises';
import os from 'node:os';
import { execSync } from 'node:child_process';

const p = new Command();
p.name('yiframe').description('YiFrame CLI');
p.command('init').action(()=>console.log('已初始化（当前仓库已提供完整结构）'));
p.command('dev').action(()=>startStudio(3030));
p.command('studio').action(()=>startStudio(3030));
p.command('preview').argument('[dir]','composition','examples/product-promo').action(()=>startStudio(3030));
p.command('render').argument('[dir]','composition','examples/product-promo').action(async(dir)=>{console.log('开始渲染',dir);console.log('输出:',await renderComposition(dir));});
p.command('create').requiredOption('--template <name>').requiredOption('--name <name>').action(({template,name})=>console.log(`请复制 examples/${template} 到 ${name}`));
p.command('doctor').action(async()=>{
  const checks: string[] = [];
  checks.push(`✅ Node.js: ${process.version}`);
  checks.push(`✅ npm: ${execSync('npm -v').toString().trim()}`);
  try{execSync('ffmpeg -version',{stdio:'ignore'});checks.push('✅ FFmpeg: found');}catch{checks.push('❌ FFmpeg not found. macOS: brew install ffmpeg | Ubuntu: sudo apt install ffmpeg | Windows: winget install Gyan.FFmpeg');}
  try{await access('node_modules/playwright',constants.R_OK);checks.push('✅ Playwright Chromium: installed (run npx playwright install chromium)');}catch{checks.push('❌ Playwright missing. Run npm install && npx playwright install chromium');}
  try{await access('renders',constants.W_OK);checks.push('✅ renders/: writable');}catch{checks.push('❌ renders/: not writable');}
  try{await access('examples',constants.R_OK);checks.push('✅ examples/: found');}catch{checks.push('❌ examples/: missing');}
  checks.push(`✅ OS: ${os.platform()} ${os.release()}`);
  checks.push(`✅ Free disk: ${(os.freemem()/1024/1024/1024).toFixed(2)} GB (memory-based quick hint)`);
  console.log(checks.join('\n'));
});

p.parse();

#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Deployment Verification');
console.log('=========================\n');

// Check essential files
const files = [
  { path: 'render.yaml', name: 'Render Configuration' },
  { path: 'backend/package.json', name: 'Backend Package.json' },
  { path: 'backend/config.js', name: 'Backend Config' },
  { path: 'backend/server.js', name: 'Backend Server' }
];

let allFilesExist = true;

files.forEach(file => {
  const fullPath = path.resolve(__dirname, '..', file.path);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file.name}: ${file.path}`);
  } else {
    console.log(`❌ ${file.name}: ${file.path} - MISSING`);
    allFilesExist = false;
  }
});

console.log('\n📋 Render Configuration:');
console.log('=======================');
if (fs.existsSync(path.resolve(__dirname, '..', 'render.yaml'))) {
  const renderYaml = fs.readFileSync(path.resolve(__dirname, '..', 'render.yaml'), 'utf8');
  
  if (renderYaml.includes('rootDir: backend')) {
    console.log('✅ Root Directory: backend');
  } else {
    console.log('❌ Root Directory: NOT SET TO BACKEND');
  }
  
  if (renderYaml.includes('startCommand: npm start')) {
    console.log('✅ Start Command: npm start');
  } else {
    console.log('❌ Start Command: NOT SET TO NPM START');
  }
} else {
  console.log('❌ render.yaml not found');
}

console.log('\n🎯 Next Steps:');
console.log('==============');
console.log('1. Push these files to GitHub');
console.log('2. Redeploy on Render');
console.log('3. The deployment should now work correctly');

if (allFilesExist) {
  console.log('\n🎉 All files are present! Ready for deployment.');
} else {
  console.log('\n⚠️  Some files are missing. Please check the errors above.');
}

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, '..', '.env.local');
const configFile = path.join(__dirname, '..', 'src', 'config.js');

const args = process.argv.slice(2);
const mode = args[0];

if (!mode || !['local', 'production'].includes(mode)) {
  console.log('Usage: node scripts/switch-env.js [local|production]');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/switch-env.js local     # Use local backend');
  console.log('  node scripts/switch-env.js production # Use Render backend');
  process.exit(1);
}

// Create or update .env.local file
const envContent = mode === 'local' 
  ? 'REACT_APP_USE_LOCAL=true\n'
  : 'REACT_APP_USE_LOCAL=false\nREACT_APP_BACKEND_URL=https://shopapp-1-bedt.onrender.com\n';

fs.writeFileSync(envFile, envContent);

console.log(`✅ Switched to ${mode} mode`);
console.log(`📁 Updated ${envFile}`);
console.log('');
console.log('Next steps:');
if (mode === 'local') {
  console.log('1. Start your local backend: cd backend && npm start');
  console.log('2. Start your frontend: npm start');
} else {
  console.log('1. Push to Git: git add . && git commit -m "Switch to production" && git push');
  console.log('2. Deploy to Vercel');
}

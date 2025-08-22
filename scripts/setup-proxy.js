import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update frontend proxy configuration
export const updateFrontendProxy = () => {
  const frontendPackagePath = path.join(__dirname, '../frontend/package.json');
  
  try {
    // Read the current package.json
    const packageJson = JSON.parse(fs.readFileSync(frontendPackagePath, 'utf8'));
    
    // Update the proxy to use the backend URL from config
    packageJson.proxy = config.backend.url;
    
    // Write back to package.json
    fs.writeFileSync(frontendPackagePath, JSON.stringify(packageJson, null, 2));
    
    console.log(`✅ Frontend proxy updated to: ${config.backend.url}`);
  } catch (error) {
    console.error('❌ Error updating frontend proxy:', error.message);
  }
};

// Function to display current configuration
export const showConfig = () => {
  console.log('\n📋 Current Configuration:');
  console.log('========================');
  console.log(`Backend Port: ${config.backend.port}`);
  console.log(`Frontend Port: ${config.frontend.port}`);
  console.log(`Backend URL: ${config.backend.url}`);
  console.log(`Frontend URL: ${config.frontend.url}`);
  console.log(`Environment: ${config.env}`);
  console.log('========================\n');
};

// Run if this script is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  updateFrontendProxy();
  showConfig();
}

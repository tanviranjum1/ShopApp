import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

console.log('🔧 Setting up environment variables...\n');

// Check if .env file exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
} else {
  // Create .env file with default values
  const envContent = `# Environment Variables for ProShop App
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/proshop
JWT_SECRET=abc123
PAYPAL_CLIENT_ID=your_paypal_client_id_here
BACKEND_PORT=5000
FRONTEND_PORT=3000

# Optional: Use MongoDB Atlas instead of local MongoDB
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/proshop?retryWrites=true&w=majority
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file with default values');
    console.log('📝 Please update the .env file with your actual values:');
    console.log('   - MONGO_URI: Your MongoDB connection string');
    console.log('   - JWT_SECRET: A secure random string for JWT tokens');
    console.log('   - PAYPAL_CLIENT_ID: Your PayPal client ID (optional)');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }
}

// Create .env.example file
const envExampleContent = `# Environment Variables for ProShop App
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/proshop
JWT_SECRET=your_jwt_secret_here
PAYPAL_CLIENT_ID=your_paypal_client_id_here
BACKEND_PORT=5000
FRONTEND_PORT=3000

# MongoDB Atlas Example:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/proshop?retryWrites=true&w=majority
`;

try {
  fs.writeFileSync(envExamplePath, envExampleContent);
  console.log('✅ Created .env.example file');
} catch (error) {
  console.error('❌ Error creating .env.example file:', error.message);
}

console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running locally on port 27017');
console.log('2. Or update MONGO_URI in .env to use MongoDB Atlas');
console.log('3. Update JWT_SECRET with a secure random string');
console.log('4. Run "npm run dev" to start the application');
console.log('\n🔗 MongoDB Setup:');
console.log('- Local: https://docs.mongodb.com/manual/installation/');
console.log('- Atlas: https://www.mongodb.com/cloud/atlas');

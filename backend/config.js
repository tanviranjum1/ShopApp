import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in backend directory (if dotenv is available)
const backendEnvPath = path.resolve(__dirname, '.env');
const rootEnvPath = path.resolve(__dirname, '..', '.env');

console.log('🔍 Looking for .env file at:', backendEnvPath);

// Try to load dotenv if available
try {
  const dotenv = await import('dotenv');
  if (fs.existsSync(backendEnvPath)) {
    console.log('✅ Backend .env file found');
    dotenv.default.config({ path: backendEnvPath });
  } else if (fs.existsSync(rootEnvPath)) {
    console.log('✅ Root .env file found');
    dotenv.default.config({ path: rootEnvPath });
  } else {
    console.log('❌ No .env file found');
    console.log('ℹ️  Environment variables will be loaded from Render environment variables');
  }
} catch (error) {
  console.log('ℹ️  dotenv not available, using environment variables directly');
}

// Check if MONGO_URI is available
if (!process.env.MONGO_URI) {
  console.log('⚠️  MONGO_URI not found in .env, please set it manually');
  console.log('   You can set it by running:');
  console.log('   $env:MONGO_URI="your_mongodb_connection_string"');
  console.log('   Or create a .env file in the backend directory with: MONGO_URI=your_connection_string');
  console.log('   Or set it as an environment variable in Render');
} else {
  console.log('✅ MONGO_URI loaded successfully');
}

// Centralized configuration for the backend application
export const config = {
  // Backend configuration
  backend: {
    port: process.env.BACKEND_PORT || process.env.PORT || 5000,
    host: process.env.BACKEND_HOST || '0.0.0.0',
    url: process.env.BACKEND_URL || `http://localhost:${process.env.BACKEND_PORT || process.env.PORT || 5000}`
  },
  
  // Database configuration - Use environment variable or localhost fallback
  database: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/proshop'
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_here'
  },
  
  // PayPal configuration
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || 'test'
  },
  
  // Environment
  env: process.env.NODE_ENV || 'development'
};

// Helper function to get backend URL
export const getBackendUrl = () => {
  return config.backend.url;
};

// Helper function to get backend port
export const getBackendPort = () => {
  return config.backend.port;
};

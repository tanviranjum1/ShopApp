import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Environment configuration loaded');

// Load .env file manually without dotenv dependency
const loadEnvFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    console.log(`✅ Loading .env file from: ${filePath}`);
    const envContent = fs.readFileSync(filePath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim();
          // Only set if not already set in process.env
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    });
    return true;
  }
  return false;
};

// Try to load .env files from different locations
const backendEnvPath = path.resolve(__dirname, '.env');
const rootEnvPath = path.resolve(__dirname, '..', '.env');

console.log('🔍 Looking for .env files...');

if (loadEnvFile(backendEnvPath)) {
  console.log('✅ Backend .env file loaded');
} else if (loadEnvFile(rootEnvPath)) {
  console.log('✅ Root .env file loaded');
} else {
  console.log('❌ No .env file found');
  console.log('ℹ️  Environment variables will be loaded from system environment');
}

// Check if MONGO_URI is available
if (!process.env.MONGO_URI) {
  console.log('⚠️  MONGO_URI not found in environment variables');
  console.log('   Please set MONGO_URI as an environment variable in Render');
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

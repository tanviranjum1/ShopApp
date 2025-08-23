import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Environment configuration loaded');

// Check if MONGO_URI is available
if (!process.env.MONGO_URI) {
  console.log('⚠️  MONGO_URI not found in .env, please set it manually');
  console.log('   You can set it by running:');
  console.log('   $env:MONGO_URI="your_mongodb_connection_string"');
  console.log('   Or create a .env file in the root directory with: MONGO_URI=your_connection_string');
} else {
  console.log('✅ MONGO_URI loaded successfully');
}

console.log('MONGO_URI from process.env:', process.env.MONGO_URI ? 'Set' : 'Not set');

// Centralized configuration for the application
export const config = {
  // Backend configuration
  backend: {
    port: process.env.BACKEND_PORT || 5000,
    host: process.env.BACKEND_HOST || '127.0.0.1',
    url: process.env.BACKEND_URL || `http://127.0.0.1:${process.env.BACKEND_PORT || 5000}`
  },
  
  // Frontend configuration
  frontend: {
    port: process.env.FRONTEND_PORT || 3000,
    host: process.env.FRONTEND_HOST || 'localhost',
    url: process.env.FRONTEND_URL || `http://localhost:${process.env.FRONTEND_PORT || 3000}`
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
    clientId: process.env.PAYPAL_CLIENT_ID || 'test' // Use 'test' for development to avoid PayPal SDK errors
  },
  
  // Environment
  env: process.env.NODE_ENV || 'development'
};

// Helper function to get backend URL
export const getBackendUrl = () => {
  return config.backend.url;
};

// Helper function to get frontend URL
export const getFrontendUrl = () => {
  return config.frontend.url;
};

// Helper function to get backend port
export const getBackendPort = () => {
  return config.backend.port;
};

// Helper function to get frontend port
export const getFrontendPort = () => {
  return config.frontend.port;
};

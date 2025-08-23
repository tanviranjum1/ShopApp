// Environment configuration
const isLocal = process.env.REACT_APP_USE_LOCAL === 'true' || process.env.NODE_ENV === 'development';

const config = {
  // Use local backend if REACT_APP_USE_LOCAL=true, otherwise use production backend
  API_BASE_URL: isLocal ? '' : (process.env.REACT_APP_BACKEND_URL || 'https://shopapp-1-bedt.onrender.com'),
};

// Debug logging
console.log('Environment:', process.env.NODE_ENV);
console.log('Use Local Backend:', isLocal);
console.log('API_BASE_URL:', config.API_BASE_URL);

export default config;

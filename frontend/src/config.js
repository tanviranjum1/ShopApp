// Environment configuration
const isLocal = (typeof process !== 'undefined' && process.env.REACT_APP_USE_LOCAL === 'true') || 
                (typeof process !== 'undefined' && process.env.NODE_ENV === 'development');

const config = {
  // Use local backend if REACT_APP_USE_LOCAL=true, otherwise use production backend
  API_BASE_URL: isLocal ? '' : ((typeof process !== 'undefined' && process.env.REACT_APP_BACKEND_URL) || 'https://shopapp-2-whxu.onrender.com'),
};

// Debug logging (only in development)
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Use Local Backend:', isLocal);
  console.log('API_BASE_URL:', config.API_BASE_URL);
}

export default config;

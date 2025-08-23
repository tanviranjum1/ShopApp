const config = {
  // Use environment variable for production, fallback to proxy for development
  API_BASE_URL: process.env.REACT_APP_BACKEND_URL || (process.env.NODE_ENV === 'development' ? '' : 'https://shopapp-1-bedt.onrender.com'),
};

export default config;

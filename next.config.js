const path = require('path');

module.exports = () => {
  return {
    eslint: {
      dirs: ['src/pages', 'src/components', 'src/actions'],
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'src/styles')],
    },
    // if we want to exposed env to client side
    publicRuntimeConfig:{
      UNSPLASH_API_BASE_URL: process.env.UNSPLASH_API_BASE_URL,
      SPLASH_CLIENT_ID: process.env.CLIENT_ID
    },
    env: {
      SPLASH_CLIENT_ID: process.env.CLIENT_ID,
      UNSPLASH_API_BASE_URL: process.env.UNSPLASH_API_BASE_URL,
      HEROKU_API_BASE_URL: process.env.HEROKU_API_BASE_URL,
    }
  };
}
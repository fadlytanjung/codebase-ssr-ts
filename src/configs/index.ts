const configs: Record<string, string | undefined | number> = {
  BASE_URL_API: process.env.API_BASE_URL,
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  SPLASH_CLIENT_ID: process.env.SPLASH_CLIENT_ID,
  UNSPLASH_API_BASE_URL: process.env.UNSPLASH_API_BASE_URL,
  HEROKU_API_BASE_URL: process.env.HEROKU_API_BASE_URL,
};

export default configs;
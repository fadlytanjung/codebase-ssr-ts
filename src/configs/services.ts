import configs from '.';

const services = {
  GET_COLLECTIONS_ALBUM: () => `${configs.UNSPLASH_API_BASE_URL}collections`,
  LOGIN: () => `${configs.HEROKU_API_BASE_URL}auth/login`,
  GET_ALBUM: (id?: unknown) => 
    `${configs.HEROKU_API_BASE_URL}v1/albums${id ? `/${id}` : ''}`
}

export default services;
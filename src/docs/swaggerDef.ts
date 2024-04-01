import config from '../config/config';
const { version } = require('../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Doucmentação da API',
    version,
    license: {
      name: 'MIT',
      url: '',
    },
  },
  
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef;

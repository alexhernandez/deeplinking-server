// SERVER CONFIG

const env = process.env.NODE_ENV || 'development'; // development | production
const isProd = env === 'production';
const isDev = env === 'development';

const scheme = 'https';
const host = 'localhost';
const domain = 'example.com';
const port = 443;

const examplePrefix = isProd ? 'www' : 'stage';

module.exports = {
  env,
  isProd,
  isDev,
  scheme,
  host,
  domain,
  port,
  examplePrefix,
};

export default {
  env: 'production',
  db: 'mongodb://localhost/mrdb-prod',
  port: 3000,
  salt: 'abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  unsecureUrls: [
    '/api/users/login'
  ]
};

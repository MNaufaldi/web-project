const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api', '/auth/test'],
    createProxyMiddleware({
      target: 'http://localhost:3000',
    })
  );
};
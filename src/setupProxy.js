const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/top',
    createProxyMiddleware( {
      target: 'https://api.themoviedb.org/3/movie/top_rated?api_key='+process.env.API_KEY,
      changeOrigin: true,
      logLevel: 'debug',
      prependPath: true,
      ignorePath: true,
    })
  );
};
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://localhost:7058',
            changeOrigin: true,
            secure: false
        })
    );
    // app.use(
    //     '/authentication',
    //     createProxyMiddleware({
    //         target: 'https://localhost:7058',
    //         changeOrigin: true,
    //         secure: false
    //     })
    // );

};
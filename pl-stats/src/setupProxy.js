const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/scoreman", {
      target: "https://www.scoreman.vip",
      pathRewrite: {
        "^/scoreman": "",
      },
      changeOrigin: true,
    })
  );
};

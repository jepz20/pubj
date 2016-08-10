
var
  app, server,
  express = require('express'),
  favicon = require('serve-favicon'),
  path = require('path'),
  host = process.env.HOST || '127.0.0.1',
  port = process.env.PORT || 5000,
  root = path.resolve(__dirname);

app = express();
app.use(function (req, res, next) {
  console.log(req.url);
  next();
});

app.use(express.static(root + '/dist', {
  maxAge: '365 days',
  setHeaders: function (res, path) {
    if (path.indexOf('service-worker.js') != -1) {
      res.setHeader('Cache-Control', 'public, max-age=0');
    }
  },
}));
app.use(favicon(__dirname + '/images/favicon.ico'));
server = app.listen(port, host, serverStarted);

function serverStarted() {
  console.log('Server started', host, port);
  console.log('Root directory', root);
  console.log('Press Ctrl+C to exit...\n');
};

const express = require('express');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const config = require('./src/config');
const { checkHostsFile, checkSSLCert } = require('./src/utils');

// DEEPLINK SERVER
const app = express();
const { scheme, host, port } = config;
const hasHosts = checkHostsFile(host);
const { hasSSLCert, credentials } = checkSSLCert();
const hasHTTPS = scheme === 'https' && hasSSLCert;

// CONFIGURE HEADERS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  }

  next();
});

// REGISTER ROUTES
const aasa = fs.readFileSync(path.resolve(__dirname, 'static/.well-known/apple-app-site-association'), 'utf8');

app.get(['/apple-app-site-association', '/.well-known/apple-app-site-association'], function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send(aasa);
});

app.get('*', function (req, res) {
  res.send('Server - Hello World 👋');
});

// APP REGISTER
const server = hasHTTPS ? https.createServer(credentials, app) : http.createServer(app);

// APP LISTEN
server.listen(port, function () {

  if (!hasHosts) {
    console.log(chalk.bold.red('\nSERVER - Requirements Missing 🚫'));
    server.close();
  } else if (hasHTTPS) {
    console.log(chalk.bold('\nSERVER 👋'));
    console.log(chalk.bold.blue(`Listening on https://${host}:${port}`));
  } else {
    console.log(chalk.bold('\nSERVER 👋'));
    console.log(chalk.bold.blue(`Listening on http://${host}:${port}`));
  }

});

#!/usr/bin/env node

const { resolve } = require('path');
const history = require('connect-history-api-fallback');
const express = require('express');
const configureAPI = require('../server/app');

const app = express();

const PORT = process.env.ACCOUNTS_PORT;

// API
configureAPI(app);

// UI
const publicPath = resolve(__dirname, '../../dist');
const staticConf = { maxAge: '1y', etag: false };

app.use(express.static(publicPath, staticConf));
app.use('/', history());

// Go
app.listen(PORT, () => console.log(`App running on port ${PORT}!`));

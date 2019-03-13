'use strict';

const express = require('express');
const createAccount = require('../controllers/account/create-account');
const activateAccount = require('../controllers/account/activate-account');
const login = require('../controllers/account/login');
const search = require('../controllers/user/search-users');

const accountRouter = express.Router();

accountRouter.post('/account', createAccount);
accountRouter.get('/account/activate', activateAccount);
accountRouter.post('/account/login', login);
accountRouter.get('/account/search', search);

module.exports = accountRouter;

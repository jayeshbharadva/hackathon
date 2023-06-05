const express = require('express');
const validateToken = require("../middleware/companyauth")
const {companylist,addcompany,companylogin,hackbycid} = require('./company.controller');

const companyrouter = express.Router();

companyrouter.get('/',companylist);
companyrouter.post('/',addcompany);
companyrouter.post('/login',companylogin);
companyrouter.get('/hacklist',validateToken, hackbycid);

module.exports = companyrouter;
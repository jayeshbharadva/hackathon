const express = require("express");
const upload = require('express-fileupload');

const {httphacklist,httpaddhack,httphackbyparamid} = require("./hackathon.controller");
const companytoken = require("../middleware/companyauth");

const hackrouter = express.Router();
hackrouter.use(upload());
hackrouter.get('/',httphacklist);
hackrouter.post('/', companytoken, httpaddhack);
hackrouter.get('/:id',httphackbyparamid);

module.exports = hackrouter;
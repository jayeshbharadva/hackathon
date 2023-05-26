const express = require("express");

const {httphacklist,httpaddhack,httphackbyparamid} = require("./hackathon.controller");
const companytoken = require("../middleware/companyauth");

const hackrouter = express.Router();

hackrouter.get('/',httphacklist);
hackrouter.post('/', companytoken, httpaddhack);
hackrouter.get('/:id',httphackbyparamid);

module.exports = hackrouter;
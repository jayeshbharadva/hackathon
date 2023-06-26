const express = require("express");

const {httphacklist,httpaddhack,httphackbyparamid,httphackbyhid} = require("./hackathon.controller");
const companytoken = require("../middleware/companyauth");
const upload = require('../middleware/upload');

const hackrouter = express.Router();

hackrouter.get('/',httphacklist);
hackrouter.post('/', companytoken, upload.single("file"),httpaddhack);
hackrouter.get('/:id',httphackbyparamid);
hackrouter.post('/hackbyid',httphackbyhid);

module.exports = hackrouter;
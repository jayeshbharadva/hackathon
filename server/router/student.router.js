const express = require("express");

const studentrouter = express.Router();

const {httpaddstudent,httplogin,httphacklist,httppartinhackathon,httpstudentinfo,httpstudent,httpstudenthackparticipated,httpreturnname} = require("./student.controller");
const studentauth = require('../middleware/studentauth');
const companyauth = require('../middleware/companyauth');

studentrouter.post('/', httpaddstudent);
studentrouter.post('/login',httplogin);
studentrouter.get('/hackpart',studentauth,httpstudenthackparticipated);
studentrouter.get('/hacklist',httphacklist);
studentrouter.post('/partinhackathon',studentauth,httppartinhackathon);
studentrouter.get('/returnname',studentauth,httpreturnname);
studentrouter.post('/studentinfo',companyauth,httpstudentinfo);
studentrouter.get('/:id',companyauth,httpstudent);

module.exports = studentrouter;
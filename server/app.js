const express = require('express');
const cors = require("cors");
require('dotenv').config();
const session = require('express-session');


const app = express();

app.use(cors());

const companyrouter = require("./router/company.router");
const hackrouter = require("./router/hackathon.router");
const studentrouter = require("./router/student.router");

app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'jayesh', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, 
}));
app.use(cors());
app.use(express.json());
app.use('/company',companyrouter);
app.use('/hack',hackrouter);
app.use('/student',studentrouter);

module.exports = app;

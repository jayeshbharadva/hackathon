const http = require("http");
const mongoose = require('mongoose');

const app = require('./app');

require('dotenv').config();

const PORT = 3007;
// const mongo_url = "mongodb://0.0.0.0:27017/hmsdb";
const mongo_url = 'mongodb+srv://jayesh:jayesh@hmsdb.lm6yh9l.mongodb.net/?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open',()=>{
    console.log('connection made successfully');
});

mongoose.connection.on('error',(err)=>{
    console.log(err);
});

async function startserver(){
    await mongoose.connect(
        mongo_url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
    );

    server.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}...`);
    })
}

startserver();
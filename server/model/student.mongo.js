const mongoose = require("mongoose");

const studentschema = mongoose.Schema({
    sid:{
        type: Number,
        required: true,
        unique: true,
    },
    sname:{
        type: String,
        required: true,
    },
    spassword:{
        type: String,
        required: true,
    },
    semail:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('studentlist', studentschema);
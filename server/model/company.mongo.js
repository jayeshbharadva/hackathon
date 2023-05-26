const mongoose = require("mongoose");

const companyschema = mongoose.Schema({
    cid:{
        type: Number,
        required: true,
        unique: true,
    },
    cname:{
        type: String,
        required: true,
    },
    cemail:{
        type: String,
        required: true,
    },
    cpassword:{
        type: String,
        required: true,
    },
    cdescription:{
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('companylist', companyschema);
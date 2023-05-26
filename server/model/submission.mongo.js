const mongoose = require("mongoose");

const submissionschema = mongoose.Schema({
    sid: {
        type: Number,
        required: true,
    },
    hid: {
        type: Number,
        required: true,
    },
    pid: {
        type: Number,
        required: true,
    },
    pname: {
        type: String,
        required: true,
    },
    abstract:{
        type:String,
        required:true,
    }
});

submissionschema.index({ sid: 1, hid: 1}, { unique: true });

module.exports = mongoose.model('submission', submissionschema);

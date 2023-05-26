const mongoose = require("mongoose");

const hackschema = mongoose.Schema({
    hid:{
        type: Number,
        required: true,
        unique: true,
    },
    hname:{
        type: String,
        required: true,
    },
    cid:{
        type: Number,
        required: true,
    },
    htagline:{
        type: String,
        required: false,
    },
    habout:{
        type: String,
        required: false,
    },
    hpfile:{
        type: String,
        required: false,
    },
    hlevel:{
        type: String,
        required: true,
    },
    hprize:{
        type: String,
        required: false,
    },
    hdescription:{
        type: String,
        required: false,
    },
    htech:{
        type: String,
        required: false,
    },
    hdates:{
        asdate:{
            type: Date,
            required: false,
        },
        aldate:{
            type: Date,
            required: false,
        },
        odate:{
            type: Date,
            required: false,
        },
        cdate:{
            type: Date,
            required: false,
        },
        rdate:{
            type: Date,
            required: false,
        },
    },
    hteamsize:{
        htmax:{
            type: Number,
            required: true,
        },
        htmin:{
            type: Number,
            required: true,
        }
    }
});

module.exports = mongoose.model('hacklist', hackschema);
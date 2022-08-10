const mongo = require('mongoose');

const schema = new mongo.Schema({
    name:{
        type: String,
        required: true
    },
    class:{
        type: String,
        required: true
    },
    section:{
        type: String,
        required: true
    },
    marks:{
        type: Number,
        required: true,
        max: 500
    }
});

const userDB = mongo.model('toppers', schema);
module.exports = userDB; 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    data: String,
    contentType: String
},
{ _id: false }
);

module.exports = imageSchema;

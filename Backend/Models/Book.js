const mongoose = require('mongoose');

const Bookschema = new mongoose.Schema({
    title : {type : String, required : true},
    isbn : {type : String, required : true},
    author : {type : String, required : true},
    description : String,
    published_date : Date,
    publisher : String,
    updated_date : { type : Date , default : Date.now},
    genre: { type: String, enum: ['Fiction','Non-Fiction','Science','Science Fiction','Fantasy','Biography','Mystery','History','Children','Self-Help','Romance'], required: true },
    image_path : String,
});
module.exports = mongoose.model("book",Bookschema);
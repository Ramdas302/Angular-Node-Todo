var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TodoSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    status: String

});

mongoose.model('todos',TodoSchema);

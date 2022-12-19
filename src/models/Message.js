// const mongoose= require('mongoose');
import mongoose from "mongoose";

const schema= mongoose.Schema({
    name:String,
    email:String,
    message: String
})

module.exports = mongoose.model('Message',schema)
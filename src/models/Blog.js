// const mongoose= require("mongoose");
import mongoose from "mongoose";

const schema= mongoose.Schema({
    title: String,
    content: String,
    image: String, 
    comments: [{
        name: String,
        email: String,
        message: String
    }],
    likes: Number, 
});

module.exports = mongoose.model("Blog", schema);

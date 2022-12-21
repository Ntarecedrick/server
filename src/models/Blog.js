// const mongoose= require("mongoose");
import mongoose from "mongoose";

const schema= mongoose.Schema({
    title: String,
    content: String,
    image: {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    // image: String,
    comments: [{
        name: String,
        email: String,
        message: String
    }],
    likes: {
        likesNumber: {type: Number, default: 0},
        user: []
    }, 
});

module.exports = mongoose.model("Blog", schema);

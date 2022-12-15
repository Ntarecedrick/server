const Blog = require('../models/Blog');

let postLikes= async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (blog.likes == null) {
        blog.likes = 0;
        blog.likes++
    } else {
        blog.likes++
    }
    await blog.save();
    res.send(blog);
}

module.exports.postNewLikes= postLikes
const Blog = require('../models/Blog');

let PostUnlike=  async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (blog.likes == null || blog.likes == 0) {
        blog.likes = 0
    } else {
        blog.likes--;
    }
}

module.exports.postDisLike= PostUnlike
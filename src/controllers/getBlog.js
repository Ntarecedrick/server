const Blog = require('../models/Blog');

let blog = async (req, res) => {
    const blogs = await Blog.findOne();

    return res.send(blogs)
}
module.exports.getBlog = blog



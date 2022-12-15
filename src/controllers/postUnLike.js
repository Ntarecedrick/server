const Blog = require('../models/Blog');

const PostUnlike=  async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (blog.likes == null || blog.likes == 0) {
        blog.likes = 0
    } else {
        blog.likes--;
    }
}
const postDisLike= PostUnlike;

export default postDisLike
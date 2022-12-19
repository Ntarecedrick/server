import Blog from '../models/Blog';

const PostUnlike=  async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (blog.likes == null || blog.likes == 0) {
        blog.likes = 0
    } else {
        blog.likes--;
    }
    await blog.save()
    res.send(blog)
}
;

export default PostUnlike
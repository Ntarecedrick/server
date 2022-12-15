import Blog from '../models/Blog';

const getBlogLikes= async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        res.send(blog);
    } catch {
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
    }
}

export default getBlogLikes
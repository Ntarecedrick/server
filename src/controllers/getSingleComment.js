import Blog from '../models/Blog';

const getSingleComment= async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        res.send(blog.comments);
    } catch {
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
    }
}

export default getSingleComment
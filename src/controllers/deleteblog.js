import Blog from '../models/Blog'

const deleteBlog= async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id })
        res.status(204).send('Blog is deleted');
    } catch {
        res.status(404);
        res.send({ error: "Blog doesn't exist!" });
    }
}

export default deleteBlog
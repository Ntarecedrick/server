import Blog from '../models/Blog'

const updateBlog=  async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        if (req.body.title) {
            blog.title = req.body.title
        }
        if (req.body.content) {
            blog.content = req.body.content
        }
        if (req.body.image) {
            blog.image = req.body.image
        }
        await blog.save();
        res.send(blog)
    } catch {
        res.status(404)
        res.send({ error: "blog doesn't exist!" })
    }
}

export default updateBlog
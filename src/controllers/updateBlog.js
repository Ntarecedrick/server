import Blog from '../models/Blog'
import validateUpdates from '../validation/validateUpdateBlog';

const updateBlog = async (req, res) => {

    const error = validateUpdates(req.body)

    if (error) {
        return res.send(error.details.map((e) => {
            return e.message
        }))
    } else {
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
            return res.send(blog) 
        } catch {
            return res.status(404).send({ error: "blog doesn't exist!" })
        }
    }



}

export default updateBlog
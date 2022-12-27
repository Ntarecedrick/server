import  validateComment  from '../validation/validateComment';
import Blog from '../models/Blog'


let postComment= async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id })
    const { error, value } = validateComment(req.body)

    if (error) {
        return res.send(error.details)
    } else {
        const comment = {
            name: res.locals.name,
            email: res.locals.email,
            message: req.body.message,
        }
        blog.comments.push(comment)
        await blog.save();
        return res.send(blog)
    }
}

export default postComment
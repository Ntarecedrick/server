import Blog from '../models/Blog';
import validateBlog from '../validation/validateBlog';

let postBlog= async (req,res)=>{

    const { error, value } = validateBlog(req.body)

    if (error) {
        return res.send(error.details.map((e) => {
            return e.message
        }))
    } else {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            likes: req.body.likes,
        })
        await blog.save();
        return res.send(blog)
    }
}

export default postBlog
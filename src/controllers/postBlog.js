import Blog from '../models/Blog';
import validateBlog from '../validation/validateBlog';
import cloudinary from '../cloudinary'

let postBlog = async (req, res) => {
    const { error, value } = validateBlog(req.body)

    try {
        if (error) {
            return res.send(error.details[0].message)
        } else {
            const my_pics = await cloudinary.uploader.upload(req.body.image, {
                folder: 'my_pics'
            })
            const blog = new Blog({
                title: req.body.title,
                content: req.body.content,
                image: {
                    public_id: my_pics.public_id,
                    url: my_pics.secure_url
                }
                // likes: req.body.likes,
            })
            await blog.save();
            return await res.send(blog)
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

export default postBlog
import ValidateLikes from '../validation/likesValidation'
import Blog from '../models/Blog'
let postLikes = async (req, res) => {

        const blog = await Blog.findOne({ _id: req.params.id });

        if (!blog.likes.user.includes(res.locals.email)) {
            const updateLikes = blog.likes.likesNumber + 1;
            const newUser= blog.likes.user
            newUser.push(res.locals.email); 

            await Blog.findOneAndUpdate({ _id: req.params.id }, {
                likes: {
                    likesNumber: updateLikes,
                    user: newUser
                }
            });
        } else {
            const newLikes = blog.likes.likesNumber - 1;
            const userFilter = blog.likes.user.filter((param) => {
                return param !== res.locals.email
            });
            await Blog.findOneAndUpdate({ _id: req.params.id }, {
                likes: {
                    likesNumber: newLikes,
                    user: userFilter
                }
            })
        }
        const newBlog = await Blog.findOne({ _id: req.params.id });
        res.send(newBlog)
}

export default postLikes
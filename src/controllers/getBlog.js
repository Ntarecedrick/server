import Blog from '../models/Blog';

const blog = async (req, res) => {
    const blogs = await Blog.find();

    return res.send(blogs)
}



export default blog



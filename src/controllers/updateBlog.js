import Blog from '../models/Blog'
import validateBlog from '../validation/validateBlog';
import cloudinary from '../cloudinary';

const updateBlog = async (req, res) => {

    const { error, value } = validateBlog(req.body)

    if (error) {
        return res.send(error.details.map((e) => {
            return e.message
        }))
    } else {
        try {
            const {title, content, image} = req.body
            
            const my_pics = await cloudinary.uploader.upload(image, {
                folder: 'my_pics'
            })
          const blogNew = {
    
            title, content, image:{
                public_id: my_pics.public_id,
                url: my_pics.secure_url
            }
          }
          await Blog.findOneAndUpdate({
            _id:req.params.id,
          },
          {
            title:blogNew.title,
            content:blogNew.content,
            image:blogNew.image
          }
          );
        res.send(blogNew)
        } catch {
            return res.status(404).send({ error: "blog doesn't exist!" })
        }
    }
}

export default updateBlog
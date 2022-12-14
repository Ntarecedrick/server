const express = require('express');
const Blog = require('../models/Blog');
const Message = require('../models/Message');
const { validateBlog, validateComment } = require('../validation/validateBlog');
const { validateMessage } = require('../validation/validateMessage');
const router = express.Router();

// Blogs Routes

router.get("/blogs", async (req, res) => {
    const blogs = await Blog.find()
    res.send(blogs)
})

// BLOG POST 
router.post("/blogs", async (req, res) => {
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

});


router.post('/blogs/:id/comments', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id })
    const { error, value } = validateComment(req.body)

    if (error) {
        return res.send(error.details)
    } else {
        const comment = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        }
        blog.comments.push(comment)
        await blog.save();
        return res.send(blog)
    }

});


router.post('/blogs/:id/likes', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (blog.likes == null) {
        blog.likes = 0;
        blog.likes++
    } else {
        blog.likes++
    }
    await blog.save();
    res.send(blog);
});

router.post('/blogs/:id/unlike', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (blog.likes == null || blog.likes == 0) {
        blog.likes = 0
    } else {
        blog.likes--;
    }
})

// BLOG GET

router.get("/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id })
        res.send(blog)
    } catch {
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
    }
});
router.get('/blogs/:id/comments', async (req, res) => {
    try {
        const blog = await blog.findOne({ _id: req.params.id });
        res.send(blog.comments);
    } catch {
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
    }
})
router.get('/blogs/:id/likes', async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        res.send(blog);
    } catch {
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
    }
})
router.get('/blogs/:id/unlike', async (res, req) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        res.send(blog);
    } catch {
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
    }
})

// BLOGB PATCH

router.patch("/blogs/:id", async (req, res) => {
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
})


// BLOG DELETE 

router.delete("/blogs/:id", async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id })
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Blog doesn't exist!" });
    }
})
router.delete('/blogs/:id/comments', async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id })
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Blog doesn't exist!" });
    }
})

// routes for Message

// Message GET

router.get('/Messages', async (req, res) => {
    const messages = await Message.find();
    res.send(messages)
});

// Message Post

router.post('/Messages', async (req, res) => {
    const { error, value } = validateMessage(req.body);

    if (error) {
        return res.send(error.details)
    } else {
        const message = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        })
        await message.save();
        return res.send(message)
    }

});

// Get Message 

router.get('/Messages/:id', async (req, res) => {
    try {
        const message = await Message.findOne({ _id: req.params.id });
        res.send(message)
    } catch {
        res.status(404)
        res.send({ error: "message doesn't exist!" })
    }



})

module.exports = router
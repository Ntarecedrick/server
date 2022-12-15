const express = require('express');
const { getBlog } = require('../controllers/getBlog');
const { postMyBlog } = require('../controllers/postBlog');
const { postNewComment } = require('../controllers/postComment');
const { postNewLikes } = require('../controllers/postLikes');
// const { postDisLike } = require('../controllers/postUnlike')
const Blog = require('../models/Blog');
const Message = require('../models/Message');
const { validateComment } = require('../validation/validateBlog');
const { validateMessage } = require('../validation/validateMessage');
const router = express.Router();

const verify = require('./verifyToken')
// Blogs Routes
router.get("/blogs", getBlog);
// BLOG POST 
router.post("/blogs",verify, postMyBlog);
// comment Post
router.post('/blogs/:id/comments', postNewComment);
// likes post 
router.post('/blogs/:id/likes', postNewLikes);
// unlike post
router.post('/blogs/:id/unlike',  )

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
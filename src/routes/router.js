// imports
import express from 'express';
import deleteBlog from '../controllers/deleteblog';
import getBlog from '../controllers/getBlog';
import getBlogLikes from '../controllers/getBlogLikes';
import getBlogUnLikes from '../controllers/getBlogUnlikes';
import getMessage from '../controllers/getMessage';
import getSingleBlog from '../controllers/getSingleBlog';
import getSingleComment from '../controllers/getSingleComment';
import getOneMessage from '../controllers/getSingleMessage';
import postMyBlog from '../controllers/postBlog';
import postNewComment from '../controllers/postComment';
import postNewLikes from '../controllers/postLikes';
import postMessages from '../controllers/postMessage';
import postUnLike from '../controllers/postUnLike'
import updateBlog from '../controllers/updateBlog';
import verify from './verifyToken';
// 
const router = express.Router();


// Blogs Routes
router.get("/blogs", getBlog);
// BLOG POST 
router.post("/blogs", verify, postMyBlog);
// comment Post
router.post('/blogs/:id/comments', postNewComment);
// likes post 
router.post('/blogs/:id/likes', postNewLikes);
// unlike post
router.post('/blogs/:id/unlike', postUnLike)
// BLOG GET 
router.get("/blogs/:id", getSingleBlog);
// get Blog Comment 
router.get('/blogs/:id/comments', getSingleComment)
// get blog likes
router.get('/blogs/:id/likes', getBlogLikes)
// get blog Unlikes
router.get('/blogs/:id/unlike', getBlogUnLikes)
// BLOGB PATCH
router.patch("/blogs/:id", verify, updateBlog)
// BLOG DELETE 
router.delete("/blogs/:id", verify, deleteBlog)
// routes for Message
// Message GET
router.get('/Messages', getMessage);
// Message Post
router.post('/Messages', postMessages);
// Get Message 
router.get('/Messages/:id', getOneMessage)

export default router
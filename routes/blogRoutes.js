const express = require('express');
const {getAllBlogs, createBlog, updateBlodOfID, deleteBlogOfID, getBlogOfID , getUserBlog} = require('../controllers/blogController');

//router object
const router = express.Router();

//get all blogs or get request:
router.get("/all-blog", getAllBlogs);

//create blog:
router.post('/create-blog', createBlog);
//update blog:
router.put('/update-blog/:id', updateBlodOfID);
//delete blog:
router.delete('/delete-blog/:id', deleteBlogOfID);
//get a single blog of specific id or user or title/topic :
router.get('/get-blog/:id', getBlogOfID);

//get user blog:
router.get('/user-blog/:id', getUserBlog);


module.exports = router;
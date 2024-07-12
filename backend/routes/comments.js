const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const  bcrypt = require('bcrypt');
// comment model
const Comment = require("../models/Comment");

const verifyToken = require("../verifyToken");


// create a post route

router.post("/write", verifyToken, async (req, res) => { 
    try {
        // const variable = new Model_name(input data)
        const newComment = new Comment(req.body);
        const saveComment = await newComment.save();
        res.status(200).json(saveComment); 
        
    } catch (error) {
        console.lof(error);
        res.status(500).json(error);
    }
})

//update a comment route
router.put("/:id", verifyToken, async (req, res) => {
    try {
        // const variable = new Model_name.find_by_id_and_delete(id,{$set : new data/input data},(new : true))
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedComment);
        
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
});

//delete comment route

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        
        await Comment.findByIdAndDelete( req.params.id );
        res.status(200).json("Comment has been deleted");
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
});


//get post comments route
router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
 })

module.exports = router;
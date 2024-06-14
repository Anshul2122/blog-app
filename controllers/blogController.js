//importing blog model from models:
const mongoose = require("mongoose");
const blogModel = require('../models/blogModel');
const userModel = require("../models/userModel");



//get all blogs:
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "no blog found"
            });
        }
        return res.status(200).send({
            blogCount: blogs.length,
            success: true,
            message: 'all blogs list',
            blogs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'error in get all blogs',
            success: false,
            error
        });
    }
};

exports.createBlog = async (req, res) => {
    try {
    const { title, body, CoverimageURL, user } = req.body;
    //validation
    if (!title || !body || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blogModel({ title, body, CoverimageURL, user });
    await newBlog.save();

    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save();
    
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while creating blog",
      error,
    });
  }
};
exports.updateBlodOfID = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        return res.status(200).send({
            success: true,
            message: "Blog Updated!",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error WHile Updating Blog",
            error,
        });
    }
};
exports.deleteBlogOfID = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog deleted",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while deleteing Blog",
            error,
        });
    }
};
exports.getBlogOfID = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            });
        }
        return res.status(200).send({
            success: true,
            message: "Blog found",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error WHile deleteing Blog",
            error,
        });
    }
};

exports.getUserBlog = async (req, res) => {
    try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
}
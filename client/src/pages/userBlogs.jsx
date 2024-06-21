import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/blogCard';
const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem("userId");
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserBlogs();
    }, []);
    console.log(blogs);
    return (
        <div>
            {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard
                        id={blog._id}
                        isUser={true}
                        title={blog.title}
                        body={blog.body}
                        CoverimageURL={blog.CoverimageURL}
                        username={blog.user.username}
                        time={blog.createdAt}
                    />
                ))
            ) : (
                <h1>You Have not created any blog</h1>)}
        </div>
    );
};

export default UserBlogs;
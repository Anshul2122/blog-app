import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogsCard from '../components/blogCard';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async (req, res) => {
    try {
      const { data } = await axios.get('/api/v1/blog/all-blog')
        if(data?.success){
          setBlogs(data?.blogs); 
        }
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllBlogs();
  },[])
  return (
    <div>
      {blogs && blogs.map((blog) => (
          <BlogsCard
            id={blog?._id}
            title={blog?.title}
            body={blog.body}
            CoverimageURL={blog?.CoverimageURL}
            username={blog?.user?.username}
            time={blog?.createdAt}

          />
      ))}
    </div>
  )
}

export default Blogs;
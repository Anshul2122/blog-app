import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const CreateBlog = () => {
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        body: "",
        CoverimageURL: "",
    });
    // input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/blog/create-blog', {
                title: inputs.title,
                body: inputs.body,
                CoverimageURL: inputs.CoverimageURL,
                user: id,
            });
            if (data?.success) {
                alert('Blog Created');
                navigate('/myBlogs');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    width={'50%'}
                    border={3}
                    borderRadius={10}
                    padding={3}
                    margin="auto"
                    boxShadow={'10px 10px 20px #ccc'}
                    display='flex'
                    flexDirection='column'
                    marginTop={'30px'}
                >
                    <Typography
                        variant='h2'
                        textAlign={'center'}
                        fontWeight={'bold'}
                        padding={3}
                        color={'gray'}
                    >
                        Create New Blog
                    </Typography>

                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>
                        Title :
                    </InputLabel>
                    <TextField
                        name='title'
                        value={inputs.title}
                        onChange={handleChange}
                        placeholder='Enter blog title'
                        margin='normal'
                        variant='outlined'
                        required
                    />

                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>
                        Content :
                    </InputLabel>
                    <TextField
                        name='body'
                        value={inputs.body}
                        placeholder='Enter blog content'
                        onChange={handleChange}
                        margin='normal'
                        variant='outlined'
                        required
                    />

                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>
                        Cover Image :
                    </InputLabel>
                    <TextField
                        name='CoverimageURL'
                        value={inputs.CoverimageURL}
                        placeholder='Enter cover image URL'
                        onChange={handleChange}
                        margin='normal'
                        variant='outlined'
                    />

                    <Button type='submit' color='primary' variant='contained'>
                        Post
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default CreateBlog;

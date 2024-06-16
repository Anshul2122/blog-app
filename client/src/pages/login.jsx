import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
const Login = () => {
  //state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  //handle change function
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //handle submit of form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/user/login', // data ko {} is imp to get success = true
        {
          email: inputs.email,
          password: inputs.password,
        });
      console.log(data);
      if (data.success) {
        dispatch(authActions.login());
        alert("User login Successfully");
        navigate("/");
      }
      else if (!data.success) { 
        alert("user not registered");

      }
      
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          margin={'auto'}
          marginTop={'5'}
          boxShadow={'10px 10px 20px #ccc'}
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant='h4'
            padding={3}
            textAlign={'center'}
            // sx={{textTransform:"uppercase"}} //optional  just register ko caps kar dega
          >Login</Typography>
          <TextField
            margin='normal'
            placeholder='enter your email'
            value={inputs.email}
            onChange={handleChange}
            name='email'
            text="email"
            required
          />
          <TextField
            margin='normal'
            placeholder='enter your password'
            value={inputs.password}
            onChange={handleChange}
            name='password'
            type='password'
            required
          />
          <Button type="submit"
            sx={{borderRadius:3, marginTop:3}}
            variant='contained' color='primary'
          >submit</Button>
          <Button
            onClick={()=> navigate('/signup')}
            sx={{ textTransform: "lowercase" }}>new user? please register</Button>
          </Box>
        </form>
    </>
  )
}

export default Login;
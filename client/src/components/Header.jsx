import React,{useState} from 'react'
import { AppBar, Toolbar, Button, Typography, Box, Tabs, Tab } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from '../redux/store';

function Header() {
    //global state
    const isLogin = useSelector((state) => state.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(isLogin);
    //state
    const [value, setValue] = useState();
    const handelChange = (e,val) => {
        setValue(val);
    }
    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            alert('logout succesfully');
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
      <>
          <AppBar position='sticky'>
              <Toolbar>
                  <Typography variant='h4'>
                      my blog app
                  </Typography>
                  {isLogin && (
                      <Box display={'flex'} marginLeft={'auto'} marginRight={'auto'}>
                        <Tabs textColor='inherit' value={value} onChange={handelChange}>
                            <Tab label="Blogs" LinkComponent={Link} to='/Blogs' />
                                <Tab label="My Blogs" LinkComponent={Link} to='/myBlogs' />
                                <Tab label="create new  Blogs" LinkComponent={Link} to='/create-blog' />
                        </Tabs>
                        </Box>
                  )}
                  <Box display={'flex'} marginLeft='auto'>
                      
                      {!isLogin && (<>
                            <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login">Login</Button>
                            <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/signup">Sign Up</Button>
                        </> )}
                      {isLogin && (
                          <><Button onClick={handleLogout} sx={{margin:1, color:'white'}}>Logout</Button></>
                      )}
                  </Box>
              </Toolbar>
          </AppBar>
      </>
  )
}

export default Header
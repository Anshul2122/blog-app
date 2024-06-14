import React,{useState} from 'react'
import { AppBar, Toolbar, Button, Typography, Box, Tabs, Tab } from "@mui/material";
import { Link } from 'react-router-dom';
import { useSelector} from "react-redux";
function Header() {
    //global state
    const isLogin = useSelector((state) => state.isLogin);
    console.log(isLogin);
    //state
    const [value, setValue] = useState();
    const handelChange = (e,val) => {
        setValue(val);
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
                        </Tabs>
                        </Box>
                  )}
                  <Box display={'flex'} marginLeft='auto'>
                      
                      {!isLogin && (<>
                            <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login">Login</Button>
                            <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/signup">Sign Up</Button>
                        </> )}
                      {isLogin && (
                          <><Button sx={{margin:1, color:'white'}} LinkComponent={Link} to="/logout">Logout</Button></>
                      )}
                  </Box>
              </Toolbar>
          </AppBar>
      </>
  )
}

export default Header
import './App.css';
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from './pages/signup';
import Blogs from './pages/blogs';
import UserBlogs from ".//pages/userBlogs"
import CreateBlog from './pages/createBlog';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/myBlogs" element={<UserBlogs />} />
        <Route path="/create-blog" element={<CreateBlog/>}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={ <Login/>} />
      </Routes>
      
    </div>
  );
}

export default App;
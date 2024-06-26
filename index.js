//importing installed pakages:
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./connectDB');
//port
const port = 8080; 
//env congif :
dotenv.config(); // .env se kuch bhi get karne k liye process.env.variable name.
//route import
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

//mongodb connection 
connectDB();
//rest object :
const app = express();

//middlewares :
app.use(express.json()); // to get json data
app.use(cors());
app.use(morgan('dev'));


//routes:
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);



//listen server on a port:
app.listen(port, () => console.log(`Server Started at PORT:${port}`));
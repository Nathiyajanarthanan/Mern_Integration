const express=require('express');
const ProductRoute=require('./routes/ProductRoute.js');
const dotenv=require('dotenv');
const connectdb = require('./config/db');
const app=express();
const cors=require('cors');
app.use(cors());

app.use(express.json());
dotenv.config();

connectdb()
app.use("/api",ProductRoute)
PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
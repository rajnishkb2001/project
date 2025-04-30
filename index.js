const express=require('express');
const app=express();

require("dotenv").config();
const PORT=process.env.PORT||3004;

app.use(express.json());

const fileupload=require("express-fileupload");  //this middleware helps in uploading file to the server

app.use(fileupload({
  useTempFiles:true,
  tempFileDir:"/tmp",
  // limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
}));

const db=require("./config/database");
db.connect();
 
//cloud se connect krna
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount
const Upload=require("./routes/FileUpload");
app.use("/api/v1/upload",Upload)

app.listen(PORT,()=>{
  console.log(`serer is running on  port no ${PORT}`);
})
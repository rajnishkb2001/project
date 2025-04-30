const mongoose=require('mongoose');
const nodemailer=require('nodemailer')
require("dotenv").config();

const fileSchema=new mongoose.Schema({

      name:{
        type:String,
        required:true,
      },
      imageUrl:{
        type:String,
      },
      tags:{
        type:String,
      },
      email:{
        type:String,

      }
});


//POST MIDDLEWARE
fileSchema.post("save",async function (doc) {
  try{
           console.log("doc is",doc)

           let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
              user:process.env.MAIL_USER,
              pass:process.env.MAIL_PASS,
            },
          });
            //send mail
            let info=await transporter.sendMail({
               from: `"Codehelp - by Rajnish" <${process.env.MAIL_USER}>`,
              to:doc.email,
              subject:"File uploaded",
              html:`<h2>This project is under the guidance of minal ma'am </h2>, <p>you can view your file link :- <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,

            })
            console.log("info is",info)
          
  }
  catch(error){
       console.log(error)
  }
  
})
const File=mongoose.model("RmtFile",fileSchema);
module.exports=File;
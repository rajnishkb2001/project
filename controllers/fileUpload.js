const RmtFile = require("../models/file");
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
    try {

        const file = req.files.avyaSingh;
        // Fetch file from request body
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        

        console.log("File received ->", file);

        // Create path where file will be saved or defining of path
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("File path ->", path);
        file.mv(path, (error) => {
            if (error) {
                return res.status(500).json({ message: "File upload failed", error });
            }
        });
        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality) {
    const options = { folder };
    console.log("Temp file path", file.tempFilePath);
    if(quality){
        options.quality=quality;
    }
     options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Image upload handler
exports.imageUpload = async (req, res) => {
    try {
        // Data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        
        const file = req.files.imageFile;
        console.log(file);
        
        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type is", fileType);
        console.log("file name is",file.name)
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({ message: "File type not supported" });
        }
        
        // If file format is supported
        const response = await uploadFileToCloudinary(file, "codeHelp");
        console.log(response);
        
       // Save entry in the database
        const fileData = await RmtFile.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });
        console.log("filedata is", fileData);
        
        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "File uploaded successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

exports.videoUpload=async (req,res)=>{
    try{
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["mp4", "mov","jpg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type is", fileType);
        console.log("file name is",file.name)

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json
            ({ message: "File format not supported" });
        }
        const response = await uploadFileToCloudinary(file, "codeHelp");
        console.log(response);
        
         // Save entry in the database
         const fileData = await RmtFile.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });
         
        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "video uploaded successfully",
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    
    }
}

exports.imageSizeReducer=async (req,res)=>{
    try{
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type is", fileType);
        console.log("file name is",file.name)

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json
            ({ message: "File format not supported" });
        }
        const response = await uploadFileToCloudinary(file, "codeHelp",90);
        console.log(response);
        
         // Save entry in the database
         const fileData = await  RmtFile.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });
         
        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "video uploaded successfully",
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    
    }
}
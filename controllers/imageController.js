const uploadToCloudinary = require('../helpers/cloudinaryHelper');
const Image = require('../models/Image');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');



const uploadImageController = async (req,res)=>{
    try{

        if(!req.file){
            return res.status(500).json({
                success: false,
                message: "File is required,Please upload image"
            });
        }
      
        //uploadToCloudinary
        const {url,publicId} = await uploadToCloudinary(req.file.path);

       const newlyStoredImage = new Image({
           url,
           publicId,
           uploadedBy: req.userInfo.userId,
       });

      await newlyStoredImage.save();

      // delete file
      fs.unlinkSync(req.file.path);

       res.status(201).json({
        success: true,
        message: "Imaged uploaded successfully",
        image: newlyStoredImage,
      });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!,Please upload once again",
        });

    }
}

const deleteImageController = async (req,res)=>{
    try{
        const imageByIdToBedeleted = req.params.id();
        const userid = req.userInfo.userId;

        const image = await Image.findById(imageByIdToBedeleted);

        if(!image){
           return res.status(404).json({
               success: false,
               message: "No image ound for this id",
            });
        }
   
        if(image.uploadedBy.toString()!= userid){
           return res.status(403).json({
              success: false,
              message:"Your are not authorize to delete this image,since it is uploaded someone else",
           })
        }

        await cloudinary.uploader.destroy(image.publicId);

        await Image.findByIdAndDelete(imageByIdToBedeleted);

        res.status(200).json({
            success: true,
            message: "Image deleted successfully",
          });


    }catch(error){
       console.log(error);
       return res.status(500).json({
         success:false,
         message: "Something went wrong",
       })
    }
}


module.exports = {
    uploadImageController,
    deleteImageController
}
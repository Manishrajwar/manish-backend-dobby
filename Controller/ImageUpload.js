const User = require("../Model/User");
const Image = require("../Model/Image");
const {uploadToCloudinary} = require("../utils/imageUploader");



exports.uploadImages = async(req ,res)=>{
    try{

         const {Name } = req.body;

         const image = req.files.image; 
       
         if(!Name || !image){
            return res.status(400).json({
                success:false,
                message:`all fields are required`
            });
         }

         const userId = req.user.id;

          const imageDetails = await uploadToCloudinary(image , process.env.FOLDER_NAME , 1000,1000 );

               const newImage = await Image.create({Name: Name , image : imageDetails.secure_url});

           const userDetails =  await User.findByIdAndUpdate({_id: userId} ,{
                $push:{
                    images: newImage._id , 
                }
            } , {new:true}).populate("images");



            return res.status(200).json({
                success:true ,
                message:"Successfuly uploaded",
                   user : userDetails
            })

    } catch(error){
        console.log("error",error);
   return res.status(500).json({
    success:false,
    message:`failed internal server error `
   })
    }
}

exports.getAllImages = async(req ,res)=>{
    try{

        const userId = req.user.id;

         const userDetails = await User.findById({_id:userId}).populate("images");

          if(!userDetails){
             return res.status(404).json({
                success:false ,
                message:"USER NOT FOUND "
             })
          }

           return res.status(200).json({
            success:true ,
            message:"Successfuly Get all Image",
            user : userDetails.images
           })

    } catch(error){
        console.log("error",error);
   return res.status(500).json({
    success:false,
    message:`failed internal server error `
   })
    }
}
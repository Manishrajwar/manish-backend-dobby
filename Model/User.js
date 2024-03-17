const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    images :[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Image",
      }
    ] , 
    password:{
      type:String,
    }
  }
);

module.exports = mongoose.model("User", userSchema);

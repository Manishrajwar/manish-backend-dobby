const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    image :{
        type:String,
    }
  }
);

module.exports = mongoose.model("Image", imageSchema);

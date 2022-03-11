const mongoose  = require("mongoose"),
      pinSchema = new mongoose.Schema({
          username : String,
          title : {
              type: String, 
              required: true
          },
          desc : String,
          rating: {
              type: Number,
              default: 0,
              min: 0,
              max : 5
          },
          lat: Number,
          long: Number
      },{
          timestamps: true
      });

const pin = mongoose.model("Pin", pinSchema);

module.exports = pin;
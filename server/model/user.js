const mongoose   = require("mongoose"),
      validator  = (val)=>{
          if(val.includes('@'))
            return true;
          return false;
      }
      userSchema = new mongoose.Schema({
          username: {
              type: String,
              max: 20,
              min: 3,
              required: true,
              unique: true
          },
          email: {
              type: String,
              required: true,
              unique: true,
              validate : {validator, msg: "not an email"}
          },
          password :{
              type: String,
              min: 4,
              required: true
          }
      },
      {
          timestamps: true
      }
      );

const user = mongoose.model("User", userSchema);

module.exports = user;
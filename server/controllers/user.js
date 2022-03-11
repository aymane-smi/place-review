const user   = require("../model/user"),
      bcrypt = require("bcrypt"),
      jwt    = require("jsonwebtoken");


exports.signUp = async(req, res)=>{
    try{
        const {username, password, email} = req.body;
        const Salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, Salt);
        if(!username || !email || !password)
            res.status(404).json({
                message: "invalid credentials."
            });
        else{
            let newUser = new user({username, email, password: hashedPassword});
            console.log(newUser);
            let result = await newUser.save();
            let token = jwt.sign({
                id: result._id,
                username,
                email
            }, process.env.SECRET_KEY);
            res.status(200).json({
                message: "new user was created successfully.",
                user: newUser,
                token
            });
        }
    }catch(err){
        res.status(500).json({
            message: "something went wrong.",
            detail: err.message
        });
    }
};

exports.signIn = async (req, res)=>{
    try{
        const { email, password} = req.body;
        let userObj  = await user.findOne({email});
        if(!userObj)
            res.status(404).json({
                message: "user not found!"
            });
        else{
            let isValidPassword = bcrypt.compare(password, userObj.password);
            let token = jwt.sign({
                id: userObj._id,
                username: userObj.username,
                email
            }, process.env.SECRET_KEY);
            if(!isValidPassword)
                res.status(401).json({
                    message: "invalid password."
                });
            else
                res.status(201).json({
                    message: "user was logged in successfully",
                    user: userObj,
                    token
                });
        }
    }catch(err){
        res.status(500).json({
            message: "something went wrong.",
            detail: err.message
        });
    }
};
const pin = require("../model/pin");

exports.createPin = async(req, res)=>{
    try{
        const pinObj = req.body;
        if(!pinObj)
            res.status(404).json({
                message: "please fill the fields!"
            });
        else{
            //we can use also pin.create
            newPin = new pin(pinObj);
            newPin = await newPin.save();
            res.status(200).json({
                message: "pin saved successfully!",
                newPin
            });
        }
    }catch(err){
        res.status(500).json({
            message: "something went wong.",
            detail: err.message
        });
    }
};


exports.getPins = async (req, res)=>{
    try{
        const allPins = await pin.find();
        res.status(200).json({
            allPins
        });
    }catch(err){
        res.status(500).json({
            message: "something went wrong.",
            detail: err.message
        });
    }
};
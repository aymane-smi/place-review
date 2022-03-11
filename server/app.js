require("dotenv").config();
//or we can use .consfig({path : './.env'})
const express    = require("express"),
      app        = express(),
      mongoose   = require("mongoose"),
      bodyParser = require("body-parser"),
      PORT       = process.env.PORT || 8081,
      cors       = require("cors"),
      pin        = require("./routes/pin"),
      user       = require("./routes/user");

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect("mongodb://localhost/map1", {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`listening to ${PORT}`);
    });
}).catch((err)=>{
    console.log(err.message);
});

app.use("/api/pin", pin);
app.use("/api/user", user);
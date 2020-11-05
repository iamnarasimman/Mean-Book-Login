const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());

var corsOption={
    origin: 'http://localhost:4200',
    optionSuccessStatus: 200
}

app.use(cors(corsOption));

//models
const cat = mongoose.model('cats',{name:String, mail:String, password:{type:String, required:true}, crAt: {type:Date, default:Date.now}});

//db connection
var mongodb=mongoose.connect('mongodb://localhost:27017/manoj', {useNewUrlParser: true});

app.listen(3000,()=>{
    console.log('Server started!');
});

//APIs
app.get("/api/testing_api",(req,res)=>{
    res.send("I'm Server, Cool");
});

//to create new cat
app.get("/api/save_kitty",(req,res)=>{
    var ourKitty = new cat();
    ourKitty.name="us.userName";
    //ourKitty.mail=us.email;
    //ourKitty.password=us.password;
    ourKitty.save();
    res.send(ourKitty);
});

//to create user
app.post('/api/reg', (req, res)=>{
	console.log("Inside create_user!!!!!!!!!!!!!!!!!1");
    console.log(req.body);
    
    var val=new cat();
    val.name=req.body.userName;
    val.mail=req.body.email;
    val.password=req.body.password;
    val.save((err)=>
	{
		res.send(val);
		console.log("---Added to DB---")
	});
});


//to do login user
app.post("/api/do_login", (req,res)=>{
    cat.findOne({mail: req.body.email, password: req.body.password},
        {name:1, mail:1, password:1},
        (err,doc)=>{
            if(err) 
                res.status(500).json(err);
            else if(doc)
                res.status(200).json(doc);
            else
                res.status(401).json({msg: "Invalid login details"});
        }
        );

});
const express =require("express");
const app= express();
var bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
app.use('/abc',express.static('public'));
app.set('view engine','ejs');
app.set('views','./public/views');
const {matchedData , sanitizeBody}= require('express-validator');


var urlencodedParser= bodyParser.urlencoded({extended:false});
var jsonParser= bodyParser.json();
app.get('/',urlencodedParser,(req,res)=>{
    res.render('index',{title:"login form",message:"enter username and password"});
});

app.post('/login',urlencodedParser,(req,res)=>{
    res.send('welcome'+req.body.username);
});

app.post('/',urlencodedParser,[check('username','invalid username').trim().isEmail(), check('password','not valid pass').trim().isLength({min:5}), check('cpassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    // Indicates the success of this synchronous custom validator
    return true;
  })],(req,res)=>{
    var errors=validationResult(req);
    console.log(errors.mapped());
    error=errors.mapped();
    var user=matchedData(req);
    if(!errors.isEmpty()){
        console.log(user);
        res.render('index',{title:"user details",message:"username",error:error,user:user});
    }
    else{
        
        console.log(user);
        res.render('login',{title:"user details",user:user});
    }
   
});

app.listen(3000);


// username:req.body.username, password:req.body.password
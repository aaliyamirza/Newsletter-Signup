const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extented:true}));

app.get("/" , function(req,res) {
 res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res) {

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data = {
members:
  [ {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  }
]
 };
const jsonData = JSON.stringify(data);
const url = `https://us5.api.mailchimp.com/3.0/lists/6d2cb7a1d1` ;

const options = {
  method: "POST",
  auth: "aaliya:830fd680bf9dc0df90bf94036910afa1-us5"
}


const request = https.request(url,options,function(response) {
  //request(options,function(error,response,body){
  //  if(error) {
  //   res.sendFile(__dirname + "/fail.html");
  // } else {
   if(response.statusCode === 200) {
     res.sendFile(__dirname + "/success.html");
   } else {
     res.send(__dirname + "/fail.html");
   }
//  } });
response.on("data",function(data) {
  console.log(JSON.parse(data));
});
});


 //console.log(firstName, lastName, email);
request.write(jsonData);
request.end();
});


app.post("/failure" , function(req,res) {
  res.redirect("/");
});
app.listen(process.env.PORT ||2000,function() {
  console.log("server started!");
});



//API KEY 830fd680bf9dc0df90bf94036910afa1-us5
//list id 6d2cb7a1d1

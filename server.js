const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req, res){
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    console.log(firstName, lastName, email);

    var data = {
        members: [
            {email_address: email,
            status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }}
        ]
    };

    let jsonData = JSON.stringify(data);

    //1d8f8b86c148f1b96314acf741333a0d-us4
    //26a4b8a331
    //https://us4.admin.mailchimp.com/account/lists/new-list
    //https://mailchimp.com/developer/
    //https://mailchimp.com/developer/guides/get-started-with-mailchimp-api-3/

    const options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/26a4b8a331",
        method: "POST",
        headers: {
            "Authorization": "anyString 1d8f8b86c148f1b96314acf741333a0d-us4"
        },
        //body: jsonData
    }

    request(options, function(error, response, body){
        
        if(error){
            res.sendFile(__dirname+"/failure.html");
        } else {
            if(response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
        /*if(error){
            console.log(error);            
        } else {
            console.log(response.statusCode);
        }*/
    });

})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");    
})
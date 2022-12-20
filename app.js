const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var Fname = req.body.fname;
    var Lname = req.body.lname;
    var Email = req.body.email;

    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: Fname,
                    LNAME: Lname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/4b5cd2ab74";

    const options = {
        method: "POST",
        auth: "abhi1:32ad6bc9e49a46c7640e0d80d8ccbef3-us21"
    }

    const request = https.request(url, options, function (response) {
        console.log(response.statusCode);
        if (response.statuscode !== 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
})


app.listen(process.env.PORT || 3000, function () {
    console.log("server at 3000");
});
// 11425b4272f79820a3418347a1445b37 - us21
// apikey-f947d9c12dcd0df2f2c4ee6123432639-us21
// list id -4b5cd2ab74.
// url - https://us21.api.mailchimp.com/3.0/lists/4b5cd2ab74
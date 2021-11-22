var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'konvict',
        database: 'register_and_update_users'
    }
});

var port = 3000;
var storeUserID = "default";

// creating server
var app = express();

//parse form data in to object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().array());

//console request and contents of request on server
/*app.use(function middleware(req, res, next) {
    // Do something
    console.log(`${req.method}  ${req.path} - ${req.ip}`);
    //req contents
    var res_obj = JSON.parse(JSON.stringify(req.body));
    console.log(res_obj);
    // Call the next function in line:
    next();
});  */

//first interaction with user,.... user chooses either register or to see details
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/primary.html");
});

// after user selecting,  steps to do
app.post("/todo", async (req, res,) => {
    if(req.body.to_do === "register"){
        res.sendFile(__dirname + "/html/register.html");
    }else if(req.body.to_do === "update"){
        res.sendFile(__dirname + "/html/update.html");
    }else{
        try {
            await knex('users')
            .where('user_id', storeUserID)
            .del();
        } catch (e) {
            console.error(e);
        }
        res.send('DELETED YOUR ACCONT')
    }
});

//when user chooses to view details
app.post("/check", async(req, res) => {
    storeUserID = req.body.User_id;
    try {
        const result = await knex.select().from('users').where('user_id', req.body.User_id).timeout(1000);
        var results = JSON.parse(JSON.stringify(result))
        //console.log(results);
        res.send(`<!DOCTYPE html>
        <html>
            <head></head>
            <body>
                <div>
                    <p>First name : ${results[0].f_name}</p>
                    <p>Last name : ${results[0].l_name}</p>
                    <p>email address : ${results[0].email_id}</p>
                    <p>Phone_number : ${results[0].phone_no}</p>
                    <p>address : ${results[0].address}</p>
                </div><br><br>
                <form action="/todo" method="POST">
                    <button type="submit" name="to_do" value="update">UPDATE</button>
                    <button type="submit" name="to_do" value="delete">DELETE</button>
                </form>
            </body>
        </html>`);
    } catch (e) {
        console.error(e); 
    }
});

//registering user details into database
app.post("/register", async(req, res) => {
    try {
        await knex('users').insert({
            user_id: req.body.User_id,
            f_name: req.body.First_Name,
            l_name: req.body.Last_Name,
            email_id: req.body.Email_id,
            phone_no: req.body.Phone_number,
            address: req.body.Address
        });
    } catch (e) {
        console.error(e);
    };
    res.send("REGISTERED YOUR DETAILS");
});

//update user details into database
app.post("/update", async(req, res) => {
    try {
        await knex('users')
        .where('user_id', '=', storeUserID)
        .update({
            f_name: req.body.First_Name,
            l_name: req.body.Last_Name,
            email_id: req.body.Email_id,
            phone_no: req.body.Phone_number,
            address: req.body.Address
        });
    } catch (e) {
        console.error(e);
    };
    res.send("UPDATED YOUR DETAILS");
});

//continue to listening on port
app.listen(port, () => {
    console.log(`index.js is listening at http://localhost:${port}`);
});

module.exports = app;  //for testing
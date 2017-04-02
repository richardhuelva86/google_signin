var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var cors = require('cors');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.post('/verify', function(req, res){

    var token = req.body.token;
    var CLIENT_ID = "1092416731643-1pcq8k2igak5s4npd1262mcjhf54kgoa.apps.googleusercontent.com";

    var GoogleAuth = require('google-auth-library');
    var auth = new GoogleAuth;
    var client = new auth.OAuth2(CLIENT_ID, '', '');
    client.verifyIdToken(
        token,
        CLIENT_ID,
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
        function(e, login) {
          var payload = login.getPayload();
          var userid = payload['sub'];
          
          var json = JSON.stringify({
            userid: userid 
          });

          //res.writeHead(200, {"Content-Type": "application/json"});
          //res.end(json);
          res.setHeader('Content-Type', 'application/json');
          res.json(json);
          // If request specified a G Suite domain:
          //var domain = payload['hd'];
        });

})

app.listen(3000, function(){
    console.log('Listening P3000');
});

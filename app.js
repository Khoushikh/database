var express = require("express");
var app = express();
var port = 3001;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
//  res.send("Hello World");
res.sendFile(__dirname + '/index.html');
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
 });

 app.get('/view', function(req, res){
	user.find({}, function(err, docs){
		if(err) res.json(err);
		else    res.render('index', {users: docs});
	});
});

app.listen(port, () => {
 console.log("Server listening on port " + port);
});
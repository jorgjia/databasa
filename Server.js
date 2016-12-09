var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = new express();

var msg;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connection.on("error", function(err) {
	if (err) console.error(err);
});

mongoose.connection.once("open", function() {
	console.log("Database connected...");
	var FormSchema = new mongoose.Schema({
		emri: String,
		qyteti: String
	});
	var Form = mongoose.model("Form", FormSchema);

	app.post("/form", function(req, res) {
	
		var emriStudent = req.body.emri;
		var qytetiStudent = req.body.qyteti;
			
		Form.create({emri: emriStudent, qyteti: qytetiStudent}, function(err, form) {
			if (err) {
				msg = "Internal Server Error. Form could not be submitted.";
				console.log(err);
			}
			else msg = "Form successfully submitted.";
				
			res.json({message: msg});
		});
	});
	app.post("/kerko_emrin", function(req, res) {
		
		var emriStudent = req.body.emri;
	
		Form.findOne({emri: emriStudent}, function(err, form) {
			if (err || !form) res.json({emri: "", qyteti: ""});
			else res.json(form);
		});
	});

	app.post("/kerko_qytetin", function(req, res) {
		var qytetiStudent = req.body.qyteti;
		
		Form.findOne({qyteti: qytetiStudent}, function(err, form) {
			if (err || !form) res.json({emri: "", qyteti: ""});
			else res.json(form);
		});
	});
});

mongoose.connect("mongodb://jori:jori@ds119588.mlab.com:19588/databasa").then(function() {
	app.listen(process.env.PORT || 7000, function() {
		console.log("Connected to localhost 7000...");
	});
});

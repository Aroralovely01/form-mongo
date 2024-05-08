var express =require('express'); 
var mongoose = require('mongoose');
var app      = express();
const path=require("path");
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var cors     = require('cors')
app.set('view engine', 'ejs'); 
var port     = process.env.PORT || 4200;

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.set('views', path.join(__dirname, 'views'));

app.use('/assets',express.static(__dirname + '/public'));
app.use(cors())
var Employee = require('./models/employee');
 
mongoose.connect(database.url);

console.log(database.url);


app.post('/person_create', function(req, res) {
	// create mongose method to create a new record into collection
	console.log("hello");
	console.log(req.body);
	Employee.create({
	
		name : req.body.name,
		phone : req.body.phone,
		email : req.body.email,
		address : req.body.address,
		salary:req.body.salary,
	});
});


app.get('/showperson', async function(req, res) {
	
	var results = await Employee.find() 
		
		
     res.json(results);
		
});


app.post('/pdelete', function(req, res) {
    console.log(req.body.name);
	Employee.deleteOne({ name: req.body.name }).then((result) => { 
		console.log(result); 
	});
   
	res.redirect("/showperson");
});

app.post('/editp', async function(req,res){
	let id = req.body.name;
	console.log(id)
	var results = await Employee.find({ "name": id}) 
		// if there is an error retrieving, send the error otherwise send data
		console.log(results)
     res.json(results);

})


app.listen(port);
console.log("App listening on port : " + port);
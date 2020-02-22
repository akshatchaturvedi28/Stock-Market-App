// Stock Market Portfolio App by Akshat Chaturvedi

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 5000;	// use web-hoster's PORT or use 5000


// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


// API Key pk_18bc7486db62494181ec241492e9b410
// create call_api function
function call_api(finishedAPI, ticker){
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_18bc7486db62494181ec241492e9b410', { json:true }, (err, res,body) => {
	if (err) {return console.log(err)}
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
		};
	});
};



// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff";

// Set Handlebar Index GET route
app.get('/', function (req, res) {
	call_api(function(doneAPI){
		res.render('home', {
    	stock: doneAPI
    	});
	}, "fb");
});

// Set Handlebar Index POST route
app.post('/', function (req, res) {
	call_api(function(doneAPI){
		// posted_stuff = req.body.stock_ticker;
		res.render('home', {
    	stock: doneAPI,
    	// posted_stuff: posted_stuff
    	});
	}, req.body.stock_ticker);
    
});


// create about page route
app.get('/about.html', function (req, res) {
    res.render('about',{
    	extra_stuff: "This is about page..."
    });

});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT))

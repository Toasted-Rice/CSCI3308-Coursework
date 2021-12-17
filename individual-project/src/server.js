let express = require('express');
var compress = require('compression');
let app = express();
let bodyParser = require('body-parser');
let ejsLint = require('ejs-lint');
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));

const axios = require('axios');
const postgres = require("./resources/js/db-config");


app.get('/', 						function (req, res) { render_home_page(res) });
app.get('/Projects/Overview', 		function (req, res) { render_project_page(res) });
app.get('/Projects/Tic-Tac-Toe', 	function (req, res) { render_tictactoe_page(res) });
app.get('/Projects/SignupModal', 	function (req, res) { render_signupModal_page(res) });
app.get('/Projects/DroneDemo',	 	function (req, res) { render_drone_page(res) });
app.get('/WebServices/FlickrAPI',	function (req, res) { render_flickr_page(res); });

app.get('/WebServices/NYTimesAPI*', function (req, res) {
	let title = req.originalUrl.replace('/WebServices/NYTimesAPI','').replace('?search_term=','');
	var api_key = "GL0WTGx3iUARQ9UxeTVG3CHe8AXy0tBI"; 
	if(title) {
		axios({
			url: `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${title}&api-key=${api_key}`,
			method: 'GET',
			dataType:'json',
		})
		.then (items => render_nytimes_page(res, 200, title, items.data.results))
        .catch(error => render_nytimes_page(res, error.response.status, search));
	}
	else render_nytimes_page(res, 204);
})

app.get('/WebServices/BreweryAPI*', function (req, res) {
	let search = req.originalUrl.replace('/WebServices/BreweryAPI','').replace('?search_term=','').replace(/\+/g,' ');
	if (search) {
		Promise.allSettled([
			axios({
				url: `https://api.openbrewerydb.org/breweries?by_city=${search}&per_page=50`,
				method: 'GET',
				dataType: 'json'
			}),
			postgres.query(`
				SELECT id, rating
				FROM brew_reviews
				WHERE brewery_city='${search}'
				ORDER BY brewery_name
			;`)
		])
		.then(batch => render_brewery_page(res, 200, search, [batch[0].value.data, batch[1].value.rows]))
		.catch(error => render_brewery_page(res, error.response.status, search));
	}
	else render_brewery_page(res, 204);
});

app.post('/Update/BreweryReviews', function (req, res) {
	try {
		postgres.query(`
			INSERT INTO brew_reviews (id, brewery_name, brewery_website, brewery_city, brewery_state, review, review_date, rating)
			VALUES (
				'${req.body['hidden-id'].replace(/'/g,'\'\'')}',
				'${req.body['hidden-name'].replace(/'/g,'\'\'')}',
				'${req.body['hidden-url'].replace(/'/g,'\'\'')}',
				'${req.body['hidden-city'].replace(/'/g,'\'\'')}',
				'${req.body['hidden-state'].replace(/'/g,'\'\'')}',
				'${req.body['review-text'].replace(/'/g,'\'\'')}',
				'${new Date().toLocaleString("en-US")}',
				${req.body['review-rating']})
		;`)
		.then(results => res.redirect('/Databases/BreweryReviews'))
	} 
	catch(error) { res.status(400).send("Invalid request"); }
});

app.get('/Databases/BreweryReviews', function (req, res) {
	postgres.query(`SELECT * FROM brew_reviews ORDER BY review_date DESC;`)
		.then(results => {
			render_brewReviews_page(res, 200, results.rows);
		})
});

module.exports = app.listen (process.env.PORT || 3000, () => {
	console.log(`3000 is tHe MaGiCaL pOrT~ ★☆★☆★☆`);
})

function render_page(res, page, title, tab, status=200, css="", script="", search_data=[], search_placeholder="", input_text="", loading_text="") {
	res.render(page, {
		page_title: title,
		page_tab: tab,
		page_status: status,
		page_css: css,
		page_script: script,
		search_data: search_data,
		search_placeholder: search_placeholder,
		search_term: input_text,
		load_text: loading_text
	});
}

function render_home_page(res, status=200) {
	render_page(res,
		"pages/home",			// File Location
		"About Me!",			// Page Title
		"Home",					// Page Tab
		status, 				// HTTP Status
		"home"					// Page CSS
	);
}

function render_project_page(res, status=200) { 
	render_page(res, 
		"pages/projects", 		// File Location
		"Projects Overview", 	// Page Title
		"Projects", 			// Page Tab
		status,					// HTTP Status
		"projects"				// Page CSS
	);
}

function render_tictactoe_page(res, status=200) {
	render_page(res, 
		"pages/tic-tac-toe", 	// File Location
		"Tic-Tac-Toe", 			// Page Title
		"Projects", 			// Page Tab
		status, 				// HTTP Status
		"tic-tac-toe", 			// Page CSS
		"tic-tac-toe"			// Page Script
	);
}

function render_signupModal_page(res, status=200) {
	render_page(res, 
		"pages/signup-modal", 	// File Location
		"Signup Demo", 			// Page Title
		"Projects", 			// Page Tab
		status, 				// HTTP Status
		"login", 				// Page CSS
		"login"					// Page Script
	);
}

function render_drone_page(res) {
	res.render("pages/drone", {
		page_title: "Unity WebGL Player | DroneDemo",
		page_tab: "Projects",
		page_css: "drone",
		page_script: "drone",
		search_data: [],
		search_placeholder: "",
		search_term: "",
		load_text: ""
	});
}

function render_nytimes_page(res, status=200, search_term="", search_data=[]) {
	render_page(res,
		"pages/nytimes", 		// File Location
		"Movie Reviews API", 	// Page Title
		"WebServices", 			// Page Tab
		status, 				// HTTP Status
		"masonry", 				// Page CSS
		"axios", 				// Page Script
		search_data, 			// Search Data 
		"Enter Movie Name", 	// Search Placeholder
		search_term, 			// Search Value from Input
		"Fetching reviews from the New York Times" // Loading Text
	);
}

function render_flickr_page(res, status=200) {
	render_page(res, 
		"pages/flickr", 		// File Location
		"Flickr Search API", 	// Page Title
		"WebServices", 			// Page Tab
		status, 				// HTTP Status
		"masonry", 				// Page CSS
		"flickr", 				// Page Script
		[], "Search images on Flickr",  "", // Search Placeholder
		"Fetching images from Flickr"		// Loading Text
	);
}

function render_brewery_page(res, status=200, search_term="", search_data=[]) {
	render_page(res,
		"pages/brewery",		// File Location
		"Open Brewery API",		// Page Title
		"WebServices",			// Page Tab
		status,					// HTTP Status
		"masonry",				// Page CSS
		"axios",				// Page Script
		search_data,			// Search Data
		"Enter a city",			// Search Placeholder
		search_term,			// Search Value from Input
		"Fetching breweries around " + search_term	// Loading Text
	);
}

function render_brewReviews_page(res, status=200, table) {
	render_page(res,
		"pages/brewReviews",	// File Location
		"Brewery Reviews",		// Page Title
		"Databases",			// Page Tab
		status,					// HTTP Status
		"reviews",
		"reviews",
		table,
		"Search for a brewery"
	);
}
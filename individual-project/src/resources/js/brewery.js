let rated = false;
let reviewed = false;
let button = document.getElementById("submit-review");
let review_text = document.getElementById("review-text");
let review_form = document.getElementById("review-form");
let reviewee = document.getElementById("reviewee");
let hidden_name = document.getElementById("hidden-name");
let hidden_id = document.getElementById("hidden-id");
let hidden_url = document.getElementById("hidden-url");
let hidden_city = document.getElementById("hidden-city");
let hidden_state = document.getElementById("hidden-state");

document.getElementById('review-email').addEventListener('keypress', function(event) {
	let key = event.charCode || event.keyCode
	if (key == 13) event.preventDefault();
})

function review_modal(name, id, link, city, state) {
	reviewee.innerText = name;
	hidden_name.value = name;
	hidden_id.value = id;
	hidden_url.value = link;
	hidden_city.value = city;
	hidden_state.value = state;
}

function review_submit() {
	review_form.submit()
}

function review_enable(source) {
	if (source === 'review') {
		if (rated) {
			button.disabled = false;
			rated = false;
		}
		else reviewed = true;
	}
	else if (source === 'rating') {
		if (reviewed) {
			button.disabled = false;
			reviewed = false;
		}
		else rated = true;
	}
}

function reset_review(clear_text=false) {
	rated = false;
	button.disabled = true;
	for (const star of document.getElementsByClassName("rating-star")) {
		star.parentElement.style = null;
	}
	if (clear_text === true) {
		reviewed = false;
		review_text.value = "";
	}
}
let container = document.getElementById("gallery");
let API_KEY = "fb9839a8c23d3252d7e11e94882cdb1e"
let search_options = {
	"safe_search" : 1,
	"privacy_filter" : 1,
	"sort" : "interestingness-desc",
	"format" : "rest",
	"format" : "json",
	"nojsoncallback" : 1
}

function pageCount(num) {
	document.getElementById('pc-dropdown').innerText = num + " Photos";
}

function getApiCall(event) {
	event.preventDefault();
	page_count = 100; //parseInt(document.getElementById('pc-dropdown').innerText[0])*10;
	search_query = event.target.search_term.value
	if (search_query) {
		loading_modal.show();
		setTimeout(() => {loading_modal.hide()},5000);
		container.removeAttribute('data-isotope');
		container.removeAttribute('style');
		container.innerHTML = ''
		$(document).ready(() => {
			var url =  `https://www.flickr.com/services/rest?method=flickr.photos.search`;
				url += `&api_key=${API_KEY}`;
				url += `&text=${search_query}`;
				url += `&per_page=${page_count}`;
			for (const [key, value] of Object.entries(search_options))
				url += `&${key}=${value}`
			
			$.ajax({url:url, dataType:"json"}).then(data => {

				data.photos.photo.forEach(image => {
					var img_src = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
					var img_link = `https://www.flickr.com/photos/${image.owner}/${image.id}`
					var card =  '<div class="card-container">'
						card += '<div class="card" style="background-color:black !important;">'
						card += `<a href=${img_link}>`
						card += `<img class="card-img-top" src=${img_src}></a>`
						card += `<p class="card-text p-2">${image.title}</p>`
						card += '</div></div>'
						container.innerHTML += card;
				});
				$('#gallery').imagesLoaded(init_isotope);
				loading_modal.hide();
			});
		});
		loading_modal.hide();
	}
	return false;
}

function init_isotope() {
	container.setAttribute('data-isotope','{"percentPosition": true}');
	$('#gallery').isotope('layout');
}

document.getElementById('search-bar').onsubmit = function(event) { return getApiCall(event); }
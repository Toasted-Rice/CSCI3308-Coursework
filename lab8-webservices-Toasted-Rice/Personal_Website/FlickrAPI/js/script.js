var API_KEY = "fb9839a8c23d3252d7e11e94882cdb1e"

function pageCount(num) {
	document.getElementById('pc-dropdown').innerText = num + " Photos";
}

function getApiCall() {
	page_count = parseInt(document.getElementById('pc-dropdown').innerText[0])*10;
	search_query = document.getElementById('flickr-srch').value
	if (search_query) 
		$("#buffer").modal({
			backdrop: "static", //remove ability to close modal with click
			keyboard: false, //remove option to close with keyboard
			show: true //Display loader!
		});
		$(document).ready(() => {
			var url =  'https://www.flickr.com/services/rest?method=flickr.photos.search';
				url += `&api_key=${API_KEY}&text=${search_query}&per_page=${page_count}&format=rest`
				url += '&sort=interestingness-desc&format=json&nojsoncallback=1'
			$.ajax({url:url, dataType:"json"}).then(data => {
				console.log(data);

				var cards = ''
				data.photos.photo.forEach(image => {
					var img_src = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
					var img_link = `https://www.flickr.com/photos/${image.owner}/${image.id}`
					var card = '<div class="card">'
						card += `<a href=${img_link}>`
						card += `<img class="card-img-top" src=${img_src}></a>`
						card += `<p class="card-text p-2">${image.title}</p>`
						card += '</div>'
					cards += card;
				});
				document.getElementById("gallery").innerHTML = cards;
				$("#buffer").modal("hide");
			});
		});
	$("#buffer").modal("hide");
	return false;
}

window.onpopstate = getApiCall();
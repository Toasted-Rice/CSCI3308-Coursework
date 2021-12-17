let order_toggle = true;
let sort_last = null;

function review_sort(key) {
	if (sort_last === key)
		order_toggle = !order_toggle;
	else order_toggle = true;
	sort_last = key;
	$('.data-table').isotope({ sortBy : key, sortAscending: order_toggle });
}

$('.data-table').isotope({
	itemSelector: '.data-row',
	layoutMode: 'vertical',
	getSortData: {
		name: '.name',
		state: '.state',
		rating: '[rating] parseInt',
		date: '.date',
		review_length: function(item) {
			return $(item).find('.review').text().length
		}
	}
})

$('#search-bar > input').on('input', function (event) {
	$('.data-table').isotope({ filter: function() {
		let search = 
			$(this).find('.name' ).text().toLowerCase() + ' <>' +
			$(this).find('.state').text().toLowerCase() + ' <>' +
			$(this).find('.date' ).text().toLowerCase();
		let regex = new RegExp(event.target.value.toLowerCase(),"g")
		return search.match(regex);
	}})
});
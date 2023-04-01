const filterContainer = document.querySelector('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');

//  for filtering the projects

filterContainer.addEventListener('click', (event) => {
	console.log('is working');

	if (event.target.classList.contains('filter-item')) {
		// deactivate existing active 'filter-item'
		filterContainer.querySelector('.active').classList.remove('active');

		// activate new 'filter-item'
		event.target.classList.add('active');

		const filterValue = event.target.getAttribute('data-filter');

		galleryItems.forEach((item) => {
			if (item.classList.contains(filterValue) || filterValue === 'all') {
				item.classList.remove('hide');
				item.classList.add('show');
			} else {
				item.classList.remove('show');
				item.classList.add('hide');
			}
		});
	}
});

//  point 0  : declaration of variables
const filterContainer = document.querySelector('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.gallery-more-btn');

// point 1 :  for filtering the projects

filterContainer.addEventListener('click', (event) => {
	console.log('is working');

	if (event.target.classList.contains('filter-item')) {
		// point 1.1:  deactivate existing active 'filter-item'
		filterContainer.querySelector('.active').classList.remove('active');

		// point 1.2 : activate new 'filter-item'
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

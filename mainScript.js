//  point 0  : declaration of variables
const filterContainer = document.querySelector('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more-btn');

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

//  error not working
// // point 2:  for load more button

// let projectCount = 9;

// loadMoreBtn.addEventListener('click', () => loadMoreProject());

// const loadMoreProject = function (e) {
// 	// e.preventDefault();

// 	// point 2.1 : use fetch to load more projects

// 	fetch('/load-more-projects')
// 		.then((res) => res.json())
// 		.then((data) => {
// 			// point 2.2 : append the new Projects to the existing gallery
// 			data.projects.forEach((project) => {
// 				const projectImages = document.createElement('img');
// 				projectImages.setAttribute('src', project.imgSrc);
// 				gallery.appendChild(projectImages);
// 			});

// 			// point 2.3 : increment the project count

// 			projectCount += data.projects.length;

// 			// point 3 : hide the  " load more " button if there are no more projects to display
// 			if (projectCount >= data.totalProjects) {
// 				loadMoreBtn.style.display = 'none'; //
// 			}
// 		});
// };

function displayMediums() {
	var html = '';
	
	for (var medium in filters) {
		html += `<button id="medium-${medium}" class="medium" onclick="displayGenres('${medium}');displayWorks('${medium}','All')">${medium}</button>`
	}
	
	document.getElementById('mediums').innerHTML = html;
}

function displayGenres(medium) {
	var genres = filters[medium];
	var html = '';
	
	for (var i = 0; i < genres.length; i++) {
		var genre = genres[i];
		html += `<button id="genre-${genre}" class="genre" onclick="displayWorks('${medium}','${genre}')">${genre}</button>`
	}
	
	document.getElementById('genres').innerHTML = html;
}

function displayWorks(medium, genre) {
	var html = '';
	
	for (var i = 0; i < data.length; i++) {
		var work = data[i];
		if (work.medium.includes(medium) && (work.genre.includes(genre) || genre == 'All')) {
			var content = '';
			html += `<div onclick="openLightbox('${work.type}', '${work.youtubeUrl}', '${work.photoFilenames}')">
						<img src="${work.thumbnailFilename}">
						<div class="work-info">
							<div class="title">${work.title}</div>
							<!--<div class="kind">${work.medium}</div>-->
						</div>
					</div>`;
		}
	}
	
	setActiveFilters(medium, genre);
	
	document.getElementById('work-content').innerHTML = html;
}

function setActiveFilters(medium, genre) {
	var mediums = document.getElementsByClassName('medium');
	var genres = document.getElementsByClassName('genre');
	
	for (var i = 0; i < mediums.length; i++) {
		var elm = mediums[i];
		var id = 'medium-' + medium;
		elm.id == id ? elm.classList.add('active') : elm.classList.remove('active');
	}
	
	for (var j = 0; j < genres.length; j++) {
		var elm = genres[j];
		var id = 'genre-' + genre;
		elm.id == id ? elm.classList.add('active') : elm.classList.remove('active');
	}
}

function debounce(callback, time) {
	var timeout;
	return function() {
		var context = this;
		var args = arguments;
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(function() {
			timeout = null;
			callback.apply(context, args);
		}, time);
	}
}

const sliders = document.querySelectorAll('.slide-in');

function checkSlide(e) {
	sliders.forEach(slider => {
		const slideAt = (window.scrollY + window.innerHeight) - 40;
		const imageBottom = slider.offsetTop + slider.offsetHeight;
		const isHalfShown = slideAt > slider.offsetTop;
		const isNotScrolledPast = window.scrollY < imageBottom;
		if (isHalfShown && isNotScrolledPast) {
			slider.classList.add('active');
		} else {
			slider.classList.remove('active');
		}
	})
}

window.addEventListener('scroll', debounce(checkSlide,10));

window.onscroll = function() {
	var navbar = document.getElementById('navbar');
	window.pageYOffset > window.innerHeight - 40 ? navbar.classList.add('black') : navbar.classList.remove('black');
}

displayMediums();
displayGenres(defaultMedium);
displayWorks(defaultMedium, defaultGenre);

function openLightbox(type, youtubeUrl, photoFilenames) {
	if (type == 'video') {
		SimpleLightbox.open({
			items: [youtubeUrl.replace('watch?v=', 'embed/')]
		})
	} else {
		SimpleLightbox.open({
			items: photoFilenames.split(',')
		})
	}
}
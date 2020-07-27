const container = document.querySelector(".container")
const technologies = [
  { name: "Bitbucket", image: "images/fakeprofile/bitbucket.png" },
  { name: "CSS", image: "images/fakeprofile/css.png" },
  { name: "HTML", image: "images/fakeprofile/html.png" },
  { name: "PHP", image: "images/fakeprofile/php.png" },
  { name: "Github", image: "images/fakeprofile/github.png" },
  { name: "Laravel", image: "images/fakeprofile/laravel.png" },
  { name: "Swift", image: "images/fakeprofile/swift.jpg" },
  { name: "React", image: "images/fakeprofile/react.png" },
  { name: "Bootstrap", image: "images/fakeprofile/bootstrap.png" },
  { name: "Vue", image: "images/fakeprofile/vue.png" },
  { name: "Node", image: "images/fakeprofile/node.png" },
]

const showTechnologies = () => {
  let output = ""
  technologies.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">Taste</a>
              </div>
              `)
  )
  container.innerHTML = output
}

function showToast(message) {
  var x = document.getElementById("toast");
  x.className = "show";
  x.innerHTML = message;
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

window.isUpdateAvailable = new Promise(function(resolve, reject) {
	if ('serviceWorker' in navigator) {
		// register service worker file
		navigator.serviceWorker.register('sw.js')
			.then(reg => {
				showToast('Service worker registered', reg.scope);
				reg.onupdatefound = () => {
					const installingWorker = reg.installing;
					installingWorker.onstatechange = () => {
						switch (installingWorker.state) {
							case 'installed':
								if (navigator.serviceWorker.controller) {
									// new update available
									resolve(true);
								} else {
									// no update available
									resolve(false);
								}
								break;
						}
					};
				};
			})
			.catch(err => {
				showToast('[SW ERROR]', err);
				console.error('[SW ERROR]', err)});
	}
});

window['isUpdateAvailable']
	.then(isAvailable => {
		if (isAvailable) {
			showToast('New Update Available');
			console.log('New Update available!');
		} else {
			showToast('No Update Available');
			console.log('No Update available!');
		}
	});

document.addEventListener("DOMContentLoaded", showTechnologies)
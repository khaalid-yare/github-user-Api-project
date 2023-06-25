const input = document.querySelector("input")
const thejavaoutput = document.querySelector("#thejavaoutput");

function serchusers() {
	const xhr = new XMLHttpRequest();
	const username = input.value.trim();
	const url = `https://api.github.com/users/${username}`
	xhr.open('GET', url);
	xhr.addEventListener('readystatechange', function(){
		if(this.readyState === 4 && this.status === 200){
			const user = JSON.parse(this.responseText);
			if(user.message !== "not found"){
				const createdAt = new Date(user.created_at);
				const year = createdAt.getFullYear();
				thejavaoutput.innerHTML = `
				<div class="the-input">
				<img src="${user.avatar_url}" alt="">
				<h2>${user.name}</h2>
				<p>${user.login}</p>
				<p>joined: ${year}</p>
				<div class="follow">
					<p>following: ${user.following}</p>
					<p>followers: ${user.followers}</p>
				</div>
				<button><a href="${user.html_url}" target="_blank">Visit</a></button>
			</div>`
			}
		}else if (input.value.trim() !== '' && this.status === 404)  {
				thejavaoutput.innerHTML = `
				<p>User Not Found</p>
				`
		}else{
			thejavaoutput.innerHTML = ''
		}
	})
	xhr.send();
}
input.addEventListener('keyup', serchusers);


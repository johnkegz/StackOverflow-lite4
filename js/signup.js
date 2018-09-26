document.getElementById('addpost').addEventListener('submit', addPost);

//sign up function
function addPost(e){
    
    e.preventDefault();
    let user_name = document.getElementById('user_name').value;
    let email = document.getElementById('email').value;
	let pass = document.getElementById('password').value;

    fetch('https://stackoverflow-lite2.herokuapp.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
			'Access-Control-Allow-Origin': '*'
			
        },
        body: JSON.stringify({user_name: user_name, email: email, pass_word: pass})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    
}
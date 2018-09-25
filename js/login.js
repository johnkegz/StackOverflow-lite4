
document.getElementById('login-form').addEventListener('submit', Login);

//Login
function Login(e){
	
    e.preventDefault();
    let email = document.getElementById('email').value;
	let pass = document.getElementById('password').value;
 
    fetch('http://127.0.0.1:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
			'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({email: email, pass_word: pass})
    })
    .then((res) => res.json())
    
	.then((data) => {
		let message = data.message;
		localStorage.setItem("accessToken", data.access_token)
		console.log(message);
		if(message == 'Login successful'){
			window.location = 'profile.html';
		}
		else{
			alert('enter correct details');
		}
		})
}
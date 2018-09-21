//document.getElementById('addpost').addEventListener('submit', addPost);
document.getElementById('login-form').addEventListener('submit', Login);
function copyDiv(){    
    var firstDivContent = document.getElementById('navv');
    var secondDivContent = document.getElementById('menu-display');
    secondDivContent.innerHTML = firstDivContent.innerHTML;
}
  
function copyDiv2(){
    var firstDivContent = document.getElementById('navv');
    var secondDivContent = document.getElementById('menu-display');
    secondDivContent.innerHTML = "";
}
//document.getElementById('get-posts').addEventListener('click', addQuestion);
//document.getElementById('get-post').addEventListener('click', getOneQuestion);
function addQuestion(){
	fetch('http://127.0.0.1:5000/api/v1/questions')
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		let output = '<h2>RECENTLY POSTED QUESTIONS</h2>';
		data.forEach((post) => {
			let question_id = post.question_id
			output += `					
					<div class="postee">
								<p>
								<ul>
									<li id="postee-name">Name:</li>
									<li>${post.user_name}</a></li>									
								</ul>
							    </p>
					</div>
					<div>		
						<p>     
								${post.questions}
						</p>																							
						<p>
							<ul class="answer-comment"><!--view number of answers-->
								<li><a href="#" onclick = 'getOneQuestion();'>Answers(4)</li>
								<li><a href="post_answer.html">Post answer</a></li>
																	
							</ul>
							</p>
						<hr/>
					</div>
					
			`;
		});
		document.getElementById('output').innerHTML = output;
	})
}


function getOneQuestion(){
	alert(0);
	fetch('http://127.0.0.1:5000/api/v1/questions/1')
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		let output = '<h2>QUESTION AND ANSWERS</h2>';
		data.forEach((post) => {
			let question_id = post.question_id
			output += `					
					<div class="postee">
								<p>
								<ul>
									<li id="postee-name">Name:</li>
									<li>${post.user_name}</a></li>									
								</ul>
							    </p>
					</div>
					<div>		
						<p>     
								${post.questions}
						</p>																							
						<p>
							<ul class="answer-comment"><!--view number of answers-->
								<li><a href="#" onclick = 'getOneQuestion();'>Answers(4)</li>
								<li><a href="post_answer.html">Post answer</a></li>
																	
							</ul>
							</p>
						<hr/>
					</div>
					
			`;
		});
		document.getElementById('output').innerHTML = output;
	})
}
//sign up function
function addPost(e){
    
    e.preventDefault();
    let user_name = document.getElementById('user_name').value;
    let email = document.getElementById('email').value;
	let pass = document.getElementById('password').value;

    fetch('http://127.0.0.1:5000/api/v1/auth/signup', {
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
//Login
function Login(e){
	alert(0);
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
    .then((data) => console.log(data))
    
}

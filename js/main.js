//document.getElementById('addpost').addEventListener('submit', addPost);

//document.getElementById('answer-form').addEventListener('submit', AddAnswer);
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
//document.getElementById('question-form').addEventListener('click', Question);
//document.getElementById('get-post').addEventListener('click', getOneQuestion);
//document.getElementById('delete-question').addEventListener('click', deleteQuestion);
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


ownQuestion();

function ownQuestion(){

	fetch('http://127.0.0.1:5000/api/v1/ownquestions', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
			
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'Access-Control-Allow-Origin': '*'
	}})
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		let ownoutput = '<h2>MY QUESTIONS</h2>';
		data.forEach((post) => {
			let question_id = post.question_id
			ownoutput += `					
					<p>					
						${post.questions}							
					</p>																				
							<p>
								<ul class="answer-comment">
									<li><a href="question_ans.html">Answers</li>
									<li><a href="#" onclick ='DeleteQuestion(${post.question_id});'>delete</a></li>
									<li><a href="#">${post.question_date}</a></li>									
								</ul>
								</p>
							<hr/>
					
			`;
		});
		document.getElementById('ownoutput').innerHTML = ownoutput;
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

function Question(e){
	
    e.preventDefault();
    let qn = document.getElementById('question').value;
	alert(0);
    fetch('http://127.0.0.1:5000/api/v1/questions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
			//'Authorization': `Bearer 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Mzc4NTcxMDksIm5iZiI6MTUzNzg1NzEwOSwianRpIjoiMzI4NzNjNTktMmUxNS00OGZmLWI2NmYtOGZkMjNlMDBlYTFkIiwiZXhwIjoxNTM3ODU4MDA5LCJpZGVudGl0eSI6MSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.kzBZOpfIBs9uEBqsY79hRj0vAr84jrm25bWcYD4D1nA'`,
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({question: qn})
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
		
}
function AddAnswer(e){
	
    e.preventDefault();
    let ans = document.getElementById('answer').value;
	alert(ans);
    fetch('http://127.0.0.1:5000/api/v1/questions/1/answers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
			
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({answer: ans})
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
		
}
function DeleteQuestion(question_id){
	
    
   
    fetch('http://127.0.0.1:5000/api/v1/Delete /questions/'+question_id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
			
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
		
}

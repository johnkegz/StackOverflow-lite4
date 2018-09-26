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
document.getElementById('get-posts').addEventListener('click', addQuestion);
document.getElementById('post-question').addEventListener('click', postQuestion);
//document.getElementById('question-form').addEventListener('click', postQuestion);
//document.getElementById('get-post').addEventListener('click', getOneQuestion);
//document.getElementById('delete-question').addEventListener('click', deleteQuestion);
function addQuestion(){
	fetch('https://stackoverflow-lite2.herokuapp.com/api/v1/questions')
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
								<li><a href="#" onclick = 'getOneQuestion(${post.question_id});'>Answer(s)</li>
								<li><a href="#" onclick = 'Answer(${post.question_id});'>Post answer</a></li>
																	
							</ul>
							</p>
						<hr/>
					</div>
					
			`;
		});
		document.getElementById('main-display').innerHTML = output;
	})
}


function getOneQuestion(question_id){
	
	fetch('https://stackoverflow-lite2.herokuapp.com/api/v1/questions/'+question_id)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		let output = '<h2>Question and its answers</h2>';
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
								<li><a href="#" onclick = 'getOneQuestion(${post.question_id});'>Answer(s)</li>
								<li><a href="#" onclick = 'Answer(${post.question_id});'>Post answer</a></li>
																	
							</ul>
							</p>
						<hr/>
					</div>`;
		});
		document.getElementById('main-display').innerHTML = output;
	})
}


ownQuestion();

function ownQuestion(){

	fetch('https://stackoverflow-lite2.herokuapp.com/api/v1/ownquestions', {
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
function postQuestion(){
	let output = '<h2>Post question</h2>';
		
		
		output += `					
					<div class="login">
                    <p><h2>post answer<h2></p>
                    <form>
                            <textarea class="text-area" id="question">
                                  
                            </textarea> 
                       <br/>
                       <br/><br/><br/>
                        <input type="submit" class="create-account-submit" onclick = "Question();" value= "Submit" />
                    </form>
                </div>
					
			`;
		
		document.getElementById('main-display').innerHTML = output;
}
function Question(){
	
   
    let qn = document.getElementById('question').value;
	alert(0);
    fetch('https://stackoverflow-lite2.herokuapp.com/api/v1/questions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({question: qn})
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
		
}

function Answer(question_id){
		let output = '<h2>Post answer to this question</h2>';
		console.log(question_id);
		
		output += `					
					<div class="login">
                    <p><h2>post answer<h2></p>
                    <form>
                            <textarea class="text-area" id="answer">
                                  
                            </textarea> 
                       <br/>
                       <br/><br/><br/>
                        <input type="submit" class="create-account-submit" onclick = "AddAnswer(${question_id});" value= "Submit" />
                    </form>
                </div>
					
			`;
		
		document.getElementById('main-display').innerHTML = output;
	
}

function AddAnswer(question_id){
	
    let ans = document.getElementById('answer').value;
	
    fetch('https://stackoverflow-lite2.herokuapp.com/api/v1/questions/'+question_id+'/answers', {
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
    .then((data) => {
		console.log(data);
		let output = '<h2>Post answer to this question</h2>';
		data.forEach((post) => {
			let question_id = post.question_id
			output += `					
					<div class="login">
                    <p><h2>post answer<h2></p>
                    <form id = "answer-form">
                            <textarea class="text-area" id="answer">
                                  
                            </textarea> 
                       <br/>
                       <br/><br/><br/>
                        <input type="submit" class="create-account-submit" value= "Submit" />
                    </form>
                </div>
					
			`;
		});
		document.getElementById('main-display').innerHTML = output;
	})
		
}
function DeleteQuestion(question_id){    
   
    fetch('https://stackoverflow-lite2.herokuapp.com/api/v1/Delete /questions/'+question_id, {
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
	ownQuestion();	
}

function accept(question_id, answer_id){
	let ans = document.getElementById('accept').value;
	
    fetch('/api/v1/questions/'+question_id+'/answers/'+answer_id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
			
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({user_action: ans})
    })
    .then((res) => res.json())
    .then((data) => alert(accepted))
		
}

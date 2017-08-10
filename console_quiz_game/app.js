(function(){

	var questionArray = [];
	var randomQuestion = Math.floor(Math.random()*5);

	var Question = function(question, answers, correctNumber){
		this.question = question;
		this.answers = answers;
		this.correctNumber = correctNumber;
	}

	Question.prototype.answersMethod = function(){
		console.log(questionArray[randomQuestion].question);
		var correctNumberPrompt = questionArray[randomQuestion].correctNumber;
		for(var i = 0; i < questionArray[randomQuestion].answers.length; i++){
			console.log(questionArray[randomQuestion].answers[i]);
		}

		var answerPrompt = parseFloat(prompt('Please, type correct answer number', 0));
		if(answerPrompt === correctNumberPrompt){
			console.log('Correct Answer!');
		}else{
			console.log('The answer is incorrect!');
		}
	}

	var firstQuestion = new Question('What is your name?', ['0-Alex','1-Axxel','2-Michael'] , 0);
	var secondQuestion = new Question('How old are you', ['0-22','1-34','2-29'] , 2);
	var thirdQuestion = new Question('Where do you want to live?', ['0-Germany','1-Africa','2-USA'] , 2);
	var fourthQuestion = new Question('What is a coolest language?', ['0-JS','1-Java','2-C++'] , 0);
	var fifthQuestion = new Question('Where do you live now?', ['0-Paris','1-Kiev','2-London'] , 1);

	questionArray = [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion];

	firstQuestion.answersMethod();

})();


















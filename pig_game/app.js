
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastTry;

document.querySelector('.btn-roll').addEventListener('click', function(){

	if(gamePlaying){
		var dice = Math.floor(Math.random()*6)+1;

		var diceSelector = document.querySelector('.dice');
		diceSelector.style.display = 'block';
		diceSelector.src = 'dice-'+dice+'.png';

		if(dice===6 && lastTry===6){
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		}else if(dice !== 1){
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}else{
			nextPlayer();
		}

		lastTry = dice;
		
	}

});

document.querySelector('.btn-hold').addEventListener('click', function(){

	if(gamePlaying){
		scores[activePlayer] += roundScore;
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		if(scores[activePlayer] >= 100){
			gamePlaying = false;
			document.querySelector('#name-' + activePlayer).textContent = 'Победитель!!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		}else{
			nextPlayer();
		}
	}

})

document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
}

function init(){
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('#name-0').textContent = 'Игрок 1';
	document.querySelector('#name-1').textContent = 'Игрок 2';
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
}
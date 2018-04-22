//declaring variables.
let moves = document.querySelector('.moves');
let cardsDeck = document.querySelector('.deck'); 
let cards = document.querySelectorAll('.card'); 
let cardsArray = [...cards]; //iterating [cards] so we can use it as an array
const repeatButton = document.querySelector('.restart');
let cardList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor",
			    " fa fa-bolt", "fa fa-cube", "fa fa-leaf",
			    "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond",
			    "fa fa-paper-plane-o", "fa fa-anchor", " fa fa-bolt", "fa fa-cube",
			    "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
let matchedCards = [];
let openedCards =[];
let movesCount = 0;
let starsNo = 3;

//initiate the game 
shuffle(cardList);
for (let i = 0; i<cardsArray.length;i++){
	cardsArray[i].innerHTML = '<i></i>';
	cardsArray[i].firstElementChild.className = cardList[i];
	};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// to display the content of the card
function displayCard(){
	event.target.classList.add('open');
};

// I included more than one functionality in this one,
// I'll write comments for each one
function matchCard(){
	let openedCardsNo = openedCards.length;
	let matchedCardsNo = matchedCards.length;
	let targetList = event.target;
	if(targetList.nodeName === 'LI'){ //To make sure clicks outside the card are not counted
		if (openedCards.length === 0 && targetList.className === 'card open'){
			openedCards[0] = targetList;//filling the openedCards array with first clicked element
		}else if(openedCards.length === 1 && targetList.className === 'card open' && targetList!== openedCards[0]){
			openedCards[1] = targetList;//adding the second element to the array after confirming the click was on another card
		}
			
		if (openedCards.length === 2){
			for (const openCard of openedCards){
				let openedCard1 = openedCards[0];
				let openedCard2 = openedCards[1];
	    //adding the match class if they do match 
				if(openedCard1.firstElementChild.className === openedCard2.firstElementChild.className){
					openedCard1.className += ' match';
					openedCard2.className += ' match';
					matchedCards.length = matchedCards.length + 2;
					openedCards.length = 0;
					//The condition to win the game
					if (matchedCards.length === 16){
						//Added some delay so the user can see the last card flip
						setTimeout(function(){
					 		gameWin();
						 }, 1500);
						
					} 
				}else{
					//Adding the not-matched class foe 1 second and closing the card after that
					 setTimeout(function(){
					 openedCard1.className = 'card';
					 openedCard2.className = 'card';
					 }, 1000);
					 openedCard1.className = 'card not-matched';
				 	 openedCard2.className = 'card not-matched';
					
					 openedCards.length = 0;
				}
			}
		}
		countMoves();
	}
}
// To count the moves
function countMoves (){
	movesCount++;
	moves.textContent = (movesCount);
}
// When winning the game 
function gameWin(){
	let gameFinish = document.querySelector('.no-win');
	let container = document.querySelector('.container');
	let finalMoves = document.querySelector('#countNumber');
	let finalRating = document.querySelector('#finalStars');
	let restartButton = document.querySelector('#restartButton');
//I choosed to have the final results div in the HTML but be hidden until the condition is fulfilled
	gameFinish.classList.toggle('no-win');
	gameFinish.classList.toggle('win');
	container.style.display = 'none';
	finalMoves.textContent = (movesCount);
	finalRating.textContent = (starsNo);

	restartButton.addEventListener('click',function(){
		window.location.reload();
	});

}

function rating(){
	if (movesCount >= 26 && movesCount < 34){
		document.getElementById('star3').style.color = 'black';
		starsNo = 2;
	}else if (movesCount >= 34 && movesCount <= 40){
		document.getElementById('star2').style.color = 'black';
		starsNo = 1;
	}
}
repeatButton.addEventListener('click', function(){
	shuffle(cardList);
	for (let i = 0; i<cardsArray.length;i++){
	cardsArray[i].classList.remove('match','open','not-matched');
	cardsArray[i].innerHTML = '<i></i>';
	cardsArray[i].firstElementChild.className = cardList[i];
	
	}
	openedCards.length = 0;
	movesCount = 0;
	
});

cardsDeck.addEventListener('click', function(event){
	displayCard();
	matchCard(event);
	rating();
});

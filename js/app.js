     let card = document.getElementsByClassName('card');
    let initialDeck = [...card];
    let newDeck = document.querySelector('.deck');

    let restart = document.querySelector('.restart');

    //Open Card Array
    var openCards = [];
   
    //set counter for moves
    let moves = 0;

    
    //Stars List
    let star3 = document.getElementById('star-3');
    let star2 = document.getElementById('star-2');

    let matchCounter;
    
    let starsLeft = 3;
  
  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  
  function shuffledDeck(){
    
    shuffle(initialDeck);
    
    for (let i = 0; i < initialDeck.length; i++){
       let newCard = initialDeck[i];
       newDeck.appendChild(newCard);
    }
  }  
 
window.onload =function(){
  shuffledDeck();
  startGame();
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Reset Game Function
var startGame = function(){
  //set move counter to 0
  document.querySelector('.moves').innerText = 0;
  moves=0;
  //clear deck
  initialDeck.forEach(function(card){
    card.classList.remove('show', 'open', 'match');
  });
  //reset stars
  star3.style.display = 'inline-block';  
  star2.style.display = 'inline-block';
  //reset timer
  second = 0;
  minute = 0;
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
  //reset match counter
  matchCounter=0;

};

//Add Open Card to Array
var addOpenCards = function(){
  openCards.push(this);
  //check to see if 2 cards in openCards array
  if (openCards.length === 2){
    //check to see if 2 cards in openCards array are match
    if(openCards[0].querySelector('i').classList.value === openCards[1].querySelector('i').classList.value){
      match();
    }
    else {
       setTimeout(noMatch, 1000);
    }
   movesCounter(); 
   removeStars(); 
  }   
};

//Incriment Moves Counter
var movesCounter = function(){
  moves++;
  document.querySelector('.moves').innerText = moves;
  if(moves == 1){
    startTimer();
  }
};

//Remove Stars after so many moves
var removeStars = function(){
  if(moves > 1){
     starsLeft = 2;
     star3.style.display = 'none';
  } if (moves > 3){
     starsLeft = 3;
     star2.style.display = 'none';
  }
};


//Lock Match Cards in Open 
var match = function(){
  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  openCards = [];
  matchCounter++;
  if(matchCounter===8){
    modal();
    stopTimer();
  }
};

//Hide unmatched cards
var noMatch = function(){
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  openCards = [];
  
};
 
// Flip Cards 
var flipCard = function(){
  if (openCards.length === 2){
    return;
  }
    else{
    this.classList.toggle('open');
    this.classList.toggle('show');
   }
};   
//Timer help courtesy of https://github.com/sandraisrael/Memory-Game-fend/blob/master/js/app.js
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
    },1000);
}

var stopTimer = function(){
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
};



// Loop to add event listenters
initialDeck.forEach(function(card){
  card.addEventListener('click', flipCard);
  card.addEventListener('click', addOpenCards);  
});


restart.addEventListener('click', startGame);

//Modal stuff
var modal = function(){
 let popup = document.querySelector('.hide');
 popup.classList.toggle('hide');

document.querySelector('.final-move').innerHTML= " " + moves + " ";
document.querySelector('.final-time').innerHTML= " " + document.querySelector('.timer').innerHTML + " ";
document.querySelector('.final-stars').innerHTML= " " + starsLeft + " ";
};



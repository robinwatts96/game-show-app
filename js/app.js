const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGame = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const ol = document.querySelector('#scoreboard ol');
const h1 = document.createElement('h1');
let missed = 0;

// Phrases array
const phrases = [
    'JAVASCRIPT GIVES ME A HEADACHE',
    'BUT A WORTHWHILE HEADACHE',
    'BECAUSE ALLTHOUGH I NEARLY THREW MY LAPTOP OUT THE WINDOW',
    'I HAVE NEARLY GOT THERE',
    'I RAN OUT OF PHRASES'
];


// Start Game Listener
startGame.addEventListener('click', () => {
  overlay.style.display = 'none';
});


// Random Phrase Array
const getRandomNumberAsArray = arr => {
  let randomNumber = Math.floor(Math.random() * phrases.length);
  for (let value of arr) return arr[randomNumber];
}; 
const randomLetter = getRandomNumberAsArray(phrases).split('');


// Set the game display
const displayPhrases = arr => {
    const ulPhrase = document.querySelector('#phrase ul'); 
     for (let value of randomLetter) {
        const listPhrase = document.createElement('li');
        listPhrase.textContent = value;
        listPhrase.className = 'letter';
    
        listPhrase.textContent === ' ' ? listPhrase.className = 'space': null;
       
        ulPhrase.appendChild(listPhrase);
    } 
    return ulPhrase.children;
}
const displayPhrase = displayPhrases(randomLetter);
const lists = Array.from(displayPhrase);
let listPhrase = lists.map(list => list.textContent);


// CheckLetter function
const checkLetter = button => {
    const li = document.querySelectorAll('.letter');
    for (let value of li) {
        const valueOfLi = value.textContent.toUpperCase()
        if(button.includes(valueOfLi))
            value.classList.add('show');
    }
};

const liLetter = document.querySelectorAll('.letter')

const checkWin = () => {
    const liShow = document.querySelectorAll('.show')
    
        if(!ol.childElementCount) {
            WinOrLose('lose','You Lose!');
        }   
    
        else if(liLetter.length === liShow.length) {
            WinOrLose('win','You Win!');
        }
};


// Add an event listener to the keyboard
startGame.addEventListener('click',(e) => {
    overlay.style.display = 'none';
    
    e.target.textContent === 'Play Again?' ? location.reload() : null; 
})


qwerty.addEventListener('click', e => {
    const button = e.target;
    button.disabled = true;
    if(button.tagName === 'BUTTON'){
      const selection = button.textContent.toUpperCase();
      //The correct button
      if(listPhrase.includes(selection)) {
        button.className = 'chosen';
        checkLetter(selection);
    // Add transition
         const liShow = document.querySelectorAll('.show')
         for (let value of liShow) {
                value.classList.add('transition')
         }
        checkWin();  
      }//The Wrong button
      else {
          button.className = 'lose';
          ol.lastElementChild.remove();
          checkWin()
      };
    }
});


//Refactoring Game Condition
const WinOrLose = (condition,textCondition) => {
    overlay.style.display = '';
    overlay.className = condition;
    startGame.textContent = 'Play Again?';
    h1.textContent = textCondition;
    overlay.appendChild(h1);
}
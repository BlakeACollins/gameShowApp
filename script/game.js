const overlay = document.querySelector("#overlay");
const title = overlay.firstElementChild;
const reset_button = overlay.lastElementChild;
const phrase_container = document.querySelector("#phrase ul");
const phrases = [
  `Piece of cake`,
  `Back to the drawing board`,
  `Blast from the past`,
  `Break a leg`,
  `Actions speak louder then words`,
];
const keyboard = document.querySelector("#qwerty");
const buttons = document.querySelectorAll("#qwerty button");
const lives = document.querySelectorAll(".tries img");

let missed = 0;

//RESET GAME
const reset_game = ()=> {
  missed = 0;
  while (phrase_container.children.length > 0) {
    phrase_container.removeChild(phrase_container.children[0]);
  }
  for ( let i = 0 ; i < buttons.length ; i++ ) {
    buttons[i].removeAttribute("class");
    buttons[i].removeAttribute("disabled");
  }
  for ( let i = 0 ; i < lives.length ; i++ ) {
    lives[i].setAttribute("src", "images/liveHeart.png");
  }
  phrase_array = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phrase_array);
  phrase_letters = document.querySelectorAll("li[class*=letter]");
}

// START AND RESET
overlay.addEventListener("click", (event) => {
  const e = event.target;
  if (e.tagName.toLowerCase() === "a") {
    if (overlay.className === "start") {
      overlay.style.display = "none";
    } else {
        overlay.style.display = "none";
        reset_game();
    } 
  }
})

// RETURNS A RANDOM PHRASE
const getRandomPhraseAsArray = (array) => {
  let random = Math.floor( Math.random() * array.length);
  const random_phrase = phrases[random];
  const random_phrase_split = random_phrase.split("");
  return random_phrase_split;
}

let phrase_array = getRandomPhraseAsArray(phrases);

// ADDS PHRASE TO THE DISPLAY
const addPhraseToDisplay = (array)=>{
  for ( i = 0 ; i < array.length ; i++) {
    let character = array[i];
    let character_item = document.createElement("li");
    character_item.textContent = character;
    phrase_container.appendChild(character_item);
    if (character_item.textContent !== " ") {
      character_item.setAttribute("class", "letter");
    } else {
        character_item.setAttribute("class", "space");
    }   
  }
}

addPhraseToDisplay(phrase_array);

let phrase_letters = document.querySelectorAll("li[class*=letter]");

// CHECKS LETTER SELECTED TO RANDOM PHRASE 
const checkLetter = (button)=>{
  const selected_letter = button;
  let letter = null;
  for (let i = 0; i < phrase_letters.length ; i++) {
  let current_letter = phrase_letters[i];
    if (selected_letter.textContent.toLowerCase() === current_letter.textContent.toLowerCase()) {
      current_letter.setAttribute("class", "show letter");
      letter = current_letter;
    } 
  }
  return letter;
}

// REMOVES ONE LIFE IF THE WRONG LETTER IS USED
const remove_life = ()=> {
  let lives_counter = missed - 1;
  lives[lives_counter].setAttribute("src", "images/lostHeart.png");
}

// BACKGROUND COLOR FOR WIN/LOSE
const game_outcome = (result)=> {
  overlay.style.display = "";
  if (result === "win"){
    overlay.setAttribute("class", "win");
    title.textContent = "You WIN!!";
    reset_button.textContent = "Play again";
  } else if ( result === "lose") {
      overlay.setAttribute("class", "lose");
      title.textContent = "You LOSE.";
      reset_button.textContent = "Play again";
  }
}

// CHECKING TO SEE IF USER WON/LOSS
const checkWin = ()=>{
  const phrase_show = document.querySelectorAll("li[class*=show]");
  if (phrase_show.length === phrase_letters.length) {
    game_outcome("win");
  } else if ( missed >= 5 ) {
    game_outcome("lose");
  }
}

keyboard.addEventListener("click", (event)=>{
  const e = event.target;
  if ( e.tagName.toLowerCase() === "button") {
    e.setAttribute("class", "chosen");
    e.setAttribute("disabled", true);  
    const letterFound = checkLetter(e);
    if (letterFound === null) {
      missed = missed + 1;
      remove_life();
    }
  }
  checkWin();
})
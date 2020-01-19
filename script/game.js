const overlay = document.querySelector("#overlay");
const title = overlay.firstElementChild;
const reset_button = overlay.lastElementChild;
const phrase_container = document.querySelector("#phrase ul");
const phrases = [
  `Same as always`,
  `It was nice chatting with you`,
  `It costs a fortune`,
  `It was a real bargain`,
  `I can hardly keep my eyes open`,
];
const keyboard = document.querySelector("#qwerty");
const buttons = document.querySelectorAll("#qwerty button");
const lives = document.querySelectorAll(".tries img");

let missed = 0;

// reset game function - resets counter, phrase, buttons, lives
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

// controls to start and restart the game
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

// generates and returns a random phrase from the phrases array
const getRandomPhraseAsArray = (array) => {
  let random = Math.floor( Math.random() * array.length);
  const random_phrase = phrases[random];
  const random_phrase_split = random_phrase.split("");
  return random_phrase_split;
}

let phrase_array = getRandomPhraseAsArray(phrases);

// displays the p hrase generated to the document
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

// checks if the selected letter on the keyboard matches any of the characters in the phrase 
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

// removes a life if an incorrect character is selected on the keyboard
const remove_life = ()=> {
  let lives_counter = missed - 1;
  lives[lives_counter].setAttribute("src", "images/lostHeart.png");
}

// changes overlay based on game result
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

// checks if the user has won or lost
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
// Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName
document.querySelector("footer").innerHTML = `${gameName} Game Created By <a class="developer" herf="https://github.com/MohamedAnter28" target="_blank">Mohamed Tamer</a> &copy ${new Date().getFullYear()}`;


// Game options

let numOfTries = 5;
let numberofletter = 6;
let currentTry = 1;
let numberofhints = 3;


// words 
let wordsToGuess  = "";
let words = ["Create","Update","Delete","Master","Branch","Mainly","Elzero","School"];
wordsToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase()

let msgarea = document.querySelector(".msg")


//Hints
document.querySelector(`.hint span`).innerHTML = numberofhints;
const getHintButton = document.querySelector(`.hint`)
getHintButton.addEventListener("click",getHint)


function generateInput(){
    // create main Div
  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numOfTries; i++){
    const tryDiv  = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    // create inputs
    for (let j = 1 ; j <= numberofletter; j++){
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength","1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv)
  }
  inputsContainer.children[0].children[1].focus()

  // Disabeld aLL inputs
  const inputsInDisabeledDiv = document.querySelectorAll(".disabled-inputs input");
  inputsInDisabeledDiv.forEach((input) => (input.disabled = true));

  // focus on inputs 
  const inputs = document.querySelectorAll("input")

  inputs.forEach((input,index) =>{
    // [1]
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1]
      if (nextInput) nextInput.focus()
    });
    
    // [2]
    // !important
    //key 
    // target
    input.addEventListener("keydown", function(event){
      // console.log(event)
      const currentIndex = Array.from(inputs).indexOf(event.target); // or this
      // console.log(currentIndex)
      if (event.key === "ArrowRight"){
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus()
      }

      if (event.key === "ArrowLeft"){
        const preInput = currentIndex - 1;
        if (preInput >= 0) inputs[preInput].focus()
      }
    })

  });

  

}


const guessButton  = document.querySelector(".check");

guessButton.addEventListener("click",handelGuesses)


function handelGuesses(){
  let succesGuess = true;
  for (let i = 1; i <= numberofletter; i++){
    const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`)
    const letter = inputField.value.toLowerCase()
    const actualLetter = wordsToGuess[i - 1]

    // game logic
    if (letter === actualLetter){
      inputField.classList.add("yes-in-place")
    }else if (wordsToGuess.includes(letter) && letter !== ""){
      inputField.classList.add("not-in-place")
      succesGuess = false;
    }else {
      inputField.classList.add("no")
      succesGuess = false;  
    }
  }

  // check if user win or lose
  if (succesGuess){
    msgarea.innerHTML = `You Win The Word Is <span>${wordsToGuess}</span>`
    if (numberofhints === 3){
      msgarea.innerHTML = `<p>Congratz You Didn't Use Hints,<span>${wordsToGuess}</span></p>`
    }

    let alltries  = document.querySelectorAll(".inputs > div")

    alltries.forEach((div) => div.classList.add("disabled-inputs"))

    guessButton.classList.add("disabled")
    getHintButton.classList.add("disabled")
  }else{
    document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
    document.querySelectorAll(`.try-${currentTry} input`).forEach((input) => input.disabled = true)
    currentTry++;
    
    
    let el = document.querySelector(`.try-${currentTry}`);
    if (el){
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
      document.querySelectorAll(`.try-${currentTry} input`).forEach((input) => input.disabled = false)
      document.querySelector(`.try-${currentTry} input`).focus()
    }else{
      guessButton.classList.add("disabled")
      getHintButton.classList.add("disabled")
      msgarea.innerHTML = `You Lose The Word Is <span>${wordsToGuess}</span>`
    }
  }
}


function getHint(){
  if (numberofhints > 0){
    numberofhints--;
    document.querySelector(`.hint span`).innerHTML = numberofhints
  }
  if (numberofhints === 0){
    getHintButton.classList.add("disabled")
  }

  const enableInputs = document.querySelectorAll(`input:not([disabled])`)
  // console.log(enableInputs)
  const emptyEnableInputs = Array.from(enableInputs).filter((input) => input.value.trim() === "")
  // console.log(emptyEnableInputs)

  if (emptyEnableInputs.length > 0){
    const randomIndex = Math.floor(Math.random() * emptyEnableInputs.length)
    const randomInput = emptyEnableInputs[randomIndex];
    const indexToFill = Array.from(enableInputs).indexOf(randomInput)

    if (indexToFill  !== -1){
      randomInput.value = wordsToGuess[indexToFill].toUpperCase()
    }
  }
}


function handleBackspace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    // console.log(currentIndex);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", handleBackspace);

window.onload = function(){
  generateInput()
}


const developerLink = document.querySelector(".developer");

developerLink.addEventListener("click", (e) => {
  e.preventDefault(); 
  const link = `https://github.com/MohamedAnter28`;
  window.location.assign(link)
  
});

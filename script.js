async function getWord() {
    let response = await fetch( 'https://random-word-api.herokuapp.com/word?length=5');
    let data = await response.json()
    return data
}

let word = ''
getWord().then(data => {
    console.log(data)
    word = data
})

console.log(word)

let guess = document.getElementsByClassName("guess1")

var array = []
for (let index = 0; index < guess.length; index++) {
    array.push(guess[index])
}

let counter = 0
var guessNumber = 1
let input = document.getElementById("userInput").addEventListener("keydown", (event => {


    if (event.key == 'Backspace') {
        array[counter-1].innerHTML = null
        counter = counter -1
    } 
    else if (event.key == 'Enter') {
        event.preventDefault()
        submitGuess(array, word)

        guessNumber ++
        counter = 0

        guess = document.getElementsByClassName("guess" + guessNumber)
        array = []

        for (let index = 0; index < guess.length; index++) {
            array.push(guess[index])
        }
    } 
    else {
    array[counter].innerHTML = event.key
    counter ++
    }
}))


function submitGuess (array, word) {

    // convert word into string
    let wordstr = word.toString();

    // create array of letters in word and how many times they appear
    let letNum = {}
    for (let i = 0; i < 5; i++) {
        if (wordstr[i] in letNum) {
            letNum[wordstr[i]] = (letNum[wordstr[i]]) +1
        } else {
            letNum[wordstr[i]] = 1
        }
    }
    
    // remove correct guesses from letter number array
    for (let i = 0; i < 5; i++) {
        if (array[i].innerHTML == wordstr[i]) {
            letNum[array[i].innerHTML] = letNum[array[i].innerHTML] -1
        }
    };

    // create array of guessed letters
    guessedLetters = []
    for (let index = 0; index < guess.length; index++) {
        guessedLetters.push(guess[index].innerHTML)
        }
    
    // create key value dictionary of letters in word and how many times they occure
    let guessedLetterCount = {}
    for (let i = 0; i < 5; i++) {
        if (guessedLetters[i] in guessedLetterCount) {
            guessedLetterCount[guessedLetters[i]] = (guessedLetterCount[guessedLetters[i]]) +1
        } else {
            guessedLetterCount[guessedLetters[i]] = 1
        }
    }

    // iterate over guess boxes
    for (let i = 0; i < 5; i++) {

        
        // create variable checking if letter exists and if so,the first index it is in the guess array
        let ifInWordIndex = wordstr.indexOf(array[i].innerHTML)

        let currentGuessedLetter = array[i].innerHTML
        let currentCorrectLetter = wordstr[i]

        let currentGuessedLetterNumCorrectGuess = 0

        for (let x = 0; x < 5; x++) {
            if ((word[x] == array[x].innerHTML) && (array[x].innerHTML == currentGuessedLetter)) {
                currentGuessedLetterNumCorrectGuess ++
            }
        }

        let currentCorrectLetterNum = 0
        for (let x = 0; x < 5; x++) {
            if (currentGuessedLetter == array[x].innerHTML) {
                currentCorrectLetterNum ++
            }
        }

        // check if guessed letter exists in word using -1 returned from indexOf
        if (ifInWordIndex == -1) {
            continue;
        }
        // check if box has correct guess
        else if (currentGuessedLetter == currentCorrectLetter) {
            array[i].style.backgroundColor = "green"
            continue; 
        }

        else if (letNum[currentGuessedLetter] > 0){
            array[i].style.backgroundColor = "yellow";
            letNum[currentGuessedLetter] = letNum[currentGuessedLetter] -1
            continue;
        }

        else letNum[currentGuessedLetter] = letNum[currentGuessedLetter] -1
    }
}
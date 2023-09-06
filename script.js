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



    var guess = document.getElementsByClassName("guess1")

    var array = []
    for (let index = 0; index < guess.length; index++) {
        array.push(guess[index])
    }

    var counter = 0
    var guessNumber = 1

    let input = document.getElementById("userInput").addEventListener("keydown", (event => {
        
        

        if (event.key == 'Backspace') {
            array[counter-1].innerHTML = null
            counter = counter -1

        } else if (event.key == 'Enter') {
            event.preventDefault()

            submitGuess(array, word)

            guessNumber ++
            counter = 0
            console.log(array)

            guess = document.getElementsByClassName("guess" + guessNumber)
            var array = []
            for (let index = 0; index < guess.length; index++) {
                array.push(guess[index])
            }
            

        } else {
        array[counter].innerHTML = event.key
        counter ++
        }
    }))


    function submitGuess (array, word) {
        // convert word into string

        wordstr = word.toString();

        // create array of letters in word and how many times they appear
        var letNum = {}
        for (let i = 0; i < 5; i++) {
            if (wordstr[i] in letNum) {
                letNum[wordstr[i]] = (letNum[wordstr[i]]) +1
            } else {
                letNum[wordstr[i]] = 1
            }
        }

        // iterate over guess boxes
        for (let i = 0; i < 5; i++) {
            
            // create variable checking if letter exists and if so,the first index it is in the guess array
            let ifInWordIndex = wordstr.indexOf(array[i].innerHTML)

            let currentGuessedLetter = array[i].innerHTML
            let currentCorrectLetter = wordstr[i]
            
            
            // check if guessed letter exists in word using -1 returned from indexOf
            if (ifInWordIndex == -1) {
                continue;

            // check if box has correct guess
            } else if (currentGuessedLetter == currentCorrectLetter) {
                // update letter count in array
                letNum[currentCorrectLetter] = (letNum[currentCorrectLetter] -1)
                // turn box green
                array[i].style.backgroundColor = "green"
                continue; 

            } else if (currentGuessedLetter in letNum) {
                let totalTimesCurrentLetter = 0
                array.forEach(element => {
                    if (element.innerHTML == currentGuessedLetter) {
                        totalTimesCurrentLetter ++
                    }
                });

                // check if it is correctly guessed later for all occurences
                if (totalTimesCurrentLetter >= 1) {

                    var correctGuesses = 0

                    for(let y in wordstr){
                        if ((array[y].innerHTML == currentGuessedLetter) && (array[y].innerHTML == wordstr[y])) {
                            correctGuesses ++ 
                        } 
                    
                    }
                    console.log("correctGuesses: " + correctGuesses)
                    console.log("totalTimesCurrentLetter: " + totalTimesCurrentLetter)
                    console.log("letNum: " + (letNum[array[i].innerHTML]))

                    if ((correctGuesses < totalTimesCurrentLetter) && (totalTimesCurrentLetter <= (letNum[array[i].innerHTML]))) {
                        
                        array[i].style.backgroundColor = "yellow"
                        letNum[array[i].innerHTML] = (letNum[array[i].innerHTML] -1)
                    }
                }
            }
        }
    



    }


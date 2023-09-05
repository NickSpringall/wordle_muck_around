async function getWord() {
    let response = await fetch( 'https://random-word-api.herokuapp.com/word?length=5');
    let data = await response.json()
    return data
}

var word = ""
getWord().then(data => {
    console.log(data)
    word = data
})



guess = document.getElementsByClassName("guessOne")
array = []
for (let index = 0; index < guess.length; index++) {
    array.push(guess[index])
}

counter = 0
let input = document.getElementById("userInput").addEventListener("keydown", (event => {
    if (event.key == 'Backspace') {
        array[counter-1].innerHTML = null
        counter = counter -1
    } else if (event.key == 'Enter') {
        event.preventDefault()
        submitGuess(array, word)
    } else {
    // array[counter].style.color = "white"
    array[counter].innerHTML = event.key
    
    counter ++
    }
}))


function submitGuess (array, word) {

    wordstr = word.toString();

    var letNum = {}
    for (let i = 0; i < 5; i++) {
        if (wordstr[i] in letNum) {
            letNum[wordstr[i]] = (letNum[wordstr[i]]) +1
        } else {
            letNum[wordstr[i]] = 1
        }
        console.log(letNum)
    }
    console.log(letNum)


    for (let i = 0; i < 5; i++) {

        let checkIndex = wordstr.indexOf(array[i].innerHTML)

        if (array[i].innerHTML == wordstr[i]) {
            array[i].style.backgroundColor = "green"
            letNum[array[i].innerHTML] = (letNum[array[i].innerHTML] -1)
            continue;

        } else if (checkIndex != -1 && wordstr[checkIndex] != array[checkIndex].innerHTML) {
            array[i].style.backgroundColor = "yellow"
        }
    }
}

window.addEventListener('load', init)

//DOM elements
// const wordInput = document.querySelector('#word-input')
// const currentWord = document.querySelector('#current-word')
// const scoreDisplay = document.querySelector('#score')
// const timeDisplay = document.querySelector('#time')
// const message = document.querySelector('#message')
// const seconds = document.querySelector('#seconds')
// const highscoreDisplay = document.querySelector('#highscore')
let time = 0
let isPlaying
let bestTime = document.querySelector('#best-time')

const displayedLetter = document.querySelector('#displayed-letter')
const timeDisplay = document.querySelector('#timer')
const msDisplay = document.querySelector('#timer2')
const letterInput = document.querySelector('#letter-input')
const message = document.querySelector('#message')

const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
]

//Init game
function init() {
    showLetter(letters)
    letterInput.addEventListener('input', startMatching)
    setInterval(timer, 1000)
    //check game status
}

function startMatching() {
    if (matchLetters()) {
        if (letterInput.value === displayedLetter.innerHTML) {
            message.innerHTML = 'Correct!'
            showLetter(letters)
            letterInput.value = ''
        }
    } else {
        message.innerHTML = 'Try Again!'
        letterInput.value = ''
        time = time + 0.5
    }
}

function matchLetters() {
    if (letterInput.value === displayedLetter.innerHTML) {
        return true
    } else {
        return false
    }
}

function showLetter(letters) {
    const randomIndex = Math.floor(Math.random() * letters.length)
    const randomLetter = letters[randomIndex]
    displayedLetter.innerHTML = randomLetter
}

function timer() {
    time++
    timeDisplay.innerHTML = time
}

function checkStatus() {
    if (!isPlaying) {
        message.innerHTML = 'Game Over'
        clearInterval(isPlaying)
    }
}

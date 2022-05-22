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
let timerStart
let startTimer = false
let totalInputedLetters = 0
let isPlaying
let bestTime = document.querySelector('#best-time')
let todayPlayed = {}
let allTimeGamePlayed = []

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
    let allTortoisePlayed = JSON.parse(
        localStorage.getItem('allTortoisePlayed')
    )
    if (allTortoisePlayed != '' && allTortoisePlayed != null) {
        let sortedInput = allTortoisePlayed
            .slice()
            .sort((a, b) => a.seconds - b.seconds)
        document.getElementById('besttime').innerHTML =
            sortedInput[0]['seconds']
    } else document.getElementById('besttime').innerHTML = 0
    showLetter(letters)
    letterInput.addEventListener('input', startMatching)
    //check game status
}
function checkLowestScore() {
    let allTortoisePlayed = JSON.parse(
        localStorage.getItem('allTortoisePlayed')
    )
    if (allTortoisePlayed != '' && allTortoisePlayed != null) {
        let sortedInput = allTortoisePlayed
            .slice()
            .sort((a, b) => a.seconds - b.seconds)
        if (sortedInput[0]['seconds'] >= timeDisplay.innerHTML) {
            todayPlayed.seconds = timeDisplay.innerHTML
            allTortoisePlayed.push(todayPlayed)
            localStorage.setItem(
                'allTortoisePlayed',
                JSON.stringify(allTortoisePlayed)
            )
            allTortoisePlayed = JSON.parse(
                localStorage.getItem('allTortoisePlayed')
            )
            allTortoisePlayed.sort(function (a, b) {
                return b.seconds - a.seconds
            })
            document.getElementById('besttime').innerHTML =
                sortedInput[0]['seconds']
            displayedLetter.innerHTML = ''
            displayedLetter.innerHTML = 'Success!'
        } else {
            message.innerHTML = ''
            displayedLetter.innerHTML = ''
            displayedLetter.innerHTML = 'Failed!'
        }
        document.getElementById('restart').style.display = 'block'
        document
            .getElementById('restartGame')
            .addEventListener('click', function () {
                location.reload()
            })
    } else {
        todayPlayed.seconds = timeDisplay.innerHTML
        allTimeGamePlayed.push(todayPlayed)
        localStorage.setItem(
            'allTortoisePlayed',
            JSON.stringify(allTimeGamePlayed)
        )
        message.innerHTML = ''
        displayedLetter.innerHTML = ''
        displayedLetter.innerHTML = 'Success'
        allTortoisePlayed = JSON.parse(
            localStorage.getItem('allTortoisePlayed')
        )
        let sortedInput = allTortoisePlayed
            .slice()
            .sort((a, b) => a.seconds - b.seconds)
        document.getElementById('besttime').innerHTML =
            sortedInput[0]['seconds']
        document.getElementById('restart').style.display = 'block'
        document
            .getElementById('restartGame')
            .addEventListener('click', function () {
                location.reload()
            })
    }
}
function startMatching() {
    if (startTimer == false) {
        timeStart = setInterval(timer, 1000)
        startTimer = true
    }
    if (matchLetters()) {
        if (letterInput.value === displayedLetter.innerHTML) {
            if (totalInputedLetters < 20) {
                totalInputedLetters++
                message.innerHTML = 'Correct!'
                showLetter(letters)
                letterInput.value = ''
            }
            if (totalInputedLetters == 20) {
                clearInterval(timeStart)
                letterInput.setAttribute('disabled', 'disabled')
                checkLowestScore()
            }
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

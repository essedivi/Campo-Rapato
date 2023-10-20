/*
FASE DI PREPARAZIONE 
*/

//recuperare dalla paina tutti gli elementi di interesse
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');
const backgroundAudio = document.getElementById("background-audio");
const tastoAudioButton = document.querySelector('.tastoaudio');

let isAudioPlaying = true;


//Preparo delle informazioni utili alla logica di gioco
const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombsLists = [];
let bonusCells;
let score = 0;

//Audio

document.addEventListener("DOMContentLoaded", function () {
    // Seleziona l'elemento audio
    const backgroundAudio = document.getElementById("background-audio");

    // Riproduci la traccia audio
    backgroundAudio.play();
});

//TastoAudio


tastoAudioButton.addEventListener("click", function () {
    if (isAudioPlaying) {
        backgroundAudio.pause();
        isAudioPlaying = false;
        tastoAudioButton.textContent = "🎶▶️";
    } else {
        backgroundAudio.play();
        isAudioPlaying = true;
        tastoAudioButton.textContent = "🎶⏸️";
    }
});

//Generare TOT bombe casuali
while (bombsLists.length < totalBombs) {
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!bombsLists.includes(number)) bombsLists.push(number);
}

function randomCellBonus() {
    const numRandom = Math.floor(Math.random() + totalCells) + 1
    if (!bombsLists.includes(numRandom)) {
        bonusCells = numRandom;
    }
    console.log(bonusCells);
}

console.log(bombsLists)

/*GRIGLIA E LOGICO DI GIOCO*/
let isCellEven = false;
let isRowEven = false;

for (let i = 1; i <= totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    //cell.innerText=i;
    isCellEven = i % 2 === 0
    //se la riga è pari e la cella è pari: casella grigia
    //se la riga è dispari e la cella è dispari: casella grigia
    if (isRowEven && isCellEven) cell.classList.add('cell-dark')
    if (!isRowEven && !isCellEven) cell.classList.add('cell-dark')

    //se sono alla fine della riga...
    if (i % 10 === 0) {
        isRowEven = !isRowEven;
    }

    // #Gestiamo il click della cella
    cell.addEventListener('click', function () {
        if (cell.classList.contains('cell-clicked')) return;
        //Questo codice viene eseguito quando avviene l'evento
        if (i === bonusCells) endGame()
        if (bombsLists.includes(i)) {
            cell.classList.add('cell-turnip');
            endGame();
        } else {
            cell.classList.add('cell-clicked');
            updateScore();
        }
    });

    //lo inserisco nella griglia
    grid.appendChild(cell);
}

/*FUNZIONI*/
//Funzione per aggiornare il punteggio
function updateScore() {
    score++;
    //lo inserisco nel contatore
    scoreCounter.innerText = String(score).padStart(5, 0);

    if (score === maxScore) endGame(true);
}

//Funzione per decretare la fine del gioco
function endGame(win) {
    if (win) {
        endGameScreen.classList.add('win')
        endGameText.innerHTML = 'YOU<br>WIN'
        endGameScreen.classList.remove('hidden')
    }
    endGameScreen.classList.remove('hidden');
    showAllBombs();
}

function showAllBombs() {
    const cell = document.querySelectorAll('.cell');
    for (j = 1; j <= cell.length; j++) {
        if (bombsLists.includes(j)) {
            const cellToReveal = cell[j - 1]
            cellToReveal.classList.add('cell-turnip');
        }
        if (j === bonusCells) {
            const cellToReveal = cell[j - 1]
            cellToReveal.classList.add('cell-bonus');
        }
    }
    console.log(cell);
}

playAgainButton.addEventListener('click', function () {
    location.reload();
})


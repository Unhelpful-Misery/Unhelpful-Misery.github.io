const coin = document.getElementById('coin');
const flipButton = document.getElementById('flipButton');
const currentScore = document.getElementById('currentScore');

let currentSessionScore = 0;
if (localStorage.getItem('coinFlipScore') != null) {
    currentSessionScore = localStorage.getItem('coinFlipScore');
}
else {
    currentSessionScore = 0;
}

currentScore.textContent = "CURRENT STREAK: " + currentSessionScore;

function flipCoin() {
    const willBeHeads = Math.random() < 0.5;

    coin.textContent = "Flipping coin . . ."
    setTimeout(() => {
        if(willBeHeads) {
            coin.textContent = "Heads"
            currentScore.textContent = "CURRENT STREAK: ";
            currentSessionScore++;
            localStorage.setItem('coinFlipScore', currentSessionScore);
            currentScore.textContent += currentSessionScore;
        } else {
            coin.textContent = "Tails"
            currentSessionScore = 0;
            localStorage.setItem('coinFlipScore', currentSessionScore);
            currentScore.textContent = "CURRENT STREAK: " + currentSessionScore;
        }
    }, 1200);
    
}

flipButton.onclick = flipCoin;
coin.onclick=flipCoin;
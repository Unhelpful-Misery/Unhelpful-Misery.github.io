const coin = document.getElementById('coin');
const flipButton = document.getElementById('flipButton');
const result = document.getElementById('result');
const currentScore = document.getElementById('currentScore');
const goldrays = document.getElementById('goldenRays');

let currentSessionScore = 0;
if (localStorage.getItem('coinFlipScore') != null) {
    currentSessionScore = localStorage.getItem('coinFlipScore');
}
else {
    currentSessionScore = 0;
}
let isFlipping = false;
let currentRotation = 0;
var coinFlipSFX = new Audio('/assets/code-files/coin-flip/coinFlip1.mp3');

currentScore.textContent = currentSessionScore + ""

if (currentSessionScore < 10) {
    goldrays.style.opacity = 0.03 * currentSessionScore;
}
else {
    goldrays.style.opacity = 0.3;
}

function flipCoin() {
    if (isFlipping) { return }

    coinFlipSFX.currentTime = 0;
    coinFlipSFX.play();

    isFlipping = true;
    flipButton.disabled = true;
    const willBeHeads = Math.random() < 0.5;
    
    currentRotation += 1440;

    if (willBeHeads) {
        if (currentRotation % 360 !== 0) {
            currentRotation += 180;
        }
    } else {
        if (currentRotation % 360 === 0) {
            currentRotation += 180; 
        }
    }

    coin.style.transform = `rotateY(${currentRotation}deg)`;

    setTimeout(() => {
        result.classList.remove("fadeTransition");
        if(willBeHeads) {
            result.textContent = "🎉 Heads x";
            currentSessionScore++;
            localStorage.setItem('coinFlipScore', currentSessionScore);
            result.textContent += currentSessionScore + " 🎉";
            if (currentSessionScore < 16) {
                result.style.fontSize = 0.8 + currentSessionScore * 0.2 + "rem"; 
            }
            else {
                result.style.fontSize = 4 + "rem";
            }
            currentScore.textContent = currentSessionScore + ""
            if (currentSessionScore < 10) {
                goldrays.style.opacity = 0.03 * currentSessionScore;
            }
            else {
                goldrays.style.opacity = 0.3;
            }
            if (currentSessionScore < 21) {
                var note = new Audio('/assets/code-files/coin-flip/Note' + currentSessionScore + '.mp3');
                note.play();
            }
            else {
                var note = new Audio('/assets/code-files/coin-flip/Note20.mp3');
                note.play();
            }
        } else {
            result.textContent = "❌ Tails ❌";
            currentSessionScore = 0;
            localStorage.setItem('coinFlipScore', currentSessionScore);
            goldrays.style.opacity = 0;
            result.style.fontSize = 1 + "rem"; 
            currentScore.textContent = currentSessionScore + "";
        }
        void result.offsetWidth;
        result.classList.add("fadeTransition");
        isFlipping = false;
        flipButton.disabled = false;
    }, 1200);
}

flipButton.onclick = flipCoin;
coin.onclick=flipCoin;
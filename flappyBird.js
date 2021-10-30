document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector(".bird");
    const gameDisplay = document.querySelector(".game");
    const wingAudio = document.getElementById("wing-audio");
    const dieAudio = document.getElementById("die-audio");
    const hitAudio = document.getElementById("hit-audio");
    const pointAudio = document.getElementById("point-audio");

    let birdBottom = 100;
    let birdLeft = 220;
    let gravity = 0.18;
    let gravitySpeed = 0;
    let isGameRunning = true;
    let gap = Math.floor(Math.random() * (450 - 405)) + 405;
    let score = 0;
    
    document.addEventListener("keypress", startGame);

    function startGame() {
        isGameRunning = true;
        gravitySpeed += gravity;
        birdBottom -= gravitySpeed;
        bird.style.bottom = birdBottom + "px";
        bird.style.left = birdLeft + "px";
    }

    let timerId = setInterval( startGame, 15);
 
    function control(e) {
        if (e.keyCode === 32) {
            jump();
        }
    }

    function jump() {
        birdBottom += 70;    
        wingAudio.play();
        console.log(birdBottom);
        gravitySpeed = 0;   

    }
    document.addEventListener("keypress", control)

    function generatePipe() {
        const topPipe = document.createElement("div");
        const bottomPipe = document.createElement("div");
        
        let height = Math.random() * 150
        let pipeLeft = 500;
        let pipeBottom = height;

        bottomPipe.style.left = pipeLeft + "px";
        bottomPipe.style.bottom = pipeBottom + "px";
        topPipe.style.left = pipeLeft + "px";
        topPipe.style.bottom = pipeBottom + gap + "px";

        gameDisplay.appendChild(topPipe);
        gameDisplay.appendChild(bottomPipe);

        if (isGameRunning) {
            bottomPipe.classList.add("bottom-pipe");
            topPipe.classList.add("top-pipe");
        }

        function moveGame() {
            if (isGameRunning) {
                pipeLeft -= 3;
                topPipe.style.left = pipeLeft + "px";
                bottomPipe.style.left = pipeLeft + "px";
    
                if (pipeLeft === -60) {
                    clearInterval(timerId);
                    gameDisplay.removeChild(topPipe);
                    gameDisplay.removeChild(bottomPipe);
                }
    
                if (pipeLeft > 170 && pipeLeft < 262 && birdLeft === 220 && (birdBottom < pipeBottom + 150 || (birdBottom > pipeBottom + gap - 185)) || birdBottom < 0 || birdBottom > 535) {
                    gravity = 0;
                    gravitySpeed = 0;
                    console.log(gravity + " " + gravitySpeed);
                    hitAudio.play();
                    setTimeout(function() {
                        gravity = 1.4;
                        gravitySpeed = 15;
                        dieAudio.play();
                    }, 350);
                    setTimeout(function() {
                        gameOver();
                    }, 800);
                    clearInterval(timerId);
                }
            
                if (pipeLeft === 200){
                    score++;
                    pointAudio.play();
                    console.log("score: " + score);   
                    document.getElementById("currentScore").innerHTML = score;
                }
            }  
        } 
        let timerId = setInterval(moveGame, 15);
        setTimeout(generatePipe, Math.floor(Math.random() * (2100 - 1800)) + 1800);

    }

    generatePipe();

    function reloadPage(e){
        if (e.keyCode === 32) {
            location.reload();
        }
    }

    function gameOver() {
        clearInterval(timerId);
        isGameRunning = false;
        document.removeEventListener("keydown", control);
        console.log("game over")
        console.log(isGameRunning)
        document.addEventListener("keypress", reloadPage);

        reloadPage();
    }   

    console.log(isGameRunning)
});
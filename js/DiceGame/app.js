/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// var game = {
//     gameState : 'finished', // active or finished
//     player1 : {
//         roundScore : 0,
//         globalScore : 0
//     },
//     player2 : {
//         roundScore : 0,
//         globalScore : 0
//     },
//     lastWinner : '',
//     player1turn : true,
//     rollDice : function() {
//         if(this.isGameActive()) {
//             var player1 = this.player1;
//             var player2 = this.player2;
//             var roll = Math.floor(Math.random() * 6) + 1;
//             var dice = document.getElementsByClassName('dice');
//             if(this.player1turn) player1.roundScore += roll;
//             else player2.roundScore += roll;
//             switch(roll) {
//                 case 1:
//                     if(this.player1turn) {
//                         player1.roundScore = 0;
//                     } else {
//                         player2.roundScore = 0;
//                     }
//                     dice[0].setAttribute('src', 'dice-1.png');
//                     this.switchTurn();
//                     break;
//                 case 2:
//                     dice[0].setAttribute('src', 'dice-2.png');
//                     break;
//                 case 3:
//                     dice[0].setAttribute('src', 'dice-3.png');
//                     break;
//                 case 4:
//                     dice[0].setAttribute('src', 'dice-4.png');
//                     break;
//                 case 5:
//                     dice[0].setAttribute('src', 'dice-5.png');
//                     break;
//                 case 6:
//                     dice[0].setAttribute('src', 'dice-6.png');
//                     break;
//
//             }
//             this.updateDOM();
//             return;
//        } alert("Start a new game first!");
//     },
//     resetGame : function() {
//         this.gameState = 'active';
//         var player1DOM = document.getElementsByClassName('player-0-panel')[0];
//         var player2DOM = document.getElementsByClassName('player-1-panel')[0];
//         player1DOM.classList.remove('winner');
//         player2DOM.classList.remove('winner');
//         var player1 = this.player1;
//         var player2 = this.player2;
//         player1.roundScore = player2. roundScore = 0;
//         player1.globalScore = player2.globalScore = 0;
//         this.updateDOM();
//     },
//     hold : function() {
//         if(this.isGameActive) {
//             if(this.player1turn) {
//                 this.player1.globalScore += this.player1.roundScore;
//                 this.player1.roundScore = 0;
//                 this.switchTurn();
//             } else {
//                 this.player2.globalScore += this.player2.roundScore;
//                 this.player2.roundScore = 0;
//                 this.switchTurn();
//             }
//             this.checkWinner();
//             this.updateDOM();
//         } else {
//             alert("Start a new game first!");
//         }
//     },
//     checkWinner : function() {
//         if(this.player1.globalScore >= 100) {
//             var winnerDOM = document.getElementsByClassName('player-0-panel')[0];
//             winnerDOM.classList.add('winner');
//             this.lastWinner = 'Player 1';
//             alert('The winner is Player 1!!! Player 2 will start next game first.');
//             this.gameState = 'finished';
//             return;
//         } 
//         if(this.player2.globalScore >= 100) {
//             var winnerDOM = document.getElementsByClassName('player-1-panel')[0];
//             winnerDOM.classList.add('winner');
//             this.lastWinner = 'Player 2';
//             alert('The winner is Player 2!!! Player 1 will start next game first.');
//             this.gameState = 'finished';
//         }
//     },
//     isGameActive: function() {
//         return(this.gameState === 'active');
//     },
//     updateDOM: function() {
//         var player1Score = document.getElementById('score-0');
//         var player2Score = document.getElementById('score-1');
//         player1Score.innerHTML = this.player1.globalScore;
//         player2Score.innerHTML = this.player2.globalScore;

//         var player1RoundScore = document.getElementById('current-0');
//         var player2RoundScore = document.getElementById('current-1');
//         player1RoundScore.innerHTML = this.player1.roundScore;
//         player2RoundScore.innerHTML = this.player2.roundScore;
//     },
//     switchTurn: function() {
//         if(this.player1turn) {
//             this.player1turn = false;
//             var activeDOM = document.getElementsByClassName('player-1-panel')[0];
//             activeDOM.classList.add('active');
//             var inactiveDOM = document.getElementsByClassName('player-0-panel')[0];
//             inactiveDOM.classList.remove('active');
//         } else {
//             this.player1turn = true;
//             var activeDOM = document.getElementsByClassName('player-0-panel')[0];
//             activeDOM.classList.add('active');
//             var inactiveDOM = document.getElementsByClassName('player-1-panel')[0];
//             inactiveDOM.classList.remove('active');
//         }
//     }
// }

// document.getElementsByClassName('btn-new')[0].onclick = function() {
//     game.resetGame();
// }

// document.getElementsByClassName('btn-roll')[0].onclick = function() {
//     game.rollDice();
// }

// document.getElementsByClassName('btn-hold')[0].onclick = function() {
//     game.hold();
// }


/******************************************************************************** */
//Solution/iteration 2 : tidier
// + add some features to the game
/******************************************************************************** */

var scores;
var activePlayer; 
var roundScore;
var gameActive = false;
var maxScore = 100;

startNewGame();

function startNewGame() {
    gameActive = true;
    scores = [0,0];
    activePlayer = roundScore = previousRoll = 0; //activePlayer0 is actually Player1
    hideDice();
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    updateScore();
}

function hideDice() {
    var dice = document.getElementsByClassName('dice');
    for(var i =0; i < dice.length; i++) {
        dice[i].style.display = 'none';
    }
}

function showDice() {
    var dice = document.getElementsByClassName('dice');
    for(var i =0; i < dice.length; i++) {
        dice[i].style.display = 'block';
    }
}

function rollDice() {
    if(gameActive) {
        showDice();
        var rollResult = Math.floor(Math.random()*6) + 1;
        var rollResult2 = Math.floor(Math.random()*6) + 1;
        document.getElementsByClassName('die-1')[0].src='dice-' + rollResult + '.png';
        document.getElementsByClassName('die-2')[0].src='dice-' + rollResult2 + '.png';        
        if(rollResult === 6 && previousRoll === 6) {
            scores[activePlayer] = 0;
            switchTurn();
            return;
        } 
        if(rollResult === 1 || rollResult2 === 1) {
            if(rollResult === 1 && rollResult2 === 1) {
                switchTurn();
                return;
            }   
            roundScore = 0;
            updateScore();
            return;
        } 
        roundScore += rollResult + rollResult2;
        updateScore();
    } else {
        alert("Start a new game!");
    }
};

function switchTurn() {
    hideDice();
    roundScore = 0;
    updateScore();
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}

function updateScore() {
    document.querySelector('#score-0').textContent = scores[0];
    document.querySelector('#score-1').textContent = scores[1];
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
}

function hold() {
    if(gameActive) {
        var newScore = scores[activePlayer] += roundScore;
        roundScore = 0;
        updateScore();
        if(scores[activePlayer] < maxScore) {
            hideDice();
            switchTurn();
        } 
        else 
        {
            finishGame();
        }
    } else {
        alert("Start a new game first!");
    }
}

function finishGame() {
    gameActive = false;
    hideDice();
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    var winnerPlayerPanelDOM = document.querySelector('.player-' + activePlayer + '-panel');
    winnerPlayerPanelDOM.classList.remove('active');
    winnerPlayerPanelDOM.classList.add('winner');
}

document.getElementsByClassName('btn-new')[0].addEventListener('click', startNewGame);

document.querySelector('.btn-roll').addEventListener('click', rollDice);

//get element by... is a bit faster than query selector.
document.getElementsByClassName('btn-hold')[0].addEventListener('click', hold);

document.querySelector('.btn-set-score').addEventListener('click', function() {
    var scoreInput = document.querySelector('#score-input');
    var newScoreValue = scoreInput.value;
    if(!isNaN(newScoreValue)) {
        maxScore = newScoreValue;
        document.querySelector('#current-win-score').innerHTML = "CURRENT WIN SCORE: <br><strong>" + maxScore + '</strong>';
    } else {
        alert("Type in a valid positive number");
    }
});







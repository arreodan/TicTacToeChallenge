const gameContainer = document.getElementById("game-container");

let clickCount = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

gameContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('game-box') && !event.target.classList.contains('bg-success') && !event.target.classList.contains('bg-danger')) {
        clickCount++;
        
        if (clickCount % 2 === 0) {
            console.log("turn " + clickCount + " red");
            event.target.classList = "bg-danger p-5 m-1 game-box";
        } else {
            console.log("turn " + clickCount + " green");
            event.target.classList = "bg-success p-5 m-1 game-box";
        }

        if (checkWin()) {
            setTimeout(() => {
                if (clickCount % 2 === 0) {
                    winner = "Red Wins!";
                } else {
                    winner = "Green Wins!";
                }
                Swal.fire(
                    {
                        backdrop: false,
                        title: winner,
                        confirmButtonColor: "#3E92CC"
                    }).then(function(confirmed){
                        if(confirmed){
                            loadPlayArea()
                        }
                    })
            }, 25);
        } else if (clickCount === 9) {
            setTimeout(() => {
                Swal.fire(
                    {
                        backdrop: false,
                        title: 'Draw!',
                        text: "No one wins",
                        confirmButtonColor: "#3E92CC"
                    },
                ).then(function(confirmed){
                    if(confirmed){
                        loadPlayArea()
                    }
                })
            }, 25);
        }
    }
});

function checkWin() {
    let boxes = document.querySelectorAll('.game-box');
    for(let combination of winningCombinations){
        const [a, b, c] = combination;

        if (boxes[a].classList.contains('bg-success') && boxes[b].classList.contains('bg-success') && boxes[c].classList.contains('bg-success')) {
            return true;
        } else if (boxes[a].classList.contains('bg-danger') && boxes[b].classList.contains('bg-danger') && boxes[c].classList.contains('bg-danger')) {
            return true;
        }
        
    }

    return false;
}

function loadPlayArea() {
    console.log("Resetting game...");
    clickCount = 0;

    gameContainer.innerHTML = "";
    for (let i = 0; i <= 8; i++) {
        gameContainer.innerHTML += `
            <div class="col-4">
                <div class="bg-dark-subtle p-5 m-1 game-box"> </div>
            </div>
        `;
    }
}

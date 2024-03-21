const table = document.querySelector(".table");
const counters = document.querySelectorAll(".count h2");
const playAgain = document.getElementById("playAgain");
let player = "x";
let win = false;
let eventCondition = true;

const tableCombination = Array(9).fill(null);
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const addCount = () => {
    counters.forEach((counter) => {
        if (counter.textContent.toLowerCase() === player) {
            counter.nextElementSibling.textContent =
                +counter.nextElementSibling.textContent + 1;
        }
    });
};
const clickHendler = (e) => {
    if (!e.target.textContent && player === "x") {
        e.target.textContent = player;
        e.target.classList.add("colorX");
        tableCombination[parseInt(e.target.dataset.id)] = player;
        checkWinner(winningCombination, tableCombination);
        player = "o";
        if (player === "o" && !win) {
            let x = setTimeout(() => {
                ai(tableCombination);
                checkWinner(winningCombination, tableCombination);
                player = "x";
            }, 300);
            if (!tableCombination.includes(null)) {
                clearTimeout(x);
            }
        }
    }
};

const checkWinner = (wComb, tComb) => {
    wComb.forEach((comb, ind) => {
        if (
            tComb[comb[0]] === tComb[comb[1]] &&
            tComb[comb[1]] === tComb[comb[2]] &&
            tComb[comb[0]]
        ) {
            win = true;
            eventCondition = false;
            table.removeEventListener("click", clickHendler);
            let ps = table.querySelectorAll("p");
            let first = ps[comb[0]];
            let winner = document.createElement("div");
            winner.classList.add("winnerLine");
            if (ind < 3) {
                winner.style.height = "10px";
                winner.style.transform = `translate(${first.offsetLeft + 42.5}px, ${
                    first.offsetTop + 67.5
                }px)`;
                setTimeout(() => {
                    winner.style.width = "80%";
                }, 400);
            } else if (ind >= 3 && ind <= 5) {
                winner.style.width = "10px";
                winner.style.transform = `translate(${first.offsetLeft + 70}px,
                    ${first.clientTop + 37}px)
                    `;
                setTimeout(() => {
                    winner.style.height = "83%";
                }, 400);
            } else if (ind === 6) {
                winner.style.width = "10px";
                winner.style.transform = `rotate(-45deg)`;
                winner.style.top = "35px";
                winner.style.left = "30px";
                setTimeout(() => {
                    winner.style.height = "120%";
                }, 400);
            } else if (ind === 7) {
                winner.style.width = "10px";
                winner.style.transform = `rotate(45deg)`;
                winner.style.top = "35px";
                winner.style.right = "30px";
                setTimeout(() => {
                    winner.style.height = "120%";
                }, 400);
            }

            table.appendChild(winner);
            addCount();
        } else if (wComb.every((e) => e)) {
            eventCondition = false;
        }
    });
};

function ai(tableDataCord) {
    let aiTurn = parseInt(Math.random() * 9);
    let allP = table.querySelectorAll("p");
    if (!tableDataCord.includes(null)) {
        return false;
    }
    while (tableDataCord[aiTurn] !== null) {
        aiTurn = parseInt(Math.random() * 9);
    }

    if (tableDataCord[4] == null) {
        tableDataCord[4] = "o";
        allP[4].textContent = "o";
        allP[4].classList.add("o");
        return;
    }
    for (let i = 0; i < winningCombination.length; i++) {
        let d0 = tableDataCord[winningCombination[i][0]];
        let d1 = tableDataCord[winningCombination[i][1]];
        let d2 = tableDataCord[winningCombination[i][2]];
        if (
            (d0 == "o" && d1 == "o" && d2 == null) ||
            (d1 == "o" && d2 == "o" && d0 == null) ||
            (d2 == "o" && d0 == "o" && d1 == null)
        ) {
            let data = [d0, d1, d2];
            if (data.filter((e) => e === "o").length == 2) {
                tableDataCord[winningCombination[i][data.indexOf(null)]] = "o";
                allP[winningCombination[i][data.indexOf(null)]].textContent = "o";
                allP[winningCombination[i][data.indexOf(null)]].classList.add("o");

                return;
            }
        }
    }

    for (let i = 0; i < winningCombination.length; i++) {
        let d0 = tableDataCord[winningCombination[i][0]];
        let d1 = tableDataCord[winningCombination[i][1]];
        let d2 = tableDataCord[winningCombination[i][2]];

        console.log(d0, d1, d2);

        if (
            (d0 == d1 && d1 != null && d2 === null) ||
            (d1 == d2 && d2 != null && d0 === null) ||
            (d2 == d0 && d2 != null && d1 === null)
        ) {
            let data = [d0, d1, d2];

            tableDataCord[winningCombination[i][data.indexOf(null)]] = "o";
            allP[winningCombination[i][data.indexOf(null)]].textContent = "o";
            allP[winningCombination[i][data.indexOf(null)]].classList.add("o");
            return;
        }
    }

    tableDataCord[aiTurn] = player;
    allP[aiTurn].textContent = player;
    allP[aiTurn].classList.add("o");
}
table.addEventListener("click", clickHendler);
playAgain.addEventListener("click", () => {
    if (!eventCondition) {
        table
            .querySelectorAll("p")
            .forEach((el) => ((el.textContent = ""), (el.className = "")));
        table.querySelector(".winnerLine")?.remove();
        table.addEventListener("click", clickHendler);
        tableCombination.fill(null);
        player = "x";
        win = false;
    }
});

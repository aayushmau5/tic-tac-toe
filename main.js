const grid = document.querySelector(".container");
const winner = document.querySelector(".winner");
const reset = document.querySelector(".reset");
const move = document.querySelector(".move");

const Gameboard = (function () {
  let sign = "X";
  let isWon = false;
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  const changeBoard = (index, value) => {
    gameboard[index] = value;
  };

  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const win = () => {
    winningCombo.forEach((array) => {
      if (
        gameboard[array[0]] !== "" &&
        gameboard[array[1]] !== "" &&
        gameboard[array[2]] !== "" &&
        gameboard[array[0]] === gameboard[array[1]] &&
        gameboard[array[1]] === gameboard[array[2]]
      ) {
        isWon = true;
        winner.textContent = `Player ${gameboard[array[1]]} wins`;
        grid.removeEventListener("click", changeSign);
        return;
      }
    });
    if (!gameboard.includes("") && !isWon) {
      winner.textContent = "Draw";
    }
  };
  const changeSign = (e) => {
    if (e.target.textContent === "") {
      const { index, target } = getElement(e);
      target.textContent = sign;
      changeBoard(index, sign);
      win();
      sign = sign === "X" ? "O" : "X";
      move.textContent = `Player ${sign} Move`;
    }
  };

  const getElement = (e) => {
    let target = e.target;
    let index = +e.target.getAttribute("data-index");
    console.log("getElement called");
    return { index, target };
  };
  const resetGame = () => {
    const place = document.querySelectorAll(".place");
    isWon = false;
    place.forEach((grid, index) => {
      grid.textContent = "";
      gameboard[index] = "";
    });
    winner.textContent = "";
    grid.addEventListener("click", changeSign);
    sign = "X";
    move.textContent = `Player ${sign} Move`;
  };

  return { changeSign, resetGame };
})();

grid.addEventListener("click", Gameboard.changeSign);
reset.addEventListener("click", Gameboard.resetGame);

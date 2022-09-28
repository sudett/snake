import Game from "./game.js";

const gameTilesCount = 5;

const game = new Game(gameTilesCount);
// console.log(game)

document.querySelector('.btn--container').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn--down')) game.moveDown();
  if (e.target.classList.contains('btn--up')) game.moveUp();
  if (e.target.classList.contains('btn--left')) game.moveLeft();
  if (e.target.classList.contains('btn--right')) game.moveRight();
});

document.querySelector('.btn--reset').addEventListener('click', () => {
  game.resetGame(gameTilesCount);
})
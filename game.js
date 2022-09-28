class Game {
  #parentEl = document.querySelector('.game');
  #reset = document.querySelector('.reset');
  #scoreEl = document.querySelector('.score');
  apple;
  score = 0;
  snake = [];
  gameField;

  constructor(n) {
    this.#parentEl.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    this.#scoreEl.textContent = this.score;

    this.gameField = new Array(n).fill(0).map(() => new Array(n).fill(0));
    this.resetGameData(n);

    // make game field
    for (let i = 0; i < this.gameField.length; i++) {
      for (let j = 0; j < this.gameField[i].length; j++) {
        const span = document.createElement('span');
        span.classList.add('tile');
        span.dataset.id = `${i}${j}`;      
        this.#parentEl.appendChild(span);
      }
    }

    this.resetGameUI();
  }

  resetGameData(n) {
    this.snake.splice(0);
    const center = Math.floor(this.gameField.length / 2);
    this.snake.push(`${center}${center}`);

    this.makeApple(n);  
  }

  resetGameUI() {
    document.querySelector(`[data-id='${this.snake[0]}']`).classList.add('snake');
    document.querySelector(`[data-id='${this.apple}']`).classList.add('apple');
  }

  resetGame(n) {
    this.snake.forEach(el => document.querySelector(`[data-id='${el}']`).classList.remove('snake'));
    document.querySelector(`[data-id='${this.apple}']`).classList.remove('apple');

    this.resetGameData(n);
    this.resetGameUI();
    this.#reset.classList.remove('show');
  }

  random(n) {
    return Math.floor(Math.random() * n);
  }

  makeApple(n) {
    do {
      this.apple = `${this.random(n)}${this.random(n)}`;
    } while(this.snake.includes(this.apple))
  }

  moveSnake(next, nextTile) {
    // show error
    if (next >= this.gameField.length || next < 0 || this.snake.includes(nextTile)) {
      if (this.snake.length > this.score) this.score = this.snake.length;
      this.#scoreEl.textContent = this.score;
      this.#reset.classList.add('show');
      return;
    }

    // move snake and eat apple
    if (nextTile === this.apple) {
      this.snake.unshift(this.apple);
      document.querySelector(`[data-id='${this.apple}']`).classList.remove('apple');
      document.querySelector(`[data-id='${this.apple}']`).classList.add('snake');
      this.makeApple(this.gameField.length);
      document.querySelector(`[data-id='${this.apple}']`).classList.add('apple');
      return;
    }

    // just move snake
    const deleted = this.snake.pop();
    document.querySelector(`[data-id='${deleted}']`).classList.remove('snake');
    this.snake.unshift(nextTile);
    document.querySelector(`[data-id='${nextTile}']`).classList.add('snake');
  }

  moveDown() {
    const next = +this.snake[0][0] + 1;
    const nextTile = `${next}${this.snake[0][1]}`;

    this.moveSnake(next, nextTile);
  }

  moveUp() {
    const next = +this.snake[0][0] - 1;
    const nextTile = `${next}${this.snake[0][1]}`;

    this.moveSnake(next, nextTile);
  }

  moveRight() {
    const next = +this.snake[0][1] + 1;
    const nextTile = `${this.snake[0][0]}${next}`;

    this.moveSnake(next, nextTile);
  }

  moveLeft() {
    const next = +this.snake[0][1] - 1;
    const nextTile = `${this.snake[0][0]}${next}`;

    this.moveSnake(next, nextTile);
  }
 
}

export default Game;
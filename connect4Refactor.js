/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
// document.addEventListener('DOMContentLoaded', function() {
//   const colorPickerP1 = document.getElementById('color-picker-p1');
//   const colorPickerP2 = document.getElementById('color-picker-p2');
//   const p1 = document.querySelector('.piece.p1');
//   const p2 = document.querySelector('.piece.p2');

//   colorPickerP1.addEventListener('input', function() {
//     const color = colorPickerP1.value;
//     p1.style.backgroundColor = color;
//   });
//   colorPickerP2.addEventListener('input', function() {
//     const color = colorPickerP2.value;
//     p2.style.backgroundColor = color;
//   });
// });




class Game {

    constructor(height = 6, width = 7){
      this.height = height;
      this.width = width;
      this.p1
      this.p2
      this.currPlayer = 1
      this.board = []
      this.btn = document.getElementById('btn')
      this.btn.addEventListener('click', this.newGameClick.bind(this))
      this.colorPickerP1 = document.getElementById('color-picker-p1').value;
      this.colorPickerP2 = document.getElementById('color-picker-p2').value;
      
      
    };

    makeBoard(){

        for (let y = 0; y < this.height; y++) {
          this.board.push(Array.from({ length: this.width }));
        }
    }
    

    makeHtmlBoard() {
        const board = document.getElementById('board');

        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        top.addEventListener('click', this.handleClick.bind(this));
      
        for (let x = 0; x < this.width; x++) {
          const headCell = document.createElement('td');
          headCell.setAttribute('id', x);
          top.append(headCell);
        }
      
        board.append(top);
      
        // make main part of board
        for (let y = 0; y < this.height; y++) {
          const row = document.createElement('tr');
      
          for (let x = 0; x < this.width; x++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            row.append(cell);
          }
      
          board.append(row);
        }
    }

    findSpotForCol(x) {
        for (let y = this.height - 1; y >= 0; y--) {
          if (!this.board[y][x]) {
            return y;
          }
        }
        return null;
      }

      placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.classList.add(`p${this.currPlayer}`);
        piece.style.top = -50 * (y + 2);

        const colorPickerP1 = document.getElementById('color-picker-p1');
        const colorPickerP2 = document.getElementById('color-picker-p2');
        piece.style.backgroundColor = this.currPlayer === 1 ? colorPickerP1.value : colorPickerP2.value;
      
        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
      }

      endGame(msg) {
        alert(msg);
      }
      
      handleClick(evt) {
        // let currPlayer = 1; // active player: 1 or 2

        // get x from ID of clicked cell
        const x = +evt.target.id;
      
        // get next spot in column (if none, ignore click)
        const y = this.findSpotForCol(x);
        if (y === null) {
          return;
        }
      
        // place piece in board and add to HTML table
        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);
        
        // check for win
        if (this.checkForWin()) {
          return this.endGame(`Player ${this.currPlayer} won!`);
        }
        
        // check for tie
        if (this.board.every(row => row.every(cell => cell))) {
          return this.endGame('Tie!');
        }
          
        // switch players
        this.currPlayer = this.currPlayer === 1 ? 2 : 1;
      }

      checkForWin() {
        //scoping & this
        const that = this
        function _win(cells) {
          // Check four cells to see if they're all color of current player
          //  - cells: list of four (y, x) cells
          //  - returns true if all are legal coordinates & all match currPlayer
      
          return cells.every(
            ([y, x]) =>
              y >= 0 &&
              y < that.height &&
              x >= 0 &&
              x < that.width &&
              that.board[y][x] === that.currPlayer
          );
        }
      
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            // get "check list" of 4 cells (starting here) for each of the different
            // ways to win
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      
            // find winner (only checking each win-possibility as needed)
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
              return true;
            }
          }
        }
      }
      resetBoard(){
        const trs = document.querySelectorAll('tr')
        // const divs = document.getElementsByClassName('piece')
        // const tds = document.querySelectorAll('td')
        trs.forEach((tr)=>{
          tr.remove()
        })

        document.querySelectorAll('.piece').forEach((div) => {
          div.remove();
        });

        this.board = []
        

      }

      newGameClick() {
        this.resetBoard()
        this.makeBoard()
        this.makeHtmlBoard()    
        }
      
    
}

new Game(6, 7);   // assuming constructor takes height, width


  
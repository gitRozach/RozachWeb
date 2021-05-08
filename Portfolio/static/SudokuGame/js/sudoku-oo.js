class SudokuBoard {
    constructor(board = null) {
        this.board = board;
        this.boardLength = 9;
        this.boxLength = 3;
        this.inputValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    solve() {
        if (this.solved(this.board)) {
            return this.board;
        }
        var validBoards = this.keepOnlyValid(this.collectNextPosibilities(this.board));
        return this.searchForSolution(validBoards);
    }
    
    searchForSolution(boards) {
        if (boards.length < 1) {
            return false;
        }
    
        var first = new SudokuBoard(boards.shift());
        const tryPath = first.solve();
    
        if (tryPath != false) {
            return tryPath
        }
        return this.searchForSolution(boards);
    }
    
    solved(board) {
        for (var y = 0; y < this.boardLength; ++y) {
            for (var x = 0; x < this.boardLength; ++x) {
                if (board[y][x] === null) {
                    return false;
                }
            }
        }
        return true;
    }
    
    collectNextPosibilities(board) {
        var results = [];
        const firstEmpty = this.findEmptyCell(board);
    
        if (firstEmpty != undefined) {
            const x = firstEmpty[0];
            const y = firstEmpty[1];
    
            for (var i = 1; i <= 9; ++i) {
                var newBoard = [...board];
                var row = [...newBoard[y]];
                row[x] = i;
                newBoard[y] = row;
                results.push(newBoard);
            }
        }
        return results;
    }
    
    findEmptyCell(board) {
        for (var y = 0; y < this.boardLength; ++y) {
            for (var x = 0; x < this.boardLength; ++x) {
                if (board[y][x] == null) {
                    return [x, y];
                }
            }
        }
    }
    
    keepOnlyValid(boards) {
        return boards.filter((b) => this.isBoardValid(b));
    }
    
    isBoardValid(board) {
        return this.checkRows(board) && this.checkColumns(board) && this.checkBoxes(board);
    }
    
    checkRows(board) {
        for (var y = 0; y < this.boardLength; ++y) {
            var collectedInputs = [];
            for (var x = 0; x < this.boardLength; ++x) {
                var currentItem = board[y][x];
                if (collectedInputs.includes(currentItem)) {
                    return false;
                }
                if (currentItem != null) {
                    collectedInputs.push(currentItem);
                }
            }
        }
        return true;
    }
    
    checkColumns(board) {
        for (var x = 0; x < this.boardLength; ++x) {
            var collectedInputs = [];
            for (var y = 0; y < this.boardLength; ++y) {
                var currentItem = board[y][x];
                if (collectedInputs.includes(currentItem)) {
                    return false;
                }
                if (currentItem != null) {
                    collectedInputs.push(currentItem);
                }
            }
        }
        return true;
    }
    
    checkBoxes(board) {
        const boxCoordinates = [
            [0, 0], [0, 1], [0, 2],
            [1, 0], [1, 1], [1, 2],
            [2, 0], [2, 1], [2, 2]
        ];
    
        for (var y = 0; y < this.boardLength; y += this.boxLength) {
            for (var x = 0; x < this.boardLength; x += this.boxLength) {
                var collectedInputs = [];
                for (var i = 0; i < this.boardLength; ++i) {
                    var currentCoords = [boxCoordinates[i][0] + y, boxCoordinates[i][1] + x];
                    if (collectedInputs.includes(board[currentCoords])) {
                        return false;
                    }
                    if (board[currentCoords] != null) {
                        collectedInputs.push(board[currentCoords]);
                    }
                }
            }
        }
        return true;
    }
}

/**
 *                          GUI
 */

class SudokuGUI {
    constructor(sudoku, sudokuLength = 9, sudokuValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
        this.sudoku = sudoku;
        this.sudokuLength = sudokuLength;
        this.sudokuValues = sudokuValues;
        this.sudokuSolutions = sudoku.solve();
        this.selectedCell = null;
    }

    sleep_async(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    updateCell(x, y, value) {
        var cellIndex = (y - 1) * this.sudokuLength + x;
        var cell = document.getElementById(`cell-${cellIndex}`);
        cell.innerText = value;
    }

    createSudokuCell(id, text) {
        var span = document.createElement("span");    
        var li = document.createElement("li");
        li.id = id;
        li.innerText = text;
        li.appendChild(span);
        return li;
    }

    drawGrid() {
        gridList = document.getElementById("grid-list");
        for (var i = 0; i < this.sudokuLength * this.sudokuLength; ++i) {
            var x = i % this.sudokuLength;
            var y = Math.floor(i / this.sudokuLength);
            var value = sudoku.board[y][x];
            if (value == null) value = "";
            gridList.appendChild(createSudokuCell(`cell-${i + 1}`, `${value}`));
        }
    }

    async solveGrid() {
        for (var i = 0; i < this.sudokuLength * this.sudokuLength; ++i) {
            var x = i % this.sudokuLength + 1;
            var y = Math.floor(i / this.sudokuLength) + 1;
            updateCell(x, y, sudokuSolution[y - 1][x - 1]);
            await sleep_async(15);
        }
    }

    keyPressed(event) {
        if (selectedCell != null && this.sudokuValues.includes(event.key.toString())) {
            selectedCell.innerText = event.key.toString();
            selectedCell = null;
        }
    }

    mouseClicked(event) {
        console.log('HEY GUYS!');
        var targetIdStr = event.target.id.toString();

        if (targetIdStr.startsWith('cell-')) {
            selectedCell = event.target;
            return;
        }
        if (targetIdStr == 'solve-button') {
            solveGrid();
            return;
        }
    }
}

function main() {
    const b = null;

    const BOARD_LENGTH = 9;
    const BOARD_VALUES = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    const BOARD_1 = [
        [b, b, b, 2, 6, b, 7, b, 1],
        [6, 8, b, b, 7, b, b, 9, b],
        [1, 9, b, b, b, 4, 5, b, b],
        [8, 2, b, 1, b, b, b, 4, b],
        [b, b, 4, 6, b, 2, 9, b, b],
        [b, 5, b, b, b, 3, b, 2, 8],
        [b, b, 9, 3, b, b, b, 7, 4],
        [b, 4, b, b, 5, b, b, 3, 6],
        [7, b, 3, b, 1, 8, b, b, b]
    ];

    const BOARD_2 = [
        [9, b, 6, b, 7, b, 4, b, 3],
        [b, b, b, 4, b, b, 2, b, b],
        [b, 7, b, b, 2, 3, b, 1, b],
        [5, b, b, b, b, b, 1, b, b],
        [b, 4, b, 2, b, 8, b, 6, b],
        [b, b, 3, b, b, b, b, b, 5],
        [b, 3, b, 7, b, b, b, 5, b],
        [b, b, 7, b, b, 5, b, b, b],
        [4, b, 5, b, 1, b, 7, b, 8]
    ];

    const BOARD_3 = [
        [8, 4, 3, 5, 6, 7, 2, 1, 9],
        [b, b, b, b, b, b, b, b, 6],
        [b, b, b, b, b, b, b, b, 5],
        [3, 8, 4, 6, 7, 2, b, b, 1],
        [b, b, b, 1, 5, 9, b, b, 3],
        [b, b, b, 8, 3, 4, b, b, 7],
        [b, b, b, b, b, b, b, b, 4],
        [b, b, b, b, b, b, b, b, 8],
        [1, 9, 8, 3, 4, 5, 7, 6, 2]
    ];

    const sudoku = new SudokuBoard(BOARD_1);
    const sudokuGUI = new SudokuGUI(sudoku, BOARD_LENGTH, BOARD_VALUES);

    document.addEventListener("keypress", sudokuGUI.keyPressed);
    document.addEventListener("click", sudokuGUI.mouseClicked);

    sudokuGUI.drawGrid();
}

main();
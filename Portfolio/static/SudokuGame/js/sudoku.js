const b = null;

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

function solve(board) {
    if (solved(board)) {
        return board;
    }
    const possibilities = nextBoards(board);
    const validBoards = keepOnlyValid(possibilities);
    return searchForSolution(validBoards);
}

function searchForSolution(boards) {
    if (boards.length < 1) {
        return false;
    }

    var first = boards.shift();
    const tryPath = solve(first);

    if (tryPath != false) {
        return tryPath;
    }
    return searchForSolution(boards);
}

function solved(board) {
    for (var y = 0; y < 9; ++y) {
        for (var x = 0; x < 9; ++x) {
            if (board[y][x] === null) {
                return false;
            }
        }
    }
    return true;
}

function nextBoards(board) {
    var results = [];
    const firstEmpty = findEmptyCellCoords(board);

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

function findEmptyCellCoords(board) {
    for (var y = 0; y < 9; ++y) {
        for (var x = 0; x < 9; ++x) {
            if (board[y][x] == null) {
                return [x, y];
            }
        }
    }
}

function keepOnlyValid(boards) {
    return boards.filter((b) => isBoardValid(b));
}

function isBoardValid(board) {
    return checkRows(board) && checkColumns(board) && checkBoxes(board);
}

function checkRows(board) {
    for (var y = 0; y < 9; ++y) {
        var collectedInputs = [];
        for (var x = 0; x < 9; ++x) {
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

function checkColumns(board) {
    for (var x = 0; x < 9; ++x) {
        var collectedInputs = [];
        for (var y = 0; y < 9; ++y) {
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

function checkBoxes(board) {
    const boxCoordinates = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ];

    for (var y = 0; y < 9; y += 3) {
        for (var x = 0; x < 9; x += 3) {
            var collectedInputs = [];
            for (var i = 0; i < 9; ++i) {
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

console.log(solve(BOARD_1));
console.log('\n');
console.log(solve(BOARD_2));
console.log('\n');
console.log(solve(BOARD_3));

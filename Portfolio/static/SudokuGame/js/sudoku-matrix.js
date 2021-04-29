class SudokuMatrix {

    constructor(grid) {
        this.grid = this.initGrid(grid);
        this.gridLength = 9;
        this.boxLength = 3;
        
        this.emptyValue = 0;
        this.inputValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.basePositions = this.collectValuePositions();
        this.solutions = SudokuMatrix.solve(this);
    }

    initGrid(matrixList) {
        return [[8, 4, 3, 5, 6, 7, 2, 1, 9],
         [0, 0, 0, 0, 0, 0, 0, 0, 6],
         [0, 0, 0, 0, 0, 0, 0, 0, 5],
         [3, 8, 4, 6, 7, 2, 0, 0, 1],
         [0, 0, 0, 1, 5, 9, 0, 0, 3],
         [0, 0, 0, 8, 3, 4, 0, 0, 7],
         [0, 0, 0, 0, 0, 0, 0, 0, 4],
         [0, 0, 0, 0, 0, 0, 0, 0, 8],
         [1, 9, 8, 3, 4, 5, 7, 6, 2]];
    }

    insert(x, y, value) {
        if (this.basePositions.indexOf([x, y]) < 0) {
            this.grid[y][x] = value;
            if (value == this.emptyValue) {
                return [];
            }
            return this.getCollisionsAt(x, y);
        }
        return null;
    }

    remove(x, y) {
        return this.insert(x, y, this.emptyValue) != null;
    }

    checkValueAt(x, y, value, ignoreEmpty = true) {
        if (this.inputValues.indexOf(value) < 0) {
            if (value == this.emptyValue && ignoreEmpty) {
                return true;
            }
            return false;
        }

        // Check all vertical values and return if a collision was found
        for (var y1 = 0; y1 < this.gridLength; ++y) {
            if ([x, y1] != [x, y] && this.grid[y1][x] == value) {
                return false;
            }
        }

        // Check all horizontal values and return if a collision was found
        for (var x1 = 0; x1 < this.gridLength; ++x) {
            if ([x1, y] != [x, y] && this.grid[y][x1] == value) {
                return false;
            }
        }

        var y0 = Math.floor(y / this.boxLength) * this.boxLength; // Y-Cell (Box) Index
        var x0 = Math.floor(x / this.boxLength) * this.boxLength; // X-Cell (Box) Index

        // Check current box and return if a collision was found
        for (var n = 0; n < this.boxLength; ++n) {
            for (var m = 0; m < this.boxLength; ++m) {
                if ([x0 + n, y0 + m] != [x, y] && this.grid[y0 + m][x0 + n] == value) {
                    return false;
                }
            }
        }
        return true;
    }

    getItem(x, y) {
        return this.grid[y][x];
    }

    setItem(x, y, value) {
        return this.insert(x, y, value) != null;
    }

    getNextInputFor(x, y) {
        if (this.grid[y][x] == this.emptyValue) {
            return this.inputValues[0];
        }
        return this.inputValues[(this.inputValues.indexOf(this.grid[y][x]) + 1) % this.inputValues.length];
    }

    getPreviousInputFor(x, y) {
        if (this.grid[y][x] == this.emptyValue) {
            return this.inputValues[this.inputValues.length - 1];
        }
        return this.inputValues[(this.inputValues.indexOf(this.grid[y][x]) - 1) % this.inputValues.length];
    }

    getCollisionsAt(x, y) {
        var valueCollisions = [];
        var posValue = this.grid[y][x];

        for (var y1 = 0; y1 < this.gridLength; ++y1) {
            if (y1 != y && this.grid[y1][x] == posValue) {
                valueCollisions.push([x, y1]);
            }   
        } 

        for (var x1 = 0; x1 < this.gridLength; ++x1) {
            if (x1 != x && this.grid[y][x1] == posValue) {
                valueCollisions.push([x1, y]);
            }   
        }

        var y0 = Math.floor(y / this.boxLength) * this.boxLength; // Y-Cell (Box) Index
        var x0 = Math.floor(x / this.boxLength) * this.boxLength; // X-Cell (Box) Index

        // Check current box and return if a collision was found
        for (var n = 0; n < this.boxLength; ++n) {
            for (var m = 0; m < this.boxLength; ++m) {
                if ([x0 + n, y0 + m] != [x, y] && this.grid[y0 + m][x0 + n] == value) {
                    valueCollisions.push([x0 + n, y0 + m]);
                }
            }
        }
        return valueCollisions;
    }

    check(ignoreEmpty = false) {
        for (var y = 0; y < this.gridLength; ++y) {
            for (var x = 0; x < this.gridLength; ++x) {
                if (!this.checkValueAt(x, y, this.grid[y][x], ignoreEmpty)) {
                    return false;
                }
            }
        }
        return true;
    }

    isSolved() {
        return this.check(false);
    }

    static solve_helper(matrix, results) {

        for (var y = 0; y < matrix.gridLength; ++y) {
            for (var x = 0; x < matrix.gridLength; ++x) {
                if (matrix.grid[y][x] == matrix.emptyValue) {
                    for (var n in matrix.inputValues) {
                        if (matrix.checkValueAt(x, y, n)) {
                            matrix.grid[y][x] = n;
                            result = SudokuMatrix.solve_helper(matrix.copy(), results);
                            
                            console.log(result.toString());

                            if (result != null) {
                                console.log(result.toString());
                                results.push(result.copy());
                                counter[0] -= 1;
                            }
                            matrix.setItem(x, y, matrix.emptyValue);
                        }
                    }
                    return;
                }
            }
        }
        return matrix.grid;
    }

    static solve(matrix, maxResults = 1) {
        const results = [];

        SudokuMatrix.solve_helper(matrix, results);
        return results;
    }

    collectValuePositions() {
        var notEmptyPositions = [];

        for (var y = 0; y < this.gridLength; ++y) {
            for (var x = 0; x < this.gridLength; ++x) {
                if (this.inputValues.indexOf(this.grid[y][x]) >= 0) {
                    notEmptyPositions.push([x, y]);
                }
            }
        }
        return notEmptyPositions;
    }

    getGrid() {
        return this.grid;
    }

    getGridLength() {
        return this.gridLength;
    }

    getBoxLength() {
        return this.boxLength;
    }

    getEmptyValue() {
        return this.emptyValue;
    }

    getInputValues() {
        return this.inputValues;
    }

    getBasePositions() {
        return this.basePositions;
    }

    getSolutions() {
        return this.solutions;
    }
}

var matrix = new SudokuMatrix([]);
console.log(matrix.getGrid().toString());
console.log(matrix.getSolutions());
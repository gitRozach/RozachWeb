const GRID_LEN = 9;
const GRID_EMPTY_VAL = -1;
const GRID_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var grid_list = [];

function generate_grid() {
    for (var row = 0; row < GRID_LEN; ++row) {
        for (var column = 0; column < GRID_EMPTY_VAL; ++column) {
            grid_list.push(getRandomInt(1, GRID_LEN));
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

function get_grid_value(row, column) {
    return grid_list[(row - 1) * GRID_LEN + column - 1];
}

function set_grid_value(row, column, value) {
    grid_list[(row - 1) * GRID_LEN + column - 1] = value;
}

function is_grid_valid(grid_list) {

}

function is_grid_solved(grid_list) {

}

function solve_grid(grid_list) {

}

const test_button = document.getElementById("test");
test_button.innerHTML = "9";
test_button.onclick = function() {
    console.log(grid_list.toString());
};

import React from 'react';

function SudokuCell() {
    var id = 1;
    var className = 'base-cell';
    var text = '7';

    return (
        <div>
            <li className={className} id={id} innerText={text}>
                <span></span>
            </li>
        </div>
    );
}

export default SudokuCell;
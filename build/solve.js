async function solve(board, size, charMap, callback) {
    await callback(board);
    
    let count = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === "") {
                count++;

                // Try each possible valid character for this cell, recurse, and undo the change
                for (let k = 0; k < size; k++) {
                    if (!inColumn(k + 1, j, board, charMap) &&
                        !inRow(k + 1, i, board, charMap) &&
                        !inSubgrid(k + 1, i, j, board, charMap)) {
                        
                        board[i][j] = Object.keys(charMap)[k];
                        
                        // If this change resulted in a solution for the entire board, stop recursing
                        if (await solve(board, size, charMap, callback)) {
                            return true;
                        }
                        
                        board[i][j] = "";
                    }
                }
                
                // If there are no paths to a solution for the board, backtrack
                return false;
            }
        }
    }
    return true;
}

function inColumn(char, col, board, charMap) {
    for (let i = 0; i < board.length; i++) {
        if (charMap[board[i][col]] === char) {
            return true;
        }
    }
    return false;
}

function inRow(char, row, board, charMap) {
    for (let i = 0; i < board[row].length; i++) {
        if (charMap[board[row][i]] === char) {
            return true;
        }
    }
    return false;
}

function inSubgrid(char, row, col, board, charMap) {
    let subSize = Math.floor(Math.sqrt(board.length));
    let rowStart = Math.floor(row / subSize) * subSize;
    let colStart = Math.floor(col / subSize) * subSize;
    for (let i = rowStart; i < rowStart + subSize; i++) {
        for (let j = colStart; j < colStart + subSize; j++) {
            if (charMap[board[i][j]] === char) {
                return true;
            }
        }
    }
    return false;
}
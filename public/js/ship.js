
let gameBoard = {
    'human': [
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--']
    ],
    'machine': [
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--']
    ],

}

function bufferShip ( x, y, p ) {
    for ( let i = -1; i <= 1; i++ )  {
        for ( let j = -1; j <= 1; j++ )  {
            let newX = x + i
            let newY = y + j
            if ( newX >= 0 && newX <= 9 && newY >= 0 && newY <= 9 && gameBoard[p][newX][newY] == '--' ) {
                gameBoard[p][newX][newY] = '**'
            }
        }
    }
}

function isAllowed ( d, l, x, y, p ) {
    let result = true

    for ( let i = 0; i < l; i++ )  {
        switch ( d ) {
            case 0:
                if ( gameBoard[p][x][y+i] != '--') {
                    result = false
                }
                break
            case 1:
                if ( gameBoard[p][x+i][y] != '--') {
                    result = false
                }
                break
        }
    }

    return result
}

function initShip ( length, player ) {

    let direction = Math.floor(Math.random() * 2)


    let x, y

    switch ( direction ) {

        case 0: // vertical

            do {
                x = Math.floor(Math.random() * 10)
                y = Math.floor(Math.random() * (11 - length))
            } while ( !isAllowed(direction, length, x, y, player) )

            for ( let i = 0; i < length; i++ ) {
                gameBoard[player][x][y+i] = 's' + length
                bufferShip(x, y+i, player)
            }

            break

        case 1: // horizontal

            do {
                x = Math.floor(Math.random() * (11 - length))
                y = Math.floor(Math.random() * 10)
            } while ( !isAllowed(direction, length, x, y, player) )

            for ( let i = 0; i < length; i++ ) {
                gameBoard[player][x+i][y] = 's' + length
                bufferShip(x+i, y, player)
            }

            break
    }
}

function initGrid( b ) {
    const boardName = b.dataset.boardName
    for ( let i = 0; i < 10; i++ ) {
        for ( let j = 0; j < 10; j++ ) {
            let cellDiv = document.createElement('div')
            cellDiv.classList = 'cell'
            cellDiv.dataset.row = i
            cellDiv.dataset.col = j

            if ( boardName == 'human' ) {
                if ( gameBoard[boardName][i][j].charAt(0) == 's' ) {
                    cellDiv.classList += ' ship'
                    // cellDiv.innerHTML = gameBoard[boardName][i][j]
                }
            }

            b.append(cellDiv)
        }
    }
}

const humanBoardDiv = document.querySelector('#human-board')
const machineBoardDiv = document.querySelector('#machine-board')

for ( let len = 4; len > 0; len-- ) {
    for ( let i = 1; i <= 5-len; i++ ) {
        initShip(len, 'human')
        initShip(len, 'machine')
   }
}

initGrid(humanBoardDiv)
initGrid(machineBoardDiv)

const cellDivs = document.querySelectorAll('#machine-board .cell')

cellDivs.forEach(el => {
    el.addEventListener('click', event => {
        const selectedCell = event.currentTarget
        const selectedRow = selectedCell.dataset.row
        const selectedCol = selectedCell.dataset.col

        console.log(gameBoard['machine'][selectedRow][selectedCol])
    })
})



console.log(gameBoard)

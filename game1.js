const grid = document.querySelector('.grid');
const matchSound = document.getElementById('match-sound');

const width = 8;
const colors = ['red', 'blue', 'green', 'yellow'];
let squares = [];

// Create the board
function createBoard() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        square.setAttribute('data-color', randomColor);
        square.setAttribute('draggable', true);
        square.setAttribute('id', i); // Unique ID for each square
        grid.appendChild(square);
        squares.push(square);

        // Add event listeners for drag-and-drop
        square.addEventListener('dragstart', dragStart);
        square.addEventListener('dragend', dragEnd);
        square.addEventListener('dragover', dragOver);
        square.addEventListener('dragenter', dragEnter);
        square.addEventListener('dragleave', dragLeave);
        square.addEventListener('drop', dragDrop);
    }
}

let colorBeingDragged;
let squareIdBeingDragged;
let squareIdBeingReplaced;

function dragStart() {
    colorBeingDragged = this.getAttribute('data-color');
    squareIdBeingDragged = parseInt(this.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    squareIdBeingReplaced = parseInt(this.id);
    const validMoves = [
        squareIdBeingDragged - 1, // Left
        squareIdBeingDragged + 1, // Right
        squareIdBeingDragged - width, // Above
        squareIdBeingDragged + width, // Below
    ];

    if (validMoves.includes(squareIdBeingReplaced)) {
        squares[squareIdBeingReplaced].setAttribute('data-color', colorBeingDragged);
        squares[squareIdBeingDragged].setAttribute(
            'data-color',
            this.getAttribute('data-color')
        );
    } else {
        return false;
    }
}

function dragEnd() {
    // Check for matches after drag
    checkMatches();
}

// Check for matches
function checkMatches() {
    // Check rows of three
    for (let i = 0; i < 64; i++) {
        let rowOfThree = [i, i + 1, i + 2];
        let decidedColor = squares[i].getAttribute('data-color');
        const isBlank = decidedColor === null;

        if (
            rowOfThree.every(
                index =>
                    squares[index] &&
                    squares[index].getAttribute('data-color') === decidedColor &&
                    !isBlank
            )
        ) {
            rowOfThree.forEach(index => {
                squares[index].setAttribute('data-color', '');
            });
            matchSound.play();
        }
    }

    // Check columns of three
    for (let i = 0; i < 48; i++) {
        let columnOfThree = [i, i + width, i + width * 2];
        let decidedColor = squares[i].getAttribute('data-color');
        const isBlank = decidedColor === null;

        if (
            columnOfThree.every(
                index =>
                    squares[index] &&
                    squares[index].getAttribute('data-color') === decidedColor &&
                    !isBlank
            )
        ) {
            columnOfThree.forEach(index => {
                squares[index].setAttribute('data-color', '');
            });
            matchSound.play();
        }
    }
}

// Initialize the game
createBoard();

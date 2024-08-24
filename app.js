const gamesBoardContainer = document.querySelector('#gamesboard-container');
const optionContainer = document.querySelector('.option-container');
const flipButton = document.querySelector('#flip-button'); // Ensure this button exists in HTML
const startButton = document.querySelector('#start-button'); // Ensure this button exists in HTML
const infoDisplay = document.querySelector('#info'); // Ensure this element exists in HTML
const turnDisplay = document.querySelector('#turn'); // Ensure this element exists in HTML

let angle = 0;

function flip() {
    const optionShips = Array.from(optionContainer.children); // Get the children of the option container
    angle = angle === 0 ? 90 : 0; // Rotate angle
    optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`); // Rotate each ship
}

flipButton.addEventListener('click', flip); // Add event listener to the button

const width = 10; // Set the width of the board to 10

function createBoard(color, user) {
    const gameBoardContainer = document.createElement('div'); // Create a div element
    gameBoardContainer.classList.add('game-board'); // Add a class to the div element
    gameBoardContainer.style.backgroundColor = color; // Set background color
    gameBoardContainer.id = user; // Set ID

    for (let i = 0; i < width * width; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.id = i;
        gameBoardContainer.append(block);
    }

    gamesBoardContainer.append(gameBoardContainer); // Append the new board to the container
}

createBoard('yellow', 'user'); 
createBoard('pink', 'computer'); // Call the function to create the boards

class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.direction = 0;
        this.position = [];
    }
}

const destroyer = new Ship('destroyer', 2);
const submarine = new Ship('submarine', 3);
const cruiser = new Ship('cruiser', 3);
const battleship = new Ship('battleship', 4);
const carrier = new Ship('carrier', 5);

const ships = [destroyer, submarine, cruiser, battleship, carrier];
let notDropped;

function getValidity(allBoardBlocks, ship, isHorizontal, randomStartIndex) {
    let validStart = isHorizontal ? 
        (randomStartIndex <= width * width - ship.length ? randomStartIndex : width * width - ship.length) :
        (randomStartIndex <= width * width - ship.length * width ? randomStartIndex : randomStartIndex - ship.length * width + width);

    let shipBlocks = [];

    for (let i = 0; i < ship.length; i++) {
        if (isHorizontal) {
            shipBlocks.push(allBoardBlocks[validStart + i]);
        } else {
            shipBlocks.push(allBoardBlocks[validStart + i * width]);
        }
    }

    let valid = true;

    if (isHorizontal) {
        valid = shipBlocks.every((block, index) => 
            block.id % width !== width - (shipBlocks.length - (index + 1))
        );
    } else {
        valid = shipBlocks.every((block, index) =>
            block.id < width * (width - shipBlocks.length + 1) + width * index + 1
        );
    }

    const notTaken = shipBlocks.every(block => !block.classList.contains('taken'));

    return { valid, notTaken, shipBlocks };
}

function addShipPiece(user, ship, startId) {
    const allBoardBlocks = document.querySelectorAll(`#${user} div`);
    let randomBoolean = Math.random() < 0.5;
    let isHorizontal = randomBoolean;
    let randomStartIndex = Math.floor(Math.random() * width * width);
    
    const { shipBlocks, valid, notTaken } = getValidity(allBoardBlocks, ship, isHorizontal, randomStartIndex);

    if (valid && notTaken) {
        shipBlocks.forEach(block => {
            block.classList.add('ship-' + ship.name); // Added '-' to create unique class names for ships
            block.classList.add('taken');
        });
    } else {
        if (user === "computer") addShipPiece(user, ship, startId);        
        if (user === "player") notDropped = true;       
    }
}

ships.forEach(ship => addShipPiece('computer', ship));

let draggedShip;
const optionShips = Array.from(optionContainer.children);
optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart));

const allPlayerBlocks = document.querySelectorAll('#user div'); // Changed from '#player' to '#user'
allPlayerBlocks.forEach(playerBlock => {
    playerBlock.addEventListener('dragover', dragOver);
    playerBlock.addEventListener('drop', dropShip);
});

function dragStart(e) {
    draggedShip = e.target;
}

function dragOver(e) {
    e.preventDefault();
    const ship = ships[draggedShip.id];
    highlightArea(e.target.id, ship);
}

function dropShip(e) {  
    const startId = e.target.id; // Corrected eTarget to e.target
    const ship = ships[draggedShip.id];
    addShipPiece('user', ship, startId); // Changed 'player' to 'user'
    if (!notDropped) {
        draggedShip.remove();
    }
}

function highlightArea(startIndex, ship) {
    const allBoardBlocks = document.querySelectorAll(`#user div`); // Changed from '#player' to '#user'
    let isHorizontal = angle === 0;

    const { shipBlocks, valid, notTaken } = getValidity(allBoardBlocks, ship, isHorizontal, startIndex);

    if (valid && notTaken) {
        shipBlocks.forEach(block => block.classList.add('hover')); // Changed from shipBlocks to block
        setTimeout(() => shipBlocks.forEach(block => block.classList.remove('hover')), 500); // Added missing parenthesis and loop
    }
}


let gameOver = false;
let playerTurn

// Function to start the game
function startGame() {
    if optionContainer.children.length ! = 0 {
        infoDisplay.textContent = 'Please place all your pieces first';
    } else {
        const allBoardBlocks = document.querySelectorAll('#computer div');
        allBoardBlocks.forEach(block => block.addEventListener('click', handleClick));
    }

}

fucntion handleClick(e) {
    if(!gameOver) {
        if(e.target.classList.contains('taken') || e.target.classList.contains('miss')) {
           e.target.classList.add('boom'); 
           infoDisplay.textContent = 'You hit this computers ship!';
           
           let classes = Array.from (e.target.classList);
           classes = classes.filter(className => className !== 'block');
           classes = classes.filter(className => className !== 'boom');
           classes = classes.filter(className => className !== 'taken);
           
        }
    }
}

startButton.addEventListener('click', startGame); // Add event listener to the button



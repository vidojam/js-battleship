const gamesBoardContainer = document.querySelector('#gamesboard-container');
const optionContainer = document.querySelector('.option-container');
const flipButton = document.querySelector('#flip-button'); // Ensure this button exists in HTML
const startButton = document.querySelector('#start-button'); // Ensure this button exists in HTML
const infoDisplay = document.querySelector('#info'); // Ensure this element exists in HTML
const turnDisplay = document.querySelector('#turn-display'); // Corrected ID

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
            block.id % width <= width - shipBlocks.length + (index + 1)
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
        if (user === "user") notDropped = true;       
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
let playerTurn;

// Function to start the game
function startGame() {
    if (playerTurn === undefined) {
      if (optionContainer.children.length !== 0) { // Fixed syntax error
        infoDisplay.textContent = 'Please place all your pieces first';
    } else {
        const allBoardBlocks = document.querySelectorAll('#computer div');
        allBoardBlocks.forEach(block => block.addEventListener('click', handleClick));
        playerTurn = true;
        turnDisplay.textContent = 'Your Go';
        infoDisplay.textContent = 'The game has started.'; 
    }
 
   }   
}

startButton.addEventListener('click', startGame);

let playerHits = [];
let computerHits = [];
let playerSunkenShips = [];
let computerSunkenShips = [];

function handleClick(e) { // Fixed typo: function name
    if (!gameOver) {
        if (e.target.classList.contains('taken') || e.target.classList.contains('miss')) {
            e.target.classList.add('boom'); 
            infoDisplay.textContent = 'You hit this computer\'s ship!'; // Fixed apostrophe
            let classes = Array.from(e.target.classList);
            classes = classes.filter(className => className !== 'block');
            classes = classes.filter(className => className !== 'boom');
            classes = classes.filter(className => className !== 'taken');
            playerHits.push(...classes);
            checkScore('user', playerHits, playerSunkenShips); // Changed 'player' to 'user'
        } else {
            infoDisplay.textContent = 'Nothing hit this time.';
            e.target.classList.add('empty');
        }
        playerTurn = false;
        const allBoardBlocks = document.querySelectorAll('#user div'); // Changed from '#player' to '#user'
        allBoardBlocks.forEach(block => block.replaceWith(block.cloneNode(true)));
        setTimeout(computerGo, 3000);
    }
}

startButton.addEventListener('click', startGame); // Fixed function name

// Define the computer's go
function computerGo() {
    if (!gameOver) {
        turnDisplay.textContent = 'Computer\'s Turn';
        infoDisplay.textContent = 'The computer is thinking...';

        setTimeout(() => {
            let randomGo = Math.floor(Math.random() * width * width);
            const allBoardBlocks = document.querySelectorAll('#user div'); // Changed from '#player' to '#user'

            if (allBoardBlocks[randomGo].classList.contains('taken') && !allBoardBlocks[randomGo].classList.contains('boom')) {
                allBoardBlocks[randomGo].classList.add('boom');
                infoDisplay.textContent = 'The computer hit your ship!';
                let classes = Array.from(allBoardBlocks[randomGo].classList);
                classes = classes.filter(className => className !== 'block');
                classes = classes.filter(className => className !== 'boom');
                classes = classes.filter(className => className !== 'taken');
                computerHits.push(...classes);
                checkScore('computer', computerHits, computerSunkenShips); // Changed 'player' to 'computer'
            } else {
                infoDisplay.textContent = 'Nothing hit this time.';
                allBoardBlocks[randomGo].classList.add('empty');
            }

            setTimeout(() => {
                playerTurn = true;
                turnDisplay.textContent = 'Your Turn'; // Fixed wording
                infoDisplay.textContent = 'Please take your turn.'; // Fixed wording
                const allBoardBlocks = document.querySelectorAll('#user div'); // Changed from '#player' to '#user'
                allBoardBlocks.forEach(block => block.addEventListener('click', handleClick));
            }, 3000); // Adding a delay for the player's move
        }, 3000); // Adding a delay for the computer's move
    }
}

function checkScore(user, userHits, userSunkenShips) { // Fixed function name and arguments
    function checkShip(shipName, shipLength) {
        if (
            userHits.filter(storedShipName => storedShipName === shipName).length === shipLength
        ) {
             
            if (user === 'player') {
            infoDisplay.textContent = `You sunk the computers ${shipName}!`; // Fixed backticks
                playerHits = userHits.filter(storedShipName => storedShipName !== shipName);
            }
            if (user === 'computer') {
                infoDisplay.textContent = `The computer sunk your  ${shipName}!`; // Fixed backticks
                computerHits = userHits.filter(storedShipName => storedShipName !== shipName);
            }
            userSunkenShips.push(shipName);
        }
    }
    checkShip('destroyer', 2);
    checkShip('submarine', 3);
    checkShip('cruiser', 3);
    checkShip('battleship', 4);
    checkShip('carrier', 5);
}

console.log(playerHits);
console.log(playerSunkenShips);

if (playerSunkenShips.length === 5) {
    infoDisplay.textContent = 'You sunk all the computers ships. You won!';
    gameOver = true;
}
if (computerSunkenShips.length === 5) {
    infoDisplay.textContent = 'The computer has sunk all your ships. You Lost!';
    gameOver = true;
}



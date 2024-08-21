const gamesBoardContainer = document.querySelector('#gamesBoard-container');

const optionContainer = document.querySelector('.option-container');

const flipButton = document.querySelector('#flip-button'); // check the whole document for the button


let angle = 0; 

function flip() {
    const optionShips = (Array.from(optionContainer.children)); // log the children of the option container
        if (angle === 0) {
          angle = 90; 
          
        } else {
            angle = 0;
     } 

        optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`); // backticks to be able to change the angle in the future. Brackets are used to insert the angle variable
}

flipButton.addEventListener('click', flip); // add an event listener to the button


const width = 10; // set the width of the board to 10


function createBoard(color, user) {
    const gameBoardContainer = document.createElement('div'); // create a div element
    gameBoardContainer.classList.add('game-board'); // add a class to the div element    
    gameBoardContainer.style.backgroundColor = color; 
    gameBoardContainer.id = user;

    for (let i=0; i < width * width; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.id = i;
        gameBoardContainer.append(block);
    

    gamesBoardContainer.append(gameBoardContainer);
}  

createBoard('yellow','user'); 
createBoard('pink', 'computer'); // call the function to create the board


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

function addShipPiece(ship) {
    const allBoardBlocks = document.querySelectorAll('#computer div');
    let randomBoolean = Math.random() < 0.5;
    let isHorizontal = randomBoolean;
    let randomStartIndex = Math.floor(Math.random) * width * width);
    
    letValidStart = isHorizontal ? randomStartIndex <=  width * width - ship.length ? randomStartIndex: 
    width * width - ship.length 

    randomStartIndex <= width * width - ship.length * width ? randomStartIndex: randomStartIndex - ship.length * width + width;

    let shipBlocks = [];

    for (let i = 0; i < ship; i++ {
        if (isHorizontal) {
            shipBlocks.push(allBoardBlocks[Number(validStart) + 1]);    
        } else {
            shipBlocks.push(allBoardBlocks[Number(validStart) + i + width]);
        }
    }

    let valid = true

    if (isHorizontal) {
        shipBlocks.every((_shipBlock, index) =>
            valid = shipBlocks[0].id % width !== width - (shipBlocks.length - (index + 1)))
    } else {
            valid =  shipBlocks.every((_shipBlock, index) =>
                 shipBlocks[0].id < 90 + (width * index + 1)
            )
    }

    const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'));

    if (valid & notTaken) {
        shipBlocks.forEach(shipBlock => {
            shipBlock.classList.add('ship.name');
            shipBlock.classList.add('taken');
        })
    } else {
        addShipPiece(ship);
    }
    

ships.forEach(ship => addShipPiece(ship));


let draggedShip;
const optionShips = Array.from(optionContainer.children);
optionShips.forEach(optionShip => optionship.addEventListener('dragstart', dragStart));

const allPlayerBlocks = document.querySelectorAll('#player div'));

function dragStart(e) {
    draggedShip = (e.target);
}


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

    let shipBlocks = [];

    for (let i = 0; i < ship; i++ {
        if (isHorizontal) {
            shipBlocks.push(allBoardBlocks[Number(randomStartIndex)+ 1]);    
        } else {
            shipBlocks.push(allBoardBlocks[Number(randomStartIndex) + i + width]);
        }
    }

    shipBlocks.forEach(shipBlock => {
        shipBlock.classList.add('ship.name');
        shipBlock.classList.add('taken');
    })

ships.forEach(ship => addShipPiece(ship));


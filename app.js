const gamesBoardContainer = document.querySelector('#gamesBoard-container');

const optionContainer = document.querySelector('.option-container');

const flipButton = document.querySelector('#flip-button'); // check the whole document for the button

// option choosing
let angle = 0; // set the angle to 0
function flip() {
    const optionShips = (Array.from(optionContainer.children)); // log the children of the option container
        // if (angle === 0) {
        //     angle = 90; // set the angle to 90 
        // } else {
        //     angle = 0; // set the angle to 0
        // } 
        // or below
    angle = angle === 0 ? 90 : 0; // if the angle is 0, set it to 90, otherwise set it to 0


        optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`); // backticks to be able to change the angle in the future. Brackets are used to insert the angle variable
}

// creating board
const width = 10; // set the width of the board to 10


function createBoard() {
    const gameBoardContainer = document.createElement('div'); // create a div element
    gameBoardContainer.classList.add('game-board'); // add a class to the div element    
    gameBoardContainer.style.backgroundColor = 'pink'; // set the background color of the div element to pink
    gamesBoardContainer.append(gameBoardContainer);
}  

createBoard(); // call the function to create the board

flipButton.addEventListener('click', flip); // add an event listener to the button



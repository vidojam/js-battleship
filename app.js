const gamesBoardContainer = document.querySelector('#gamesBoard-container');

const optionContainer = document.querySelector('.option-container');

const flipButton = document.querySelector('#flip-button'); // check the whole document for the button


let angle = 0; // set the angle to 0
function flip() {
    const optionShips = (Array.from(optionContainer.children)); // log the children of the option container
        if (angle === 0) {
          angle = 90; 
          
        } else {
            angle = 0;
     } 

        optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`); // backticks to be able to change the angle in the future. Brackets are used to insert the angle variable
}


const width = 10; // set the width of the board to 10


function createBoard(color, user) {
    const gameBoardContainer = document.createElement('div'); // create a div element
    gameBoardContainer.classList.add('game-board'); // add a class to the div element    
    gameBoardContainer.style.backgroundColor = color; 
    gameBoardContainer.id = user

    for (let i=0; i < width * width; i++) {
        const block = document.createElement('div'); // create a div element
    }
    

    gamesBoardContainer.append(gameBoardContainer);
}  

createBoard('yellow','user'); 
createBoard('pink', 'computer'); // call the function to create the board

flipButton.addEventListener('click', flip); // add an event listener to the button



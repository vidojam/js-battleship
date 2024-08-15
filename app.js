const optionContainer = document.querySelector('.option-container');

const flipButton = document.querySelector('#flip-button'); // check the whole document for the button

let angle = 0; // set the angle to 0
function flip() {
    const optionShips = (Array.from(optionContainer.children)); // log the children of the option container
        if (angle === 0) {
            angle = 90; // set the angle to 90 
        } else {
            angle = 0; // set the angle to 0
        }
        optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`); // backticks to be able to change the angle in the future. Brackets are used to insert the angle variable
}

flipButton.addEventListener('click', flip); // add an event listener to the button

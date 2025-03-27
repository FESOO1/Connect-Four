const mainItself = document.querySelector('.main-itself');
const turnText = document.querySelector('.main-turn');
const restartButton = document.querySelector('#restartButton');

// GAME
let gameHasBeenWon = false;

// TURN
const turn = {
    isBluesTurn: false,
    isClass: 'main-itself-inner-child-red-occupied',
    isState: 'red-occupied',
    winnerClass: 'main-itself-inner-child-red-winner',
}

// CHANGE TURNS

function changeTurns() {
    if (turn.isBluesTurn === false) {
        turn.isClass = 'main-itself-inner-child-red-occupied';
        turn.isState = 'red-occupied';
        turn.winnerClass = 'main-itself-inner-child-red-winner';
        turnText.textContent = 'It is red\'s turn';
    } else {
        turn.isClass = 'main-itself-inner-child-blue-occupied';
        turn.isState = 'blue-occupied';
        turn.winnerClass = 'main-itself-inner-child-blue-winner';
        turnText.textContent = 'It is blue\'s turn';
    };
};

// ADDING THE ELEMENTS

function addingTheElements() {
    mainItself.innerHTML = '';
    for (let i = 0; i < 7; i++) {
        const columnElement = document.createElement('div');
        columnElement.classList.add('main-itself-inner');
    
        columnElement.addEventListener('click', () => handlingTheColumnElement(columnElement));
    
        for (let iterator = 0; iterator < 6; iterator++) {
            const columnElementChild = document.createElement('div');
            columnElementChild.classList.add('main-itself-inner-child');
            columnElementChild.setAttribute('data-child-state', 'empty');
            columnElementChild.setAttribute('data-child-index', iterator);
            columnElement.appendChild(columnElementChild);
        };
        mainItself.appendChild(columnElement);
    };
};

addingTheElements();

// HANDLING THE COLUMN ELEMENT

function handlingTheColumnElement(columnElement) {
    const columnChildren = columnElement.querySelectorAll('.main-itself-inner-child');

    for (let i = 5; i >= 0; i--) {
        const columnChildState = columnChildren[i].getAttribute('data-child-state');

        if (turn.isBluesTurn === false) {
            if (columnChildState === 'empty') {
                columnChildren[i].classList.add(turn.isClass);
                columnChildren[i].setAttribute('data-child-state', turn.isState);
                // CHECKING IF THE GAME HAS BEEN WON
                checkIfTheGamehasBeenWon();
                
                if (gameHasBeenWon === false) {
                    turn.isBluesTurn = true;
                    changeTurns();
                };
                break;
            };
        } else if (turn.isBluesTurn === true) {
            if (columnChildState === 'empty') {
                columnChildren[i].classList.add(turn.isClass);
                columnChildren[i].setAttribute('data-child-state', turn.isState);
                // CHECKING IF THE GAME HAS BEEN WON
                checkIfTheGamehasBeenWon();

                if (gameHasBeenWon === false) {
                    turn.isBluesTurn = false;
                    changeTurns();
                };
                break;
            };
        };
    };
};

// CHECK IF THE GAME HAS BEEN WON

function checkIfTheGamehasBeenWon() {
    const columnElements = mainItself.querySelectorAll('.main-itself-inner');
    const elementStates = {
        elementState: [],
        elementIndex: [],
        elementCounter: 0,
        parentIndex: 0,
    };

    // CHECKING VERTICALLY
    for (let i = 0; i < columnElements.length; i++) {
        for (let iterator = 0; iterator < columnElements[i].childElementCount; iterator++) {
            const childState = columnElements[i].children[iterator].getAttribute('data-child-state');
            const childIndex = columnElements[i].children[iterator].getAttribute('data-child-index');

            elementStates.elementState.push(childState);
            elementStates.elementIndex.push(childIndex);
            elementStates.parentIndex = i;

            if (elementStates.elementState.length === 6) {

                // CHECKING IF FOUR ELEMENTS HAVE BEEN OCCUPIED
                for (const state of elementStates.elementState) {
                    if (state === turn.isState) {
                        elementStates.elementCounter++;

                        if (elementStates.elementCounter === 4) {
                            const winner = turn.isBluesTurn === false ? 'Red won the game.' : 'Blue won the game.';

                            turnText.textContent = winner;

                            gameHasBeenWon = true;
                            disablingAndEnablingTheColumnElements();
                            break;
                        };
                    } else {
                        elementStates.elementState = [];
                        elementStates.elementIndex = [];
                        elementStates.parentIndex = 0;
                        elementStates.elementCounter = 0;
                    };
                };
            };
        };
    };

    // CHECKING HORIZONTALLY

};

// DISABLING AND ENABLING THE COLUMN ELEMENTS

function disablingAndEnablingTheColumnElements() {
    const columnElements = mainItself.querySelectorAll('.main-itself-inner');

    for (const columnElement of columnElements) {
        if (gameHasBeenWon === false) {
            columnElement.classList.remove('main-itself-inner-inactive');
        } else {
            columnElement.classList.add('main-itself-inner-inactive');
        };
    };
};

// RESTARTING THE GAME

function restartingTheGame() {
    gameHasBeenWon = false;
    disablingAndEnablingTheColumnElements();
    addingTheElements();
    turn.isBluesTurn = false;
    changeTurns();
};

// INITIALIZING BUTTONS
restartButton.addEventListener('click', restartingTheGame);
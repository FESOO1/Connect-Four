const mainItself = document.querySelector('.main-itself');

// GAME OBJECT

// TURN
const turn = {
    isBluesTurn: false,
    isClass: 'main-itself-inner-child-red-occupied',
    isState: 'red-occupied',
}

// CHANGE TURNS

function changeTurns() {
    if (turn.isBluesTurn === false) {
        turn.isClass = 'main-itself-inner-child-red-occupied';
        turn.isState = 'red-occupied';
    } else {
        turn.isClass = 'main-itself-inner-child-blue-occupied';
        turn.isState = 'blue-occupied';
    };
};

// ADDING THE ELEMENTS

for (let i = 0; i < 7; i++) {
    const columnElement = document.createElement('div');
    columnElement.classList.add('main-itself-inner');

    columnElement.addEventListener('click', () => handlingTheColumnElement(columnElement));

    for (let iterator = 0; iterator < 6; iterator++) {
        const columnElementChild = document.createElement('div');
        columnElementChild.classList.add('main-itself-inner-child');
        columnElementChild.setAttribute('data-child-state', 'empty');
        columnElement.appendChild(columnElementChild);
    };
    mainItself.appendChild(columnElement);
};

// HANDLING THE COLUMN ELEMENT

function handlingTheColumnElement(columnElement) {
    const columnChildren = columnElement.querySelectorAll('.main-itself-inner-child');

    for (let i = 5; i >= 0; i--) {
        const columnChildState = columnChildren[i].getAttribute('data-child-state');

        if (columnChildState === 'empty') {
            columnChildren[i].classList.add(turn.isClass);
            columnChildren[i].setAttribute('data-child-state', turn.isState);
            break;
        };
    };
};
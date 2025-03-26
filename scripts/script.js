const mainItself = document.querySelector('.main-itself');

// ADDING THE ELEMENTS

for (let i = 0; i < 7; i++) {
    const columnElement = document.createElement('div');
    columnElement.classList.add('main-itself-inner');

    for (let iterator = 0; iterator < 6; iterator++) {
        const columnElementChild = document.createElement('div');
        columnElementChild.classList.add('main-itself-inner-child');
        columnElementChild.setAttribute('data-child-state', 'empty');
        columnElement.appendChild(columnElementChild);
    };
    mainItself.appendChild(columnElement);
};

const columnElement = mainItself.querySelectorAll('.main-itself-inner');

for (let i = 0; i < columnElement.length; i++) {
    columnElement[i].addEventListener('click', () => {
        console.log(columnElement[i]);
    });
};
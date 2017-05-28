/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    var newDiv = document.createElement('div');

    newDiv.setAttribute('class', 'draggable-div');
    newDiv.style.width = '100px';
    newDiv.style.height = '100px';
    newDiv.style.backgroundColor = '#111';
    newDiv.style.position = 'absolute';
    newDiv.style.top = '20px';
    newDiv.style.left = '20px';

    return newDiv;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {

    var xxx = 0,
        yyy = 0,
        shiftX = 0,
        shiftY = 0;

    target.addEventListener('mousedown', function() {

        target.style.zIndex = 1000;
        shiftX = xxx - target.style.top; 
        shiftY = yyy - target.style.let;

        function movvveee(e) {
            e.target.style.top = xxx - shiftX + 'px';
            e.target.style.let = yyy - shiftY + 'px';
        }

        homeworkContainer.addEventListener('mousemove', movvveee);

        target.addEventListener('mouseup', function() {
            homeworkContainer.removeEventListener('mousemove', movvveee);
        });
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};

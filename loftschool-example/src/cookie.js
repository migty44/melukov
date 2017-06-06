/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */

function getCookie () {
    let strkook = document.cookie.split('; ');

    listTable.innerHTML = '';
    strkook.forEach(function(item) {
        strToTable(item);
    });
}

function strToTable (item) {
    let tr = document.createElement('tr');

    item = item.split('=');
    item.forEach(function(item) {
        let td1 = document.createElement('td');

        td1.innerHTML = item;
        tr.appendChild(td1);
    });
    var button = document.createElement('button');
    let td1 = document.createElement('td');

    button.innerHTML = 'delete';
    button.classList.add('foo');
    tr.appendChild(td1);
    td1.appendChild(button);
    listTable.appendChild(tr);
}

function deleteCookie(name) {
    var date = new Date(0);

    document.cookie = name + '=; expires=' + date.toUTCString();
}

function delCookie () {
    listTable.addEventListener('click', function(e) {
        let targetTag = e.target.tagName.toLowerCase();

        if (targetTag == 'button') {
            let cookid = e.target.parentNode.previousSibling.previousSibling.innerText;
            let stoke = e.target.parentNode.parentNode;

            deleteCookie(cookid);
            listTable.removeChild(stoke);
        }
    });
}

function createCookie(name, value) {
    document.cookie = name + '=' + value;
}

function emulateClick(target, event) {
    event = new Event(event);

    target.dispatchEvent(event);
}

let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

getCookie();
delCookie();

filterNameInput.addEventListener('keyup', function() {
    let valInp = filterNameInput.value;
    let strkook = document.cookie.split('; ');

    listTable.innerHTML = '';
    strkook.forEach(function(item) {
        if ( ~ item.indexOf(valInp)) {
            strToTable(item);
        }
    });
});

addButton.addEventListener('click', () => {
    let name = addNameInput.value;
    let value = addValueInput.value;

    if (name != '' && value != '') {
        createCookie(name, value);
        emulateClick(filterNameInput, 'keyup');
    }
});

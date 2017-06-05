/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
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
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {

	var src = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

	function userCompare(a, b) {
	  var r = 0;

	  if (a.name > b.name) { r = 1; }
	  if (a.name < b.name) { r = -1; }

	  return r;
	}

	return new Promise(function(resolve, reject) {

		var xhr = new XMLHttpRequest();
		xhr.open('GET', src);
		xhr.responseType = 'json';
		xhr.send();


		if (xhr.status > 399) {
			reject();
		}

		/*

		xhr.timeout = 3000;
		xhr.ontimeout = function() {
		  alert( 'Извините, запрос превысил максимальное время' );
		}


		xhr.addEventListener('error', function() {
			reject();

		}); 

		*/

		xhr.addEventListener('load', function() {
			var arr = xhr.response;
			arr.sort(userCompare);

			resolve(arr);
		});
	})
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
	
	if( ~ full.toLowerCase().indexOf(chunk.toLowerCase())) {

		// если не найдено то -1, о даст фолс при приведении а любой другое число даст тру
		// если найдено то вернет позицию вхождения
		// таким образом тут будет код при успехе выполнен

		return true;

	} else {
		
		return false;
	}

}

function searchel(arr) {

	console.log('arr = ' + arr);

	loadingBlock.style.display = 'none';
	filterBlock.style.display = 'block';

	filterInput.addEventListener('keyup', function(e) {


		filterResult.innerHTML = '';

		let inpVal = this.value.toLowerCase()

		if (inpVal !== '') {

			let keykode = String.fromCharCode(e.keyCode).toLowerCase();	

			for (let i=0; i < arr.length; i++) {

				let fullname = arr[i].name;

				if (isMatching(fullname, inpVal)) { 
					let div = document.createElement('div');
					div.innerHTML = fullname;
					filterResult.appendChild(div);
				}
			}
		}
	});
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise = loadTowns();


townsPromise
	.then(
		searchel,
		function() {

			let butt = document.createElement('button');
			butt.innerHTML = 'Повторить';

			homeworkContainer.appendChild(butt);

			loadingBlock.innerHTML = 'Не удалось загрузить города';

			butt.addEventListener('click', function() {

				homeworkContainer.removeChild(butt);
				loadingBlock.innerHTML = 'Загрузка';
				let townsPromise = loadTowns();
				townsPromise.then(searchel);
			})
		}
	);


export {
    loadTowns,
    isMatching
};

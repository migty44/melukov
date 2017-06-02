/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {

	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve(); // просто переведет промис в состояние успешно
		}, seconds*1000);
	})
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {

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
		xhr.addEventListener('load', function() {
			var arr = xhr.response; //responseText если получаем обычный текстовый файл
			// resolve(JSON.parse(arr));
			arr.sort(userCompare);

			resolve(arr);
		});

		// массив каждый имеет метод sort - им и делаем - смотри слайд 

		// любый веб сервер всегда присылает текст кроме бинарных форматов
	})
}

export {
    delayPromise,
    loadAndSortTowns
};

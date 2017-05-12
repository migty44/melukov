/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {

	if (array.length == 0 || !Array.isArray(array)) {
		throw new Error('empty array');
	}

	if (typeof fn != 'function') {
		throw new Error('fn is not a function');
	}

	try {
		for (var i=0; i<array.length; i++) {
			if (!fn(array[i])) {
				return false;
			}
		}

	}catch(e) {

		console.log(e.message);
	}

	return true;

}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {

	if (array.length == 0 || !Array.isArray(array)) {
		throw new Error('empty array');
	}

	if (typeof fn != 'function') {
		throw new Error('fn is not a function');
	}

	try {
		for (var i=0; i<array.length; i++) {
			if (fn(array[i])) {
				return true;
			}
		}
	}catch(e) {
		console.log(e.message);
	}

	return false;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {

	var resultt = [];

	if (typeof fn != 'function') {
		throw new Error('fn is not a function');
	}
	
	for (var i=1; i<arguments.length; i++) {
		try{
			fn(arguments[i]);
		}catch(e) {
			resultt.push(arguments[i]);
			console.log(e.message);
		}   	
    }

    return resultt;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator() {

	var number = number || 0;

	try {
		if (typeof number != 'number') {
			throw new Error('number is not a number');
		}
	}catch(e) {
		console.log(e.message);
	}

	var uuu = {
		sum: function() {

			for (var i=0; i<arguments.length; i++) {
				number += arguments[i];
			}

			return number;
		},
		dif: function() {
			var sum = 0;

			for (var i=0; i<arguments.length; i++) {
				sum += arguments[i];
			}

			return number - sum;
		},
		div: function() {
			var sum = 0;

			try {

				for (var i=0; i<arguments.length; i++) {
					if (arguments[i] == 0) {
						throw new Error('division by 0');
					}
					sum *= arguments[i];
				}
			}catch(e) {
				console.log(e.message);
			}

			return number / sum;
		},
		mul: function() {
			var sum = 0;

			for (var i=0; i<arguments.length; i++) {
				sum *= arguments[i];
			}

			return number * sum;
		}

	};

	return uuu;
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};

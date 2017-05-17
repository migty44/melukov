/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
	for (var i = 0 ; i < array.length ; i++) {
		fn(array[i], i, array);
	}
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {

    var arrNew = [];

    for (var i = 0 ; i < array.length ; i++) {

            arrNew[i] = fn(array[i], i, array);
            
    }

    return arrNew;

}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {


    if (initial) {

        var pre = initial;
        var i = 0;

    }else{

        var pre = array[0];
        var i = 1;
          
    }
    

    for ( i ; i < array.length ; i++) {
        pre = fn( pre, array[i], i, array);
    }

    return pre;

}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {

    var arr = [];

    for (var prop in obj) {

        arr.push(prop.toUpperCase());

    }

    return arr;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {

    var newArr = [];

    if ( from < 0 ) {

        from += array.length;
    }

    if ( to < 0 ) {

        to += array.length;

    }

    if ( ! to ) {

        var to = array.length;

    }

    if ( to < from ) {

        return newArr;

    }

    for (var i = from ; i < to ; i++){

        newArr.push(array[i]);

    }

    return newArr;

}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}


export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target - это 1 элемент который перетаскиваем
 */

var wrappFr = document.getElementById('friends');
var frRight = document.getElementById('friends__right');
var container = document.getElementsByClassName('friends__wrapper')[0];
var saveButton = document.getElementById('saveFrList');
var seachLeft = document.querySelector('#search1 input');
var seachRight = document.querySelector('#search2 input');


/*  пустые массивы с id полного списка и выбранного списка друзей  */
let frIds1 = [],
	frIds2 = [],
    response1;

function setListener(target, evvName, funcName) {
    target.addEventListener(evvName, funcName);
}


function searchFriend() {
    let val = seachLeft.value;
    let response2 = {
        items: []
    };

    wrappFr.innerHTML = '';

    for (let i = 0; i < response1.items.length; i++) {
        let fullName = response1.items[i].first_name + response1.items[i].last_name;

        if (fullName.toLowerCase().indexOf(val) != -1) {
            response2.items.push(response1.items[i]);
        }
    }
    friends.innerHTML = templateFn(response2);
}

function searchFriendRight() {
    let val = seachRight.value;

    console.log(val);
    let response2 = {
        items: []
    };

    frRight.innerHTML = '';

    for (let i = 0; i < frIds2.length; i++) {
                
        for (let vv = 0; vv < response1.items.length; vv++) {

            if (frIds2[i] == response1.items[vv].id){

                let fullName = response1.items[vv].first_name + response1.items[vv].last_name;

                if (fullName.toLowerCase().indexOf(val) != -1) {
                    response2.items.push(response1.items[vv]);
                }

            }
        }
    }

    frRight.innerHTML = templateFn(response2);
}

/* функция удаляет сохраненных друзей в массиве и левой колонке */
function deleteFromAll() {
    var arrjLocal = JSON.parse(localStorage.savedFriends); // массив сохраненных айдишников

    for (let f = 0; f < arrjLocal.length ; f++) {
            let target = wrappFr.querySelector('[data-vkid="' + arrjLocal[f] + '"]');
            retIds(arrjLocal[f], frIds1, frIds2);
            replaceNode(target, wrappFr, frRight);
    }
}


/*  функция возвращает массив с айдишниками наших друзей, полученных из глоб объекта VK */
function saveIds(response) {
	let arr1 = [];

	for (let i = 0; i < response.items.length; i++) {
		arr1.push(response.items[i].id);
	}

	return arr1;
}
/*  функция удаляет айдишник из первого массива и добавляет во второй  */
function retIds(thisID, arr1, arr2) {
	arr2.push(thisID);
	arr1.splice(arr2.indexOf('thisID'), 1);
}

/*  рекурсивная функция поиска родительского контейнера по классу  */
function parenttop(target, parentClass) {
    if (target.className !== parentClass) {
        target = target.parentNode;
        return parenttop(target, parentClass);
    } else {
        return target;
    }
}

/*  функция переносит узлы из одного родителя в другой  */
function replaceNode(target, blok1, block2) {
    let newTarget = copyFriends(target);

    block2.appendChild(newTarget);
    blok1.removeChild(target);
}

/*  функция переносит узлы из одного родителя перетаскиванием  */
function replaceNodeDrag(target, blok1, block2) {
    let newTarget = copyFriends(target);

    block2.appendChild(newTarget);
    blok1.removeChild(target);
}

/*  функция копирует друга и его содержимое и возвращает новый dom элемент */
function copyFriends(target) {
    let nTarget = target.cloneNode();

    nTarget.innerHTML = target.innerHTML;
    nTarget.style.position = 'static';
    nTarget.style.marginTop = '0';

    if (target.nextElementSibling) target.nextElementSibling.style.marginTop = '0';

    return nTarget;
}

/*  функция сохраняет список друзей JSON*/
function saveFrList(array) {
    if (array.length == 0) {
        alert ('Вначале выберите друзей!');
        return;
    }
    let descr = JSON.stringify(array);
    localStorage.setItem('savedFriends', descr);
    console.log(localStorage.savedFriends);
}


function perenos(event, blok1, block2) {

    let target = parenttop(event.target, 'friend');
    target.style.left = event.pageX - target.offsetWidth / 2 + 'px';
    target.style.top = event.pageY - target.offsetHeight / 2 + 'px';

    var coord2 = block2.getBoundingClientRect();
    var lGr = coord2.left;
    var tGr = coord2.top;
    var elL = parseInt(target.style.left) +100;
    var elT = parseInt(target.style.top) +50;    

    if (elL > lGr && elT > tGr) {
    	retIds(target.dataset.vkid, frIds1, frIds2);
    	replaceNodeDrag(target, blok1, block2);

        container.removeEventListener('mousemove', moove11);
        console.log(frIds2);

        return;
    }


}

function moove11(e) {
    perenos(e, wrappFr, frRight);
}


wrappFr.addEventListener('mousedown', function(e) {

    	if (e.target.className == 'frPlus') {
	    	var target = parenttop(e.target, 'friend');

	    	replaceNode(target, wrappFr, frRight);
	    	retIds(target.dataset.vkid, frIds1, frIds2);

            console.log(frIds2);

	    	return;
	    }

        var zsxsxs = parenttop(e.target, 'friend');

        zsxsxs.style.position = 'absolute';
        zsxsxs.style.zIndex = 1000;
        zsxsxs.nextElementSibling.style.marginTop = window.getComputedStyle(zsxsxs).height;

        container.addEventListener('mousemove', moove11);

        zsxsxs.addEventListener('mouseup', function() {
            container.removeEventListener('mousemove', moove11);
        });

        
});


frRight.addEventListener('click', function(e) {

    if (e.target.className == 'frClose') {
        var target = parenttop(e.target, 'friend');

        console.log (target);

        replaceNode(target, frRight, wrappFr);
        retIds(target.dataset.vkid, frIds2, frIds1);

        console.log(frIds2);

        return;
    }

})

saveButton.addEventListener('click', function() {
	saveFrList(frIds2);
})


function vkApi(method, options) {
    if (!options.v) {
        options.v = '5.64';
    }

    return new Promise((resolve, reject) => {
        VK.api(method, options, data => {
            if (data.error) {
                reject(new Error(data.error.error_msg));
            } else {
                resolve(data.response);
            }
        });
    });
}

function vkInit() {
    return new Promise((resolve, reject) => {
        VK.init({
            apiId: 6065330
        });

        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

var template = `
{{#each items}}
    <div class="friend" data-vkid="{{id}}">
        <img src="{{photo_200}}">
        <div class="name">{{first_name}} {{last_name}}</div>
        <div class="frPlus"></div>
        <div class="frClose"></div>
    </div>
{{/each}}
`;
var templateFn = Handlebars.compile(template);

new Promise(resolve => window.onload = resolve)
    .then(() => vkInit())
    .then(() => vkApi('users.get', {name_case: 'gen'})) // метод дай информацию обо мне
    .then(response => {
        headerInfo.textContent = `Друзья ${response[0].first_name} ${response[0].last_name}`;
    })
    .then(() => vkApi('friends.get', {fields: 'photo_200'}))
    .then(response => {
        response1 = response; // переопределим глоб переменную
    	friends.innerHTML = templateFn(response); // загрузка в блок друзей из response
        deleteFromAll(); // синхро блоков по массиву localstorage
    	frIds1 = saveIds(response);
        searchFriendRight();
        setListener(seachLeft, 'keyup', searchFriend);
        setListener(seachRight, 'keyup', searchFriendRight);
        
    })
    .catch(e => alert('Ошибка: ' + e.message));



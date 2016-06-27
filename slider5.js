//Создаем модуль для собственной зоны видимости, чтобы не было
//конфликтов с переменными
(function(){
//Создание слайдера

//Обертка
var numberOfPosition,
	interval,
	time,
	intervalID,
	array = [],
	slides = document.querySelectorAll('ul#mySlider>li'),
	listOfSlides = document.querySelector('ul#mySlider'),
	div = document.createElement('div'); 
div.className = "wrapper";
div.appendChild(listOfSlides);
document.body.appendChild(div);


//Controls
// кнопки-стрелочки, панель с кнопками переключателями
var controls = ["arrowLeft", "arrowRight", "panelForButtons"];
for (var i = 0; i < controls.length; i++) {
	var elementOfControls = document.createElement('div');
	elementOfControls.className = controls[i];
	div.appendChild(elementOfControls);
};

var arrowL = document.querySelector("div.arrowLeft"),
	arrowR = document.querySelector("div.arrowRight"),
	panel = document.querySelector("div.panelForButtons"),
	ulPanel = document.createElement('ul');
for (var i = 0; i < slides.length; i++) {
	var liPanel = document.createElement('li');
	ulPanel.appendChild(liPanel);
};
panel.appendChild(ulPanel); 
var buttons = document.querySelectorAll('div.panelForButtons>ul>li');

// Menu

var ulMenu = document.createElement('ul');
ulMenu.className = "settings";
div.appendChild(ulMenu);

var itemsMenu = ["color", "animation", "direction"],
	textMenu = [
				["Цвет", "Розовый", "Голубой", "Зеленый", "Белый", "Чёрный"],
				["Анимация", "Без анимации", "Исчезновение", "Сдвиг влево"],
				["Направление", "Влево", "Вправо", "Произвольное"]
				],
	idMenu = [
				[, "colorPink", "colorBlue", "colorGreen", "colorWhite", "colorBlack"],
				[, , , ],
				[, "directionLeft", "directionRight", "directionRandom"]
	];

for (var i = 0; i < itemsMenu.length; i++) {

	var liMenu = document.createElement('li');
	liMenu.className = itemsMenu[i];
	ulMenu.appendChild(liMenu);

	for (var j = 0; j < textMenu[i].length; j++) {
		
		var aLiMenu = document.createElement('a');
		aLiMenu.innerHTML = textMenu[i][j];
		if(idMenu[i][j] != undefined) aLiMenu.id = idMenu[i][j];
		liMenu.appendChild(aLiMenu);
	};
};



//Функционал слайдера 

var slider = (function (slds, btns, arr){
	return {
	
	currentSlide:0, // текущий кадр для отбражения - индекс картинки из коллекции
	set: function(image, button) { // установка текущего слайд слайдеру
		for( var i = 0; i < slds.length; i++){
					slds[i].classList.remove("active");
					btns[i].classList.remove("active");
				}
				
				image.className = "active";
				button.className = "active";
	},
	init: function() { // запуск слайда с нулевым индексом
		this.currentSlide = 0;
		this.set(slds[this.currentSlide], btns[this.currentSlide]);
	},
	end: function() { // запуск слайда с последним индексом
		this.currentSlide = slds.length - 1;
		this.set(slds[this.currentSlide], btns[this.currentSlide]);
	},
	left: function() { // крутим на один слайд влево
		this.currentSlide--;
		if(this.currentSlide < 0) this.currentSlide = slds.length - 1;
		this.set(slds[this.currentSlide], btns[this.currentSlide]);
	},
	right: function() { // крутим на один слайд вправо
		this.currentSlide++;
		if(this.currentSlide == slds.length) this.currentSlide = 0;
		this.set(slds[this.currentSlide], btns[this.currentSlide]);		
	},
	random: function(){ // крутим на один слайд рандомно
		if(arr.length == 0){
			for(var i = 0; i < slds.length; i++){
				arr.push(i);
			} 
		}
		var randomNumber = Math.floor(Math.random() * arr.length);
		for(var i = 0; i < arr.length; i++){
			if(randomNumber == i){
				this.currentSlide = arr[i];
				arr.splice(i, 1);
				break;
			}
		}
		this.set(slds[this.currentSlide], btns[this.currentSlide]);
	},
	randomClick: function(){
		this.currentSlide = numberOfPosition;
		this.set(slds[this.currentSlide], btns[this.currentSlide]);
	
	}
};
})(slides, buttons, array);



//Обработчики для кнопочек-стрелочек

var arrLeft = function(){
	clearInterval(intervalID);
	slider.right();
},
	arrRight = function(){
	clearInterval(intervalID);
	slider.left();
};
arrowR.onclick = arrLeft;
arrowL.onclick = arrRight;

//Обработчики для радио-кнопок

var buttonsCollection = document.querySelectorAll('div.panelForButtons>ul>li'),
	//Делаем из коллекции массив, т.к. в коллекции не работают методы массивов
	buttonsArray = Array.prototype.slice.call(buttonsCollection, 0);

for (var i = 0; i < buttonsArray.length; i++){
	buttonsArray[i].onclick = function(event){
		clearInterval(intervalID);
		// получить объект событие.
		// вместо event лучше писать window.event
	  	event = event || window.event;
		// кросс-браузерно получить target получаем элемент на котором
		// произошло событие 
	  	var element = event.target || event.srcElement;
	  	numberOfPosition = buttonsArray.indexOf(element);
	  	slider.randomClick();
	}
}

//Обработчики для изменение цвета поля

function setColor(color, colorLA, colorRA){
	div.id = color;
	arrowL.id = colorLA;
	arrowR.id = colorRA;
}

 var blue = function(){
 	setColor("colorBlue", "BlueLA", "BlueRA");
 	},
 	pink = function(){
 	setColor("colorPink", "", "");
 	},
 	green = function(){
 	setColor("colorGreen", "GreenLA", "GreenRA");
 	},
 	white = function(){
 	setColor("colorWhite", "WhiteBlackLA", "WhiteBlackRA");
 	},
 	black = function(){
 	setColor("colorBlack", "WhiteBlackLA", "WhiteBlackRA");
 	};

colorBlue.onclick = blue;
colorPink.onclick = pink;
colorGreen.onclick = green;
colorWhite.onclick = white;
colorBlack.onclick = black;


//Обработчики для изменения направления

function setDirection(course){
	clearInterval(intervalID);
	sliderTanya(interval, time, course);
}
var drLeft = function(){
	setDirection("left");
	},
	drRight = function(){
	setDirection("right");
	},
	drRandom = function(){
	setDirection("random");
};
directionLeft.onclick = drLeft;
directionRight.onclick = drRight;
directionRandom.onclick = drRandom;

// //Используем кусок (функция coderField) кода из библиотеки для маштабирования изображения с
// //с сохранением пропорций так, чтобы его ширина или высота равнялась
// //ширине или высоте блока. Аналог в css backgraund-size значение cover,
// //но тогда img задается backgraund_ом в css.
// function coderField(){

// 	var field = document.querySelector('ul#mySlider');
	
// 	//Кросс-браузерный код для получения стиля из css. Функция getStyle. 
// 	// getComputedStyle не работает в IE8

// 	function getStyle(elem){
// 		return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
// 	}
	
// 	var heightField = getStyle(field).height;
// 	var widthField = getStyle(field).width;
// 	field.style.position = "relative";
// 	field.style.overflow = "hidden";
// 	var kField = parseInt(heightField) / parseInt(widthField);

	
// 	var img = document.querySelector('ul#mySlider>li.active>img');

// 	img.style.position = "absolute";
// 	var imgHeightReal = img.height;
// 	var imgWidthReal = img.width;
// 	var kImg = img.height / img.width;


// //Сравниваем коэффициенты картинки и поля для определения чего именно 
// //будем брать за 100%
// 	if (kImg <= kField){
// 		img.style.height = "100%";
// 		img.style.width = "auto";
// 		var imgHeightNew = img.height;
// 		var imgWidthNew = img.width;

// 		var differenceForMiddle = (imgWidthNew - parseInt(widthField)) / 2;
// 		img.style.left = - differenceForMiddle + "px";
				
// 	}
// 	else{
// 		img.style.height = "auto";
// 		img.style.width = "100%";
// 		imgHeightNew = img.height;
// 		imgWidthNew = img.width;
// 		var differenceForMiddle = (imgHeightNew - parseInt(heightField)) / 2;
// 		img.style.top = - differenceForMiddle + "px";
// 		};
// }


//timeOfInterval - интервал между сладами
//allTime - общее время показа слайдов
//direction - направление движения

function sliderTanya(timeOfInterval, allTime, direction){
	interval = timeOfInterval;
	time = allTime;
	if(direction == "right") slider.init();
	if(direction == "left") slider.end();
	
	intervalID = setInterval(function() { // ставим интервал для перелистывания картинок
		if(direction == "right") slider.right();
		if(direction == "left") slider.left();
		if(direction == "random") slider.random();
		//coderField();
	},timeOfInterval);
	setTimeout(function(){
		clearInterval(intervalID);
 	}, allTime);
}	


window.onload = function() { // запуск слайдера после загрузки документа

sliderTanya(2000, 20000, "random");
	
	
};//закрываем window.onload
})();//закрываем модуль





(function(exports) {

	var fld = document.querySelector('#mySlider');
	console.log(fld);

	var img = document.querySelector('ul#mySlider>li.active>img');
	console.log(img);
	//document.querySelector('ul#mySlider>li.active>img');

	function coderField(field, image){


	//Кросс-браузерный код для получения стиля из css. Функция getStyle. 
	// getComputedStyle не работает в IE8

	function getStyle(elem){
		if (window.getComputedStyle){
			return getComputedStyle(elem, "");
		} else { 
			return elem.currentStyle;
		}
	}
	
	var heightField = getStyle(field).height;
	var widthField = getStyle(field).width;
	field.style.position = "relative";
	field.style.overflow = "hidden";
	var kField = parseInt(heightField) / parseInt(widthField);

	//alert(image);
	image.style.position = "absolute";
	var imgHeightReal = image.height;
	var imgWidthReal = image.width;
	var kImg = image.height / image.width;


//Сравниваем коэффициенты картинки и поля для определения чего именно 
//будем брать за 100%
	if (kImg <= kField){
		image.style.height = "100%";
		image.style.width = "auto";
		var imgHeightNew = image.height;
		var imgWidthNew = image.width;

		var differenceForMiddle = (imgWidthNew - parseInt(widthField)) / 2;
		image.style.left = - differenceForMiddle + "px";
				
	}
	else{
		image.style.height = "auto";
		image.style.width = "100%";
		imgHeightNew = image.height;
		imgWidthNew = image.width;
		var differenceForMiddle = (imgHeightNew - parseInt(heightField)) / 2;
		image.style.top = - differenceForMiddle + "px";
		};
}
exports.coderField = function() {
	var img = document.querySelector('ul#mySlider>li.active>img');
	coderField(fld, img);

};
coderField(fld, img);
// setInterval(function() {
// 			window.coderField();
// 		}, 1);
//Заморочка с флагами из-за того что браузерное событие onresize  
//2 раза вызывает действие, на которое подписано. Это баг.
	var flag = true;
	window.onresize = function(){
		if(flag){
			var heightFieldNew = getStyle(fld).height;
			var widthFieldNew = getStyle(fld).width;

			if( heightField != heightFieldNew || widthField != widthFieldNew){
				coderField(fld, img);

			}
			flag = false;
		} else flag = true;
		
	}
	
	
})(window);
	
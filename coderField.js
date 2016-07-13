(function(w) {

	w.coderField = function(field, image){

	//Кросс-браузерный код для получения стиля из css. Функция getStyle. 
	// getComputedStyle не работает в IE8

		function getStyle(elem){
			if (w.getComputedStyle){
				return getComputedStyle(elem, "");
			} else { 
				return elem.currentStyle;
			}
		}

		var heightField = getStyle(field).height,
			widthField = getStyle(field).width;

		function coderFieldBase(){



			field.style.position = "relative";
			field.style.overflow = "hidden";
			var kField = parseInt(heightField) / parseInt(widthField);

			//alert(image);
			image.style.position = "absolute";
			var imgHeightReal = getStyle(image).height;
			var imgWidthReal = getStyle(image).width;
			var kImg = parseInt(imgHeightReal) / parseInt(imgWidthReal);
			


			//Сравниваем коэффициенты картинки и поля для определения чего именно 
			//будем брать за 100%
			if (kImg <= kField){
				image.style.height = "100%";
				image.style.width = "auto";
				var imgHeightNew = getStyle(image).height;
				var imgWidthNew = getStyle(image).width;
				console.log( "imgHeightNew" + imgHeightNew);

				var differenceForMiddle = (parseInt(imgWidthNew) - parseInt(widthField)) / 2;
				image.style.left = - differenceForMiddle + "px";
				console.log("image.style.left " + image.style.left);
						
			}
			else{
				image.style.height = "auto";
				image.style.width = "100%";
				imgHeightNew = getStyle(image).height;
				imgWidthNew = getStyle(image).width;
				var differenceForMiddle = (parseInt(imgHeightNew) - parseInt(heightField)) / 2;
				image.style.top = - differenceForMiddle + "px";
				console.log("image.style.top " + image.style.top);
			};
		}

//init
		coderFieldBase();


		//Заморочка с флагами из-за того что браузерное событие onresize  
		//2 раза вызывает действие, на которое подписано. Это баг.
		var flag = true;
		w.onresize = function(){
			if(flag){
				var heightFieldNew = getStyle(field).height,
					widthFieldNew = getStyle(field).width;

				if( heightField != heightFieldNew || widthField != widthFieldNew){
					coderFieldBase();

				}
				flag = false;
			} else flag = true;
			
		}
	}	
})(window);

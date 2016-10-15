var checkValue = function () {
	var oText = document.getElementById("text");
	var value = oText.value.trim();
	var reg = /^[0-9]+$/;
	if (reg.test(value)) {
		return value;
	} else {
		alert("Pleas enter a number");
		return false;
	}
}


var numb = [];
var rendertNumberArry = function () {
	var	oContent = document.getElementById("content");
	var txt = "";

	oContent.innerHTML = "";
	txt = "";
	for (var i=0; i<numb.length; i++) {
		txt += "<div>"+ numb[i] + "</div>"
	}
	oContent.innerHTML = txt;
}




var btnClick = function () {
	var oLi = document.getElementById("li"),
		oRi = document.getElementById("ri"),
		oLo = document.getElementById("lo"),
		oRo = document.getElementById("ro");	

	oLi.addEventListener("click", function () {
		if (checkValue() === false) return;
		numb.unshift(checkValue());
		rendertNumberArry();
	})
	oRi.addEventListener("click", function () {
		if (checkValue() === false) return;
		numb.push(checkValue());
		rendertNumberArry();
	})
	oLo.addEventListener("click", function () {
		if (numb.length === 0){
			alert("empty!")
		} else {
			alert(numb.shift())
		}
		
		rendertNumberArry();
	})
	oRo.addEventListener("click", function () {
		console.log(numb)
		if (numb.length === 0){
			alert("empty!")
		} else {
			alert(numb.pop())
		}
		rendertNumberArry();
	})

	var content = document.getElementById("content");

	content.addEventListener("click", function (e) {
		for (var i=0; i<content.getElementsByTagName("div").length; i++) {
			if (e.target === content.getElementsByTagName("div")[i]) {
				
				numb.splice(i,1);
				rendertNumberArry();
			}
		}	
	})
}

btnClick();




















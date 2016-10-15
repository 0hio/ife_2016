var Tabinsert = function (input, output, button) {
	var _this = this;
	//定义需要的变量
	this.arr = [];

	this.content = document.getElementById(output);
	this.Taginput = document.getElementById(input);
	this.btn = document.getElementById(button) || "";

	if (this.btn) {
		this.btn.onclick = function () {
			_this.handleArr();
			_this.Taginput.value = "";
		}
	} else {
		this.Taginput.onkeydown = function (e) {
			var key = e.keyCode;
			if (key === 32 || key === 59 || key === 188) {
				_this.handleArr();			
				_this.Taginput.onkeyup = function (e) {
					var key = e.keyCode;
					if (key === 32 || key === 59 || key === 188) {
						_this.Taginput.value = "";
					}
				}
			}
		}
		this.clickDel();
	}

}

Tabinsert.Fn = Tabinsert.prototype;

//渲染图表； 
Tabinsert.Fn.renderChart = function () {
	this.content.innerHTML = this.arr.map(function (e) {
		return '<span>' +e+ '</span>';
	}).join("");
}

Tabinsert.Fn.handleArr = function () {
	var temp_tagname = this.Taginput.value.trim();

	if (this.btn !== "") {
		temp_tagname = temp_tagname.split(/[,;\n\s$]+/);
	} else {
		temp_tagname = temp_tagname.replace(/[,;\s$]+/, "").split();
	}

	var arr = temp_tagname.filter(function (i) {
		if (i != null && i.length > 0) {
			return true;
		} else {
			return false;
		}
	})

	var tempArr = [];
	tempArr = arr.concat(arr);

	for (let i=0; i<tempArr.length; i++) {	
		if (this.arr.indexOf(tempArr[i]) === -1) {
			this.arr.push(tempArr[i]);
		}
	}

	if (this.arr.length >= 10) {
		var nowLen = this.arr.length - 10;
		for (let i=0; i<nowLen; i++) {
			this.arr.shift();
		}
	}
	
	this.renderChart();
}

Tabinsert.Fn.clickDel = function () {
	_this = this;
	this.content.addEventListener("mouseover", function (e) {
		if (e.target.nodeName === "SPAN") {
			e.target.innerHTML = "Delet:" + e.target.innerHTML;
		}
	});

	this.content.addEventListener("mouseout", function (e) {
		if (e.target.nodeName === "SPAN") {
			e.target.innerHTML = e.target.innerHTML.replace(/[Delet:$]{6}/, "");
		}
	})

	this.content.addEventListener("click", function (e) {
		if (e.target.nodeName === "SPAN") {
			var spanInner = e.target.innerHTML.replace(/[Delet:$]{6}/, "");;
			delete _this.arr[_this.arr.indexOf(spanInner)];
			_this.renderChart(_this.content, _this.arr);
		}
	})
}



var _f00a = new Tabinsert("Tag-up","Tag-up-content");
	
var _f00b = new Tabinsert("Tag-down", "Tag-down-content", "Tag-down-btn")
































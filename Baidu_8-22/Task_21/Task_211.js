var $ = function (elem) {
	return document.querySelector(elem);
}

var Tabinsert = function () {
	var _this = this;
	//定义需要的变量
	this.arrUp = [];
	this.arrDown = [];

	this.UpContent = $("#Tag-up-content");
	this.DownContent = $("#Tag-down-content");

	this.TagUp = $("#Tag-up");
	this.TagDown = $("#Tag-down");

	$("#Tag-down-btn").onclick =  function () {
		_this.handleArr(_this.TagDown, _this.arrDown, _this.DownContent);
		_this.TagDown.value = "";
	}

	this.TagUp.onkeydown = function (e) {
		var key = e.keyCode;
		if (key === 32 || key === 59 || key === 188) {
			_this.handleArr(_this.TagUp, _this.arrUp, _this.UpContent);			
			_this.TagUp.onkeyup = function (e) {
				var key = e.keyCode;
				if (key === 32 || key === 59 || key === 188) {
					_this.TagUp.value = "";
				}
			}
		}
	}

	this.clickDel();
}

Tabinsert.Fn = Tabinsert.prototype;


//渲染图表； 
Tabinsert.Fn.renderChart = function (contentname, arrname) {
	contentname.innerHTML = arrname.map(function (e) {
		return '<span>' +e+ '</span>';
	}).join("");
}

Tabinsert.Fn.handleArr = function (tagname, arrname,contentname) {
	var temp_tagname = tagname.value.trim();

	if (arrname === this.arrDown) {
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
		delete arrname[arrname.indexOf(" ")]
		
		if (arrname.indexOf(tempArr[i]) === -1) {
			arrname.push(tempArr[i]);
		}
	}

	if (arrname.length >= 10) {
		var nowLen = arrname.length - 10;
		for (let i=0; i<nowLen; i++) {
			arrname.shift();
		}
	}
	

	this.renderChart(contentname, arrname);
}

Tabinsert.Fn.clickDel = function () {
	_this = this;
	this.UpContent.addEventListener("mouseover", function (e) {
		if (e.target.nodeName === "SPAN") {
			console.log(e.target.innerHTML)
			e.target.innerHTML = "Delet:" + e.target.innerHTML;

		}
	});

	this.UpContent.addEventListener("mouseout", function (e) {
		if (e.target.nodeName === "SPAN") {
			e.target.innerHTML = e.target.innerHTML.replace(/[Delet:$]{6}/, "");
		}
	})

	this.UpContent.addEventListener("click", function (e) {
		//console.log(e.target.nodeName);
		if (e.target.nodeName === "SPAN") {
			var spanInner = e.target.innerHTML.replace(/[Delet:$]{6}/, "");;
			delete _this.arrUp[_this.arrUp.indexOf(spanInner)];
			_this.renderChart(_this.UpContent, _this.arrUp);
		}
	})
}

var _f00a = new Tabinsert();
	

































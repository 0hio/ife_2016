var $ = function (elem) {
	return document.querySelector(elem);
}


var Queue = function () {
	var _this = this;
	//定义需要的变量
	this.arr = [];
	this.content = $("#content");

	this.oInput = $("#input");
	this.sTextInput = $("#text-input");
	this.sTextSearch = $("#text-search");
	this.oSearch = $("#search");

	this.oInput.onclick =  function () {
		_this.insertDiv();
		_this.sTextInput.value = "";
	}

	this.oSearch.onclick = function () {
		_this.searchDiv();
	}
	
	
}
Queue.Fn = Queue.prototype;

Queue.Fn.insertDiv = function () {
	this.arr = [];
	var reg = /[^0-9a-zA-Z\u4e00-\u9fa5$]+/;
	this.arr = this.sTextInput.value.split(reg).filter(function (e) {
		if (e !== null && e.length > 0) {
			console.log(e);
			return true;
		} else {
			return false;
		}
	})
	this.renderChart();
}

//渲染图表； 
Queue.Fn.renderChart = function () {
	var	arrLength = this.arr.length;
	var textContent = "";
	for(var i=0; i<arrLength; i++) {
		var div = document.createElement("div");
		div.innerHTML = this.arr[i];
		this.content.appendChild(div);
	}
	

}

Queue.Fn.searchDiv = function () {
	var aDiv = this.content.getElementsByTagName("div"),
		spanTab = ['<span class="select">','</span>'];

	for (var i=0; i<aDiv.length; i++) {
		if (aDiv[i].getElementsByTagName("span") !== 0) {
			Tab1 = aDiv[i].innerHTML.replace(spanTab[0], "");
			Tab2 = Tab1.replace(spanTab[1], "");
			aDiv[i].innerHTML = Tab2;
		}

		if (aDiv[i].innerHTML.search(this.sTextSearch.value) !== -1) {			
			var spanReplace = '<span class="select">' +this.sTextSearch.value+ '</span>',
				str = aDiv[i].innerHTML.replace(this.sTextSearch.value, spanReplace);

			aDiv[i].innerHTML = str;
		}
	}

}



var _f00a = new Queue();
	

































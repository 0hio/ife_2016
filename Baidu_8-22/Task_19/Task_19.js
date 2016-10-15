var $ = function (id) {
	var element = document.getElementById(id);
	return element;
}

var Queue = function () {
	var _this = this;
	//定义需要的变量
	this.arr = [];
	this.content = $("content");

	this.li = $("li");
	this.ri = $("ri");
	this.lo = $("lo");
	this.ro = $("ro");
	this.taxis = $("taxis");

	//给按钮绑上函数
	this.li.onclick = this.ri.onclick = function () {
		_this.addValue(this.value);
	}

	this.lo.onclick = this.ro.onclick = function () {
		_this.deleteValue(this.value);
	}
	
	this.taxis.onclick = function () {
		_this.bubble();
	}

	//根据删除arr的内容来重新渲染，使用鼠标移动来刷新 aDiv 的内容
	this.content.addEventListener("mousemove", function (e) {
		var  aDiv = _this.content.getElementsByTagName("div");
		if (aDiv.length !== 0) { // 如果长度不为 0 说明有div存在
			for (var i=0; i<aDiv.length; i++) {
				aDiv[i].index = i;
				//给每个aDiv绑上 删除用的函数。 利用每个aDiv的 index属性绑定
				aDiv[i].onclick = function () {
					_this.arr.splice(this.index, 1);
					// 删除后 渲染
					_this.renderChart();
				}
			}
		}
		
	})
	
}
Queue.Fn = Queue.prototype;

// 通过 定义正则 匹配用户输入的内容，之后返回转换后的变量；
Queue.Fn.checkValue = function () {
	var reg = /^[0-9]+$/g,
		sText = $("text").value.trim(),
		result = reg.test(sText);

	if (result && parseInt(sText) >= 10 && 
			parseInt(sText) <= 100) {
		return parseInt(sText);
	} else if (result) {
		alert("Please enter 10-100.")
		return;
	} else {
		alert("Please enter number.")
		return;
	}

}
//获取 checkValue方法返回的变量，判断按钮的值，分别使用不同的方法添加数值；
Queue.Fn.addValue = function (this_value) {
	
	if (this.checkValue() === undefined) {
		return;
	} else if (this.arr.length === 60) {
		alert("Arry length can't exceed 60.");
		return;
	}

	if (this_value === "Left-in") {
		this.arr.unshift(this.checkValue());
		this.renderChart();
	} else if (this_value === "Right-in") {
		this.arr.push(this.checkValue());
		this.renderChart();
	}
	//console.log(this.arr);
}

//传入 按钮的值，根据值来使用不同的方法；
Queue.Fn.deleteValue = function (this_value) {
	if (this.arr.length === 0) {
		alert("Arry is empty");
		return;
	} 
	if (this_value === "Left-out") {
		alert(this.arr.shift());
		this.renderChart();
	} else if (this_value === "Right-out") {
		alert(this.arr.pop());
		this.renderChart();
	}
	console.log(this.arr);
}


//渲染图表； 根据arr内容来给每个 新建的div定义高度，最后添加到content中；
Queue.Fn.renderChart = function () {
	var content = $("content"),
		arrLength = this.arr.length;
	content.innerHTML = "";

	var textContent = "";
	for(var i=0; i<arrLength; i++) {
		textContent += '<div style="height: ' +this.arr[i]+ 'px"></div>'
	}
	content.innerHTML = textContent;

}

//定义算法所需变量
Queue.Fn.bubble = function () {
	this.bubble.len = this.arr.length,
	_this = this;
	this.bubble.i = 0,
	this.bubble.j = 0,
	this.bubble.temp;
	
	this.bubble.clear = null;
	this.bubble.clear = setInterval(function () {
		_this.run();
		}, 50)
}


Queue.Fn.run = function () {
	
	if (this.bubble.i < this.bubble.len) {
		if (this.bubble.j < this.bubble.len - this.bubble.i - 1) {
			if (this.arr[this.bubble.j] > this.arr[this.bubble.j+1]) {
				this.bubble.temp = this.arr[this.bubble.j];
				this.arr[this.bubble.j] = this.arr[this.bubble.j+1];
				this.arr[this.bubble.j+1] = this.bubble.temp;
				this.classToNull();
				this.renderChart();
				this.aDiv[this.bubble.j+1].className = "active";

			}
			this.bubble.j += 1;
			return;
		} else {
			this.bubble.j = 0;
		}
		this.bubble.i += 1;
	} else {
		this.classToNull();
		clearInterval(this.bubble.clear);
	}
	
}

//把aDiv中所有元素的class变成 空；
Queue.Fn.classToNull = function () {
	this.arrLen = this.arr.length;
	this.aDiv = this.content.getElementsByTagName("div");

	for (let i=0; i<this.arrLen; i++) {
		this.aDiv[i].className = "";
	}
}


var b = new Queue();
	

































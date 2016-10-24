$ = function (elem) {
	return document.querySelectorAll(elem);
}
var a_btn = $("#btn input"),
	a_root = $(".root")[0],
	divList = [];

a_btn[0].onclick = function () {
	btnSwitch();
	preOrder(a_root);
	changeClass(this);

}

a_btn[1].onclick = function () {
	btnSwitch();
	inOrder(a_root);
	changeClass();
}

a_btn[2].onclick = function () {
	btnSwitch();
	postOrder(a_root);
	changeClass();
}


function preOrder(node) {
	if (node != null) {
		divList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild)
	}
}

function inOrder (node) {
	if (node != null) {
		inOrder(node.firstElementChild);
		divList.push(node);
		inOrder(node.lastElementChild);
	}
}

function postOrder (node) {
	if (node != null) {
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		divList.push(node);
	}
}

function changeClass () {
	var i = 0;
	timer = setInterval(function () {
		if (i < divList.length) {
			if (i>=1) {
				divList[i-1].style.background = "#FFF";
			}
			
			divList[i].style.background = "#D9544F";


			i++;
		} else {
			divList[i-1].style.background = "#FFF";
			console.log(divList);
			clearInterval(timer);
			btnSwitch();
			divList = [];
		}
	}, 500)
}


function btnSwitch () {
	if (a_btn[0].disabled === false) {
	 	[].map.call(a_btn, function (btn) {
			btn.disabled = true;
			return btn;
 		})
	} else {
	 	[].map.call(a_btn, function (btn) {
			btn.disabled = false;
			return btn;
	 	})
	}
}




































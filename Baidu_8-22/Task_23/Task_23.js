$ = function (ele) {
	return document.querySelectorAll(ele);
}

function depth (node, list) {
	if (node) {
		list.push(node);
		for (var i=0; i<node.children.length; i++) {
			depth(node.children[i], list);
		}
	}
}

function breadth (node, list) {
	if (node) {
		list.push(node);
		breadth(node.nextElementSibling, list);
		node = list[BFindex++].firstElementChild;
		breadth(node, list);
	}
}


function changeClass (list, beSearch, locked) {
	var i = 0,
		btn = $("#btn input");
	console.log(list.length);
	lockedBtn(locked);

	timer = setInterval(function () {
		if (i < list.length) {

			for (let j=0; j<list.length; j++) {
				if (j !== i) {
					list[j].style.background = "#FFF";
				}
			}
			
			if (beSearch === true) {
				if (btn[2].value.trim() === 
					list[i].childNodes[0].nodeValue.trim() ) {
				list[i].style.background = "red";
				clearInterval(timer);
				beSearch = false;
				locked = false;
				lockedBtn(locked);
				return ;
				}
			}
		
			list[i].style.background = "#FF6C6C";
			i++;
		} else {

			for (let j=0; j<list.length; j++) {		
				list[j].style.background = "#FFF";
			}
			clearInterval(timer);
			if (beSearch === true) {
				alert("The text was't found.");
				beSearch = false;
			}

			locked = false;
			lockedBtn(locked);
		}
	}, 500)
}

function lockedBtn (locked) {
	if (locked === true) {
		for (let i=0; i<btn.length; i++) {
			btn[i].disabled = true;
		}
	} else {
		for (let i=0; i<btn.length; i++) {
			btn[i].disabled = false;
		}
	}
}


var BFindex = 0;
(function () {
	var root_node = $(".root")[0],
		btn = $("#btn input"),
	 	divList = [],
	 	locked = false,
	 	beSearch = false;

	btn[0].onclick = function () {
		depth(root_node, divList);
		locked = true;
		changeClass(divList, beSearch, locked);
		divList = []
	};

	btn[1].onclick = function () {
		breadth(root_node, divList);
		locked =  true;
		changeClass(divList, beSearch, locked);
		BFindex = 0;
		divList = []
	}

	btn[3].onclick = function () {
		depth(root_node, divList);
		beSearch = locked = true;
		changeClass(divList, beSearch, locked);
		divList = []
	}

	btn[4].onclick = function () {
		breadth(root_node, divList);
		beSearch = locked = true;
		changeClass(divList, beSearch, locked);
		BFindex = 0;
		divList = []
	}
}) ()





















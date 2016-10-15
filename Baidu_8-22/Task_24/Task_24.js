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
		//BFindex 广度遍历中很重要的一步;必须用全局变量;
		node = list[BFindex++].firstElementChild;
		breadth(node, list);
	}
}

function changeClass (list, text) {
	var i = 0,
		btn = $("#btn input"),
		len = list.length;
	console.log(list)
	for (let i=0; i<len; i++) {
		list[i].style.background = "#FFF";
	}

	timer = setInterval(function () {
		if (i < len) {			
			//只有在函数有 text 传入时才执行;
			if (text === list[i].childNodes[0].nodeValue.trim()
				&& text.length !== 0) {

				// 防止搜索 根节点时出错；
				if (i !== 0) {
					list[i-1].style.background = "#FFF";
				}
				list[i].style.background = "red";
				clearInterval(timer);
				lockedBtn();
				return ;
			}
			
			list[i].style.background = "#FF6C6C";
			if (i >= 1) {
				list[i-1].style.background = "#FFF";
				}
			i++;
		} else {
			list[i-1].style.background = "#FFF";
			if (text) {
				alert("That node can't found.")
			}
			clearInterval(timer);
			lockedBtn();
		}
	}, 50)
}

function lockedBtn (locked) {
	Array.prototype.forEach.call($("#btn input"), function (input) {
		if (locked === true) {
			input.disabled = true;
		} else {
			input.disabled = false;
		}
	})
}


function traverse (index) {
	var list = [],
		root_node = $(".root")[0],
		text = $("#btn input")[2].value.trim();
	BFindex = 0;
	switch(index) {
		case 0: 
			depth(root_node, list);
			text = "";
			changeClass(list, text);
			break;
		case 1: 
			breadth(root_node, list);
			text = "";
			changeClass(list, text);
			break;
		case 3:
			depth(root_node, list);
			changeClass(list, text);
			break;	
		case 4:
			breadth(root_node, list);
			changeClass(list, text);
			break;
		case 5:
			selectedDiv.remove();
		 	break;
		case 7:
			insertNode();
			break;
	}
	
	
}

var BFindex = 0,
	selectedDiv;
(function init () {
	var btn = $("#btn input");
	for (let i=0; i<btn.length; i++) {
		if (btn[i].getAttribute("type") === "button") {
			btn[i].onclick = function () {
				traverse(i);
				//点击遍历过的按钮后,锁定;
				//lockedBtn(true);
			}

		}
	}
	selector();
	
}) ();




// 试着用返回 变量;  尽量少用全局变量;
function selector () {
	var allNodes = $("div")[0].getElementsByTagName("div");
	Array.prototype.forEach.call(allNodes, function (div) {

		div.addEventListener("click", function (event) {
			if (selectedDiv) {
				selectedDiv.style.background = "#FFF";
			}
			event.stopPropagation();
			div.style.background = "green";
			selectedDiv = div;

		})
	})
	
}

function insertNode () {
	var oDiv = document.createElement("div");
	oDiv.innerHTML = $("#btn input")[6].value.trim();
	selectedDiv.appendChild(oDiv);
	selector();
}


















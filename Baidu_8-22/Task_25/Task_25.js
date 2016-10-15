$ = function (ele) {
	return document.querySelectorAll(ele);
}

function forEach(list, func) {
	// 使用 call 继承方法;
	return Array.prototype.forEach.call(list, func);
}

function depth (node, list) {
	if (node && node.nodeName === "DIV") {

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
		node = list[BFindex++].firstElementChild
		breadth(node, list);	
	}
}
// 处理点击事件;
function clickHandle () {
	var wrap = $("#wrap")[0];
	wrap.addEventListener("click", function (e) {
		//提取需要的 属性,便于使用
		var nodeParent = e.target.parentElement.parentElement,
			nodeChildren = e.target.parentElement.children;
		//通过点击的标签内的字符判断,并执行相应的函数;
		switch (e.target.innerHTML) {
			// 字符,  显示"ˇˇˇˇ "表示展开,将其 DIV 隐藏, 字符改为 ">>> "
			case "ˇˇˇˇ ":
				forEach(nodeChildren, function (div) {
					if (div.nodeName === "DIV") {
						div.style.display = "none";
						e.target.innerHTML = ">>> ";
					}
				})
				break;
			// 删除. 
			case "×":
				//  需要临时 使用被删除节点的 父父父元素,应为删除后的值为null;而存下来后就没这个问题;
				var temp = nodeParent.parentElement;
				nodeParent.parentElement.removeChild(nodeParent);
				// 子节点少于2个, 显示 为 ">>> "
				if (temp.children.length <= 2) {
					temp.children[0].innerHTML = ">>> ";
				}

				break;
			// 添加; 
			case "+":
				(function () {
					nodeName = prompt("Enter this node name").trim();
					//如果弹出窗口却没有输入的话,则为 null;
					if (nodeName == null || nodeName.length === 0) {return};
					//需要在 nodeName 两端添加 \n 这样才符合 html内的格式;便于正则查找;
					var divInner = "<div><span>>>> </span><span>\n"+ nodeName 
					+'\n<span class="add">+</span><span class="del">×</span></span></div>';
					nodeParent.innerHTML = nodeParent.innerHTML+ divInner;
					//添加后,将其父元素的第一个子节点(展开/隐藏)按钮变成 展开;
					nodeParent.children[0].innerHTML = "ˇˇˇˇ "
				}) ()
				break;
			case "&gt;&gt;&gt; ":
				forEach(nodeChildren, function (div) {
					if (div.nodeName === "DIV") {
						// 将 nodeName 为DIV的 节点 展开,之后 字符串变为 "ˇˇˇˇ ";
						div.style.display = "block";
						e.target.innerHTML = "ˇˇˇˇ ";
					}
				})
				break;
		}
	})
}

function searchNode() {
	var searchText = $(".btn input")[0].value;
	// 开始下一次查找时,还原之前查找过的节点;
	forEach($(".found"), function (node) {
		node.className = "";
	})
	//遍历
	breadth(layOut, list);
	//在遍历出来的所有节点中筛选出 DIV;
	var divList = list.filter(function(div) {
		if (div.nodeName === "DIV") {
			return true;
		} else {
			return false;
		}
	});
	// 将根节点 显示为展开;
	forEach($(".layout-1"), function (div) {
		div.firstElementChild.innerHTML = "ˇˇˇˇ "
	});
	forEach(divList, function (div) {
		// 正则, 匹配 两个回车之间的字符串 但不包括两个回车;
		// 一开始的 /[^\n].*[^\n]/ 不能匹配到 单一个字符.... 在第二空格后添加 ? 就可以匹配了; 
		var spanText = div.children[1].innerHTML.match(/[^\n].*[^\n]?/)[0];//div.children[1].innerText;
		console.log(spanText);
		// 查找过的 div 显示为展开;
		div.style.display = "block";
		//有子节点的 显示为展开;
		if (div.children.length > 2) {
			div.children[0].innerText = "ˇˇˇˇ ";
		}
		
		if (spanText === searchText) {
			div.children[1].className = "found";
		}

	});
	//每次 查找后都要清空;
	list = [];
	divList = [];
	BFindex = 0;
}


var btn = $(".btn input"),
	layOut = $(".layout-1")[0],
	list = [];
var BFindex = 0;

clickHandle();
$(".btn input")[1].onclick = searchNode;


// html的 树结构很重要,这次,明显没弄好,有点复杂;























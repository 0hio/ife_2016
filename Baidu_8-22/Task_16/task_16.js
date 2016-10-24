/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
  * aqiData = {
 *    city: value,
 *    city: value
 * };
 */
var oAci = document.getElementById("aqi-city-input"),
	oAvi = document.getElementById("aqi-value-input"),
	oAbtn = document.getElementById("add-btn"),
	oTable = document.getElementById("aqi-table");

var aqiData = {};


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */


function addAqiData() {


	var oCityName = oAci.value.trim();
	var oCityQair = oAvi.value.trim();

	var regName = /^[\u4e00-\u9fa5a-z]+$/ig;
	var regQair = /^[\d]+$/;
	
	if (regName.test(oCityName) === false) {
		alert("Only allows input Chinese or English!")
		return false;
	}

	if (regQair.test(oCityQair) === false) {
		alert("Only allows number input!")
		return false;
	}

	aqiData[oCityName] = oCityQair;
	console.log(aqiData);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    oTable.innerHTML = "";

    if (oTable.children.length === 0) {
    	oTable.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    }

    for (var city in aqiData) {
    	var oTr = document.createElement("tr"),
    		otd1 = document.createElement("td"),
    		otd2 = document.createElement("td"),
    		otd3 = document.createElement("td");

    	otd1.innerHTML = city;
    	otd2.innerHTML = aqiData[city];
    	otd3.innerHTML = "<a href='javascript:;' class='del'>Delete</a>";
    	oTr.appendChild(otd1);
    	oTr.appendChild(otd2);
    	oTr.appendChild(otd3);
    	oTable.appendChild(oTr);

    }
}


/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  var parent = target.parentNode.parentNode.firstChild;

  delete aqiData[parent.innerHTML];
  renderAqiList();
}


function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  oAbtn.addEventListener("click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  
  oTable.addEventListener("click", function (e) { 		
 		if (e.target.className === "del") {
 			delBtnHandle(e.target);
 		};
  });

 
}

init();
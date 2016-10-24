/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};


// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var oForm = document.getElementById("aqi-chart-wrap");
  oForm.innerHTML = "";
  var colors = ["#50cc7b", "#8bfcbf" , "#b8807c", "#387371","#c8051e", "#6ec1e3", "#f7cc31", "#a3af78", "#70b2a3"], 
      text="",
      colorsIndex = 0;
  if (pageState.nowGraTime === "day") {
    for (var DataDate in chartData[pageState.nowSelectCity]) {
      currColor = colors[colorsIndex];
      colorsIndex = colorsIndex<(colors.length-1) ? colorsIndex+1 : colorsIndex=0;

      text +=  
            "<div title='" +DataDate+ " 空气质量: " + 
      chartData[pageState.nowSelectCity][DataDate] + "'class='" 
      +pageState.nowGraTime+ "' style='height:"
      +chartData[pageState.nowSelectCity][DataDate]+
      "; background-color:"+currColor+"'> </div>";
      
    }
  }

  if (pageState.nowGraTime === "week") {
    var j = 0;
    var sum = 0;
    var mean = 0;
    var week_sum = 0;
    var mean_final = [];

    for (var i in chartData[pageState.nowSelectCity]) {
      j++;

      sum += chartData[pageState.nowSelectCity][i];
      if (j === 7) {
        week_sum++;
        mean = sum / 7;
        mean_final.push(mean);
        j = 0;
        sum = 0;
      }
    }

    for (var i=0; i<=week_sum; i++) {
      currColor = colors[colorsIndex];
      colorsIndex = colorsIndex<(colors.length-1) ? colorsIndex+1 : colorsIndex=0;
      
      text +=  
            "<div title='第" +(i+1)+ "周平均空气质量: " + 
      mean_final[i] + "'class='" 
      +pageState.nowGraTime+ "' style='height:"
      +mean_final[i]+ "; background-color:"+currColor+"'> </div>";
    }
  }

  if (pageState.nowGraTime === "month") {
    var month = 0,
        day_sum = 0,
        data_sum = 0,
        data_sum_mean = 0,
        month_mean = [];

    for (var i in chartData[pageState.nowSelectCity]) {
      data_sum += chartData[pageState.nowSelectCity][i];
      day_sum++;

      if ((new Date(i)).getMonth() !== month) {    
        month++;
        data_sum_mean = data_sum / day_sum;
        month_mean.push(data_sum_mean);
        day_sum = 0;
        data_sum = 0;
      }      
    }
  //最后一个月的平均数没被添加到数组内
    if (day_sum !== 0) {
          month++;
          data_sum_mean = data_sum / day_sum;
          month_mean.push(data_sum_mean);
      } 

    for (var i=0; i<month_mean.length; i++) { 
      currColor = colors[colorsIndex];
      colorsIndex = colorsIndex<(colors.length-1) ? colorsIndex+1 : colorsIndex=0;
      text +=  
            "<div title='第" +(i+1)+ "月平均空气质量: " + 
      month_mean[i] + "'class='" 
      +pageState.nowGraTime+ "' style='height:"
      +month_mean[i]+ "; background-color:"+currColor+"'> </div>"; 
    };
  }
  oForm.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(GraTime) {

  // 确定是否选项发生了变化 
  if (GraTime === pageState.nowGraTime) return false;
  // 设置对应数据
  pageState.nowGraTime = GraTime;
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(CityName) {
  // 确定是否选项发生了变化 
  if (CityName === pageState.nowSelectCity) return false;
  // 设置对应数据
  pageState.nowSelectCity = CityName;

  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var oFormGraTime = document.getElementById("form-gra-time");
  var aInput = oFormGraTime.getElementsByTagName("input");

  for (var i=0; i<aInput.length; i++) {
    aInput[i].id = aInput[i].value;
    if (aInput[i].checked) {
      pageState.nowGraTime = aInput[i].id;
    }
    aInput[i].onclick = function () {
      graTimeChange(this.id);
    }
  }

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var oCitySelect = document.getElementById("city-select");

  for (var i=0; i<oCitySelect.options.length; i++) {
    oCitySelect[i].id = oCitySelect[i].value;
  }

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  for (var i=0; i<oCitySelect.options.length; i++) {
    oCitySelect.options[i].onclick = function () {
      citySelectChange(this.id);
    }
  }
  
}


/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData[pageState.nowSelectCity] = {};

  for (var aData in aqiSourceData[pageState.nowSelectCity]) {
    chartData[pageState.nowSelectCity][aData] = aqiSourceData[pageState.nowSelectCity][aData];
  }
  
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
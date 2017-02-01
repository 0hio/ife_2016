country = {
	'中国' :	[
	{"province" : "河北省",	
		"district" : ['石家庄','保定市','秦皇岛','唐山市','张家口','廊坊市','衡水市']},
	{"province" : "内蒙古",	
		"district" : ['呼和浩特','呼伦贝尔','包头市','赤峰市','通辽市','乌兰察布','乌兰察布']},
	{"province" : "西藏",	
		"district" : ['拉萨市','阿里']},
	{"province" : "新疆",	
		"district" : ['乌鲁木齐','克拉玛依市']},
	{"province" : "香港特别行政区",	
		"district" : ['香港岛','九龙','新界','新界西']},
	{"province" : "澳门特别行政区",	
		"district" : ['澳门半岛','澳门离岛']},
	{"province" : "陕西省",	
		"district" : ['咸阳市','榆林市','宝鸡市','安康市','商洛市','延安市','渭南市']}
	]
}

var searchStatus = {
	country : $('.item span').eq(0).text(),
	province : $('.item span').eq(1).text(),
	area :　$('.item span').eq(3).text()
}

var renewSearchBar = function () {
	searchStatus = {
	country : $('.item span').eq(0).text(),
	province : $('.item span').eq(1).text(),
	area :　$('.item span').eq(3).text()
	}
}


var loginUi = function () {
	var checked = false;
	$('.X').click(function () {
		$(this).parent().parent().hide()
	})


	$('#login').on('click', function () {
		if ($('#login').text() == '登录') {
			$('.layer_cover').show();
		} else {
			alert('已登出');
			$('#login').text('登录');
		}
	})

	$('input[name="login"]').click(function () {
		$('.input input').each(function(i, val) {
			if ($(val).val().trim() == false) {
				alert('请填写完整!');
				checked = false;
				return false;
			} else {
				log($(this).val())
				checked = true;
			}
		})
		if (checked) {
			$('#login').text('已登录');
			alert('登录成功');
			$('.layer_cover').hide();
		}
	})
}



// 点击选择||hide()

var clickHandle = function () {
	$('.item:not(:last-child)').each(function(i,val){
		$(this).on('click', function (e){

			//不阻止冒泡的话, 也会点击 document,触发下面的事件
			e.stopPropagation()
			$(e.currentTarget).find('.item_select').toggle();

			if (e.target.tagName === "LI") {
				$(e.target).parents().eq(2).find('span').text($(e.target).text());
				renewSearchBar();

				if ($(e.target).parents().eq(2)[0] == $('.item').eq(0)[0]) {
					renderProvince()
				} else if ($(e.target).parents().eq(2)[0] == $('.item').eq(1)[0]) {
					$('.item span').eq(2).text('城市')
					renewSearchBar();
					renderDistrict();
				}
			}
		})
	})

	$(document).on('click', function (e) {
		if ($(e.target).attr('class') != "item") {
			$('.item_select').each(function(i,val) {
				$(this).hide();
			})
		}
	})
}

var renderProvince = function () {
	if ($('.item .item_select').eq(1).find('ul').length != 0) return;

	var provinceUl = $('<ul></ul>');
	$.each(country[searchStatus.country], function () {
		var content = $('<li>'+this.province+'</li>');
		content.appendTo(provinceUl);
	})
	provinceUl.appendTo($('.item .item_select').eq(1))
}


var renderDistrict = function () {
	$('.item_select ul').eq(2).remove()
	var districtUl = $('<ul></ul>');
	$.each(country[searchStatus.country], function (i,val) {

		if (this.province == searchStatus.province) {
			$.each(this.district, function () {
				var content = $('<li>'+this+'</li>')
				content.appendTo(districtUl)
			})
			districtUl.appendTo($('.item .item_select').eq(2))
		}
	})
}


var flipPage = function () {
	var wWall = $('.wordWall');

	var handler = function (i, val) {
		return function () {
			$('.button_1').next().find('li').each(function () {
				$(this).removeClass('curPage')
			})
			wWall.prev().find('span').text('0'+(i+1))
			wWall.css('transform', 'translate('+(i*wWall.find('div').outerWidth())*-1+'px)');
			$(this).addClass('curPage');
			$('.button_1').next().find('li').eq(i).addClass('curPage');
		}
	}

	wWall.next().next().find('li').each(function (i,val) {
		$(this).click(handler(i,val))
	})
	var index = 0,
			temp;
	timer = setInterval(function (){
		index = index < 2 ? ++index : 0;
		temp = handler(index)
		temp();
	}, 2000)

 	$('.layer_6_right').on('mouseenter',function () {
 		clearInterval(timer);
 	}) 

 	$('.layer_6_right').on('mouseleave', function () {
 		timer = setInterval(function (){
			index = index < 2 ? ++index : 0;
			temp = handler(index)
			temp();
		}, 2000)
 	})
}

var slideDown = function () {
	$('.layer_8_left span').each(function () {
		this.height = $(this).prev().height()
		$(this).on('click', function () {
			//点击 还原;
			$('.layer_8_left p').each(function () {
				$(this).height($(this).next()[0].height);
				$(this).next().find('img').css('transform', 'rotate(0deg)')
			})
			if ($(this).prev().height() < 200 && $(this).prev()[0].tagName == "P") {
				$(this).prev().height(200);
				$(this).find('img').css('transform', 'rotate(180deg)');
			} else if ($(this).prev()[0].tagName != "P") {
				alert('根本没有什么更多条款.')
			} else {
				$(this).prev().height(this.height);
				$(this).find('img').css('transform', 'rotate(0deg)')
			} 
		})
	})
}

var formChecked = function ()  {
	var completion;

	$('form input[type="submit"').on('click', function (e) {
		e.preventDefault()
		$('form input[type="text"]').each(function () {
			if ($(this).val().trim().length === 0 
						|| $('textarea').val().trim().length === 0) {
				alert('请输入完整的信息!')
				completion = false;
				return false;
			} else {
				completion = true;
			}
		})
		if (completion) {
				alert('谢谢您的参与!')
		}

	})
	$('input[type="email"]').next().on('click', function () {
		var email = /\w+[@]{1}\w+[.]\w+/
		if (email.test($('input[type="email"]').val())) {
			alert('感谢您的订阅!')
		} else {
			alert('请填入正确的邮箱地址!')
		}
	})
}

var init = function () {

	var countryUl = $('<ul></ul>'),
			navA = $('.nav_right ul li a');
	$.each(country,function (i, val) {
		var content = $('<li>'+i+'</li>')
		content.appendTo(countryUl)
	})
	$('.item_select').eq(0).append(countryUl);

	$('.item').eq(3).click(function () {
		if ($('.item>span').eq(2).text() == '城市') {
			alert('请选择城市!');
		} else {
			alert('对不起,你所选择的城市 "'+$('.item>span').eq(2).text()+
							'" 暂未开放.\n            敬请期待!.');
		}
	})

	$('.layer_7 .button').each(function () {
		new SlowlyMove($(this), $('.layer_1'))
	})
	new SlowlyMove($('.layer_1 input'), $('.layer_3'))
	new SlowlyMove($('footer span+span'), $('.layer_1'))
	new SlowlyMove(navA.eq(0), $('.layer_1'))
	new SlowlyMove(navA.eq(1), $('.layer_4'))
	new SlowlyMove(navA.eq(2), $('.layer_5'))
	new SlowlyMove(navA.eq(3), $('.layer_6'))
	new SlowlyMove(navA.eq(4), $('.layer_8'))

	clickHandle();
	loginUi()
	formChecked()
	flipPage()
	slideDown()
}





$(document).ready(function () {
	init();
})




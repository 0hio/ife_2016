var log = function (val) {
	return console.log(val);
}


var imgUrl = $('.checkBox').find('label').eq(0).css('background-image').concat();

var boxCheck = function () {

	$('.checkBox').find('label').on('click', function (e) {
	var id = $(e.target).attr('for');	
	if ($(e.target).css('background-image') == imgUrl) {
		$(e.target).css('background-image', 'url()');
		render(id, false);

	} else {
		$(e.target).css('background-image', imgUrl);
		render(id, true);
		}
	})

}

var allSelect = function () {
	
	$('.checkBox').next().on('click', function (e) {
		$('.checkBox').find('label').each(function (i,val) {
			$(val).css('background-image', imgUrl);
			render($(val).attr('for'), true);
		})
	})	

}

var render = function (id, YN) {
	if (YN) {
		$('#'+id).show()
	} else {
		$('#'+id).hide()
	}
} 



var FlipPage = function (ulId, area, cols, test) {
	// 前面没有加 var
	// 导致后面传参 一直是最后设置的参数;
	var _this = this;
	this.area = area,
	this.ulId = ulId,
	this.ctrL = this.ulId.parent().find('#leftPage')[0],
	this.ctrR = this.ulId.parent().find('#rightPage')[0],
	this.curPage = this.ulId.parent().find('#curPage'),
	this.index = parseInt(this.curPage.text()) - 1,
	this.moveDis = [],
	this.ulIdLi = this.ulId.find('>li');
	this.marginR = parseInt(this.ulIdLi.eq(0).css('margin-right')),
	this.width = this.ulIdLi.eq(0).outerWidth(),
	this.colWidth = (this.marginR + this.width) * cols;


	for (var i=0; i < this.ulIdLi.length/cols; i++) {
		this.moveDis.push(this.colWidth * i);
	}


	this.area.on('click', function (e) {
		_this.clickHandle(e);

	})
	
}

FlipPage.prototype.clickHandle = function (event) {
	
	switch (event.target) {

		case this.ctrR: 
		this.index = this.index>=this.moveDis.length-1 ? 0 : ++this.index;
		break;

		case this.ctrL: 
		this.index = this.index === 0 ? this.moveDis.length-1 : --this.index;
		break;
	}
	
	this.ulId.css('transform', 'translate('+ -1*(this.moveDis[this.index]) +'px)');
	this.curPage.text(this.index+1);
}




var SlowlyMove = function (Id, target, speed) {
	var _this = this;
	this.id = Id;
	this.target = 
				$(this.id.attr('href')).length != 0 
				? $(this.id.attr('href')) : target;
	this.speed = speed || 20;

log(this.target)

	this.clickHandle = function (event) {
		event.preventDefault();
		var realSpeed;

		_this.start = setInterval(function () {
			var targetTop = Math.ceil(_this.target.offset().top),
					curTop = $(document).scrollTop();

			if (curTop === targetTop) {
				clearInterval(_this.start);
				return;
			}

			if (targetTop > curTop) {
				realSpeed = Math.ceil((targetTop - curTop) / 20);
			} else if (targetTop < curTop) {
				realSpeed = Math.floor((targetTop - curTop) / 20);
			}

			$(document).scrollTop(curTop + realSpeed);
			
		}, _this.speed)
	}

	this.id.click(function (e) {
		_this.clickHandle(e);
	}) 

}


var switchImg = function () {

	var tempClothesImg = [];

	$('.colorClothes>img').each(function(i,val) {
  	tempClothesImg.push(val)
	})
	
	$.each(tempClothesImg, function (i,val) {
		var w = $(val).parents().eq(2).find('a>img').attr('src');
		var q = $(val).attr('src').replace(/^img\//g,'').replace(/\.png$/g,"");
		if (w.search(q) != -1) {
			$(val).addClass('curColor');
		}
	})

	$(".mainClothes").on('click', function (e) {

		$('.colorClothes>img').each(function (i,val) {

			if (e.target === val) {
				$(this).parent().find('img').each(function (i, val) {
					
					$(val).removeClass();
				}) 
				var clickColor = $(val).attr('src').
				replace(/img\//g,'').
				replace(/.png/g, ''),
				changeImg = $(this).parents().eq(2).find('a>img')
				curImgColor = changeImg.attr('src').replace(/^img\/\d-/g,'').replace(/.png$/g,'')
				targetChange = changeImg.attr('src').replace(curImgColor, clickColor)
				
				changeImg.attr('src', targetChange)
				$(this).addClass('curColor')
			}
		})
	})
}

var addUlChild = function () {
	var coreLiMen = $('#menUl').html(),
			coreLiWomen = $('#womenUl').html();

	$('.pagesClothes').each(function (i, val) {

		var copyTimes = $(val).text().match(/[^\s]/g,'')[2];

		$(val).parent().find('>ul').each(function (i, val) {
			for (var i=0; i<copyTimes-1; i++) {
				
				if ($(val).parent().attr('id') == 'men') {
					val.innerHTML += coreLiMen;
				} else {
					val.innerHTML += coreLiWomen;
				}
			}
		})
	})

}
		

$(document).ready(function () {
	var copyClothes = [];

	$('.mainClothes').each(function (i, val) {
		var temp = $(val).clone();
		copyClothes.push(temp);
	})

	boxCheck();
	allSelect();
	switchImg();
	addUlChild()

	var a = new FlipPage($('#menUl'), $('#men'), 3),
			b = new FlipPage($('#womenUl'), $('#women'), 3),
			c = new SlowlyMove($('#clickDown')),
			d = new SlowlyMove($('#send'));
			e = new SlowlyMove($('#toMen'));
})







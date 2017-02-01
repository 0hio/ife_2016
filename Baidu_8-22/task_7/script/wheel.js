var log = function (val) {
	return console.log(val);
}



var SlowlyMove = function (Id, target, speed) {
	var self = this;
	lastTimer = null;
	this.id = Id;
	this.target = 
				$(this.id.attr('href')).length != 0 
				? $(this.id.attr('href')) : target;
	this.timer = null;
	this.speed = speed || 20;

	this.clickHandle = function (event) {
		event.preventDefault();
		var realSpeed;

		self.timer = setInterval(function () {
			var targetTop = Math.ceil(self.target.offset().top),
					curTop = $(document).scrollTop(),
					wdHeight = $(window).height(),    //  当前窗口高度
					bodyHeight = $('body').outerHeight();

			if (wdHeight > bodyHeight - targetTop) {
				if (curTop + wdHeight === bodyHeight) {
					clearInterval(self.timer);
				}
			}

			if (curTop === targetTop) {
				clearInterval(self.timer);
				return;
			}

			if (targetTop > curTop) {
				realSpeed = Math.ceil((targetTop - curTop) / 20);
			} else if (targetTop < curTop) {
				realSpeed = Math.floor((targetTop - curTop) / 20);
			}

			$(document).scrollTop(curTop + realSpeed);
			lastTimer = self.timer;
		}, self.speed)

	}

	this.id.click(function (e) {
		clearInterval(lastTimer)
		self.clickHandle(e);
	}) 

}



var formChecked = function () {
	var email = /\w+[@]{1}\w+[.]\w+/;
	inputText.each(function (i,val) {
		if ($(val).val().trim() == "" || $('textarea').val().trim() == "") {
			alert('Somwhere is blank!');
			clearVal = false;
			return false;
		}
		if ($(val).attr('name') == 'email') {
			if (email.test($(val).val().trim())) {
				alert('Thank for your message.');
				clearVal = true;
			} else {
				alert('check the email dress!')
				clearVal = false;
			}
		}
	})
}

var inputText = $("input[type='text'");
var submit = $('.btn').eq(1);
var clearVal = false;
submit.click(function () {
	formChecked()
	
	if (clearVal) {
			inputText.each(function (i, val) {
					$(val).val('');
		})
		$('textarea').val('')
	}

})





$(function () {
		$('.menu>li>a').each(function(i,val){
  	new SlowlyMove($(val))
	})
		new SlowlyMove($('.btn').eq(0),$('#S'))
})




	

;
// Начинать писать отсюда!!!!

//PRELOADER
document.body.onload = function(){
  setTimeout(function(){
    var preloader = document.getElementById('preloader');
    if(!preloader.classList.contains('preloader_done')){
      preloader.classList.add('preloader_done');
    }
  }, 1000)
};

//SCROLL
(function (){
    $('.nav__link').click( function(e){
  var scroll_el = $(this).attr('href');
        //if ($(scroll_el).length != 0) {
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 1500);
       // }
      return false;
    });
}());


//DROPDOWN
(function dropdown(){
    $('.dropdown').click(function(){
      $('.dropdown').toggleClass('dropdown_closed');
     $('.header__nav').toggleClass('header__nav_visible');
    })
    $(document).mouseup(function(e) {
      var $target = $(e.target);
      if ($target.closest('.header__nav').length == 0 && $target.closest('.dropdown').length == 0) {
        $('.header__nav').removeClass('header__nav_visible');
        $('.dropdown').removeClass('dropdown_closed');
      }
    });

  }());

/*
//ANIMATIONS
(function () {
	var target = $('.textBox');
	var targetPos = target.offset().top;
	var winHeight = $(window).height();
	var scrollToElem = targetPos - winHeight;
	$(window).scroll(function () {
		var winScrollTop = $(this).scrollTop();
		if (winScrollTop > scrollToElem) {
			$('.textBox__p').addClass('textBox__p_anim')
		} else {
			$('.textBox__p').removeClass('textBox__p_anim')
		}
    if(winScrollTop > targetPos){
      $('.header').addClass('header_bgInverse')
    } else {
      $('.header').removeClass('header_bgInverse')
    }
	});

}());
*/


//FORM VALIDATE
$('#contactForm').on('submit', function(){
  var formID = '#' + $(this).attr('id');
  $(formID).removeClass('form_success')
      $(formID).validate({
    rules: {
      firstName:{
        required: true
      },
      lastName:{
        required: true
      },
      email:{
        required: true,
        email: true
      },
      message:{
        required: true
      }
    },
    messages: {
      firstName:{
        required: "Please enter your name"
      },
      lastName:{
        required: "Please enter your last name"
      },
      email:{
        required: "Please enter your email address",
        email: "Please enter a correct email address"
      },
      message:{
        required: "Please enter your message"
      }

    },
    focusCleanup: true,
    focusInvalid: false
  });

    if($(formID).valid()){
          var data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: 'http://jsonplaceholder.typicode.com/posts',
      data: data,
      success: function(data){
        $('#contactForm').addClass('form_success')
        $('.form__input').val('');
      },
      error: function(data){
        $('#formNewsletter').addClass('form_error')
      }
    })
    }
    return false
})

//Pop UP
$('.portfolioPrev__popup').magnificPopup({
  type: 'inline',
  gallery:{
    enabled:true,
    arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

    tPrev: 'Previous (Left arrow key)', // title for left button
    tNext: 'Next (Right arrow key)', // title for right button
    tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
  },
  callbacks:{
    open: function() {
          $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
          });
          $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            lazyLoad: 'ondemand',
            asNavFor: '.slider-for',
            arrows: false,
            dots: true,
            centerMode: true,
            focusOnSelect: true
          });
        }
  }
});

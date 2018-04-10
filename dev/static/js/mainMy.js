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

// Animate AOS
// AOS.init({
//   disable: 'mobile'
// });


//COUNTER
// $('.numItem__val').each(function(){
//   var innerText = $(this).text()
//   console.log(isNaN(innerText))
// })

//AJAX

// $(document).ready(function(){
//   $.getJSON('gallery.json',function( data ){
//     var array = data;
//     var array2 = array.slice(0, 4)
//     console.log(array2)
//     templatePrev = Handlebars.compile( $('#galleryPrev-template').html() );
//     $('#portfolio__prev').append(templatePrev(array));
//     $('#ajax-btn').click(function(){
//       array2 = $(data).slice(0, 4)
//       $('#portfolio__prev').append(templatePrev(array2));
//       if(array.length == 0){
//         $('#ajax-btn').hide();
//       }
//
//     })
//   });
// });

function galleryShow(){
  if($(window).width() > 1100){
    $('.portfolio__prevItem').show();
    $('#showMore').hide();
  } else {
    $('.portfolio__prevItem').slice(0, 4).show();
    $('#showMore').click(function(e){
      e.preventDefault();
      $('.portfolio__prevItem:hidden').slice(0, 4).show();
      if($('.portfolio__prevItem:hidden').length == 0){
        $('#showMore').hide();
      }
    })
  }
};

$(window).on('load resize', galleryShow);


//SCROLL
(function (){
    $('.nav__link').click( function(e){
  var scroll_el = $(this).attr('href');
        //if ($(scroll_el).length != 0) {
      $('html, body').delay(200).animate({ scrollTop: $(scroll_el).offset().top }, 1500);
       // }
      return false;
    });
}());


//DROPDOWN
(function(){
  var dropdown = $('.dropdown');
  var nav = $('.header__nav');
  $('.dropdown__btn').click(function(){
    $(dropdown).toggleClass('dropdown_active');
   $(nav).toggleClass('header__nav_active');
  })
  $('.nav__link').click(function(){
    $(dropdown).removeClass('dropdown_active');
   $(nav).removeClass('header__nav_active');
  })
}());


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
        $('.callback__wrap_success').show()
        $(formID)[0].reset();
      },
      error: function(data){
        $('.callback__wrap_error').show()
      }
    })
    }
    return false
})
$('.callback__closeBtn').click(function(){
    $('.callback__wrap').hide()
})

//Pop UP
$('.portfolioPrev__popup').magnificPopup({
  type: 'inline',
  callbacks:{
    open: function() {
      $('.single-item').slick({
          infinite: true,
          dots: true,
          arrows: false
      });
        }
  }
});

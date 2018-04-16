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


//COUNTER

// function counter(){
//   $('.numItem__val').each(function(){
//     var innerText = $(this).text()
//     for(i=0; i<innerText; i++){
//       console.log(i)
//     }
//   })
// }
// $(window).on('load', counter);
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

(function(){
  var itemToShow = $('.portfolio__prevItem');
  var btn = $('#showMore');
  if($(window).width() > 1100){
    $(itemToShow).show();
    $(btn).hide();
  } else {
    $(itemToShow).slice(0, 4).show();
    $(btn).click(function(){
      console.log(itemToShow)
      $('.portfolio__prevItem:hidden').slice(0, 4).show();
      if($('.portfolio__prevItem:hidden').length == 0){
        $('#showMore').hide();
      }
    })
  }
}());
//
// $(window).on('load resize', galleryShow);


//SCROLL
(function (){
    $('.nav__link').click( function(e){
  var scroll_el = $(this).attr('href');
      $('html, body').delay(200).animate({ scrollTop: $(scroll_el).offset().top }, 1500);
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
      $('#contactFormBtn').prop('disabled', true)
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
    $('#contactFormBtn').prop('disabled', false)
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

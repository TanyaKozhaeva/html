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

function counter(){
  $('.numItem__valNum').each(function(){
    console.log($('.numItem__valNum'))
    var innerText = $(this).text()
    var i = 0;
    var timerId = setTimeout(function go() {
    console.log(i);
    $('.numItem__valNum').text(i)
    if (i < innerText) setTimeout(go, 10);
    i+=10;
  }, 10);
  })
}
$(window).on('load', counter);
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
      $('.portfolio__prevItem:hidden').slice(0, 4).show("slow");
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
        $('.callback__wrap_success').addClass('callback__wrap_visible')
        $(formID)[0].reset();
      },
      error: function(data){
        $('.callback__wrap_error').addClass('callback__wrap_visible')
      }
    })
    }
    $('#contactFormBtn').prop('disabled', false)
    return false
})
$('.callback__closeBtn').click(function(){
    $('.callback__wrap').removeClass('callback__wrap_visible')
})

//Pop UP
// $('.portfolioPrev__popup').magnificPopup({
//   type: 'inline',
//   callbacks:{
//     open: function() {
//       $('.single-item').slick({
//           infinite: true,
//           dots: true,
//           arrows: false
//       });
//         }
//   }
// });

//SLIDER
function sliderInit(){
$('.single-item').not('.slick-initialized').slick({
    infinite: true,
    dots: true,
    arrows: false
});
}

(function(){
  var allSlides = $(".portfolio__slideItem");
  var slideItem;
  var container = $("#portfolio");
  $('.portfolioPrev__btn').click(function(){
    $(allSlides).hide();
    var parentIndex = $(this).parents(".portfolio__prevItem").attr("data-slide")
    slideItem = $(".portfolio__slideItem[data-slide="+parentIndex+"]");

    bubbles.makeBubbles(10);

    $(slideItem).show();

    var slider = $(slideItem).find(".portfolioItem__slider")
    $(slider).addClass("single-item")
    sliderInit();


    setTimeout(function () {
      $(container).addClass("portfolio_active")
    }, 20);

    setTimeout(function () {
      $(slideItem).addClass("portfolio__slideItem_visible");
    }, 500);



  })
  $('.portfolioItem__close').click(function(){
    $(slideItem).removeClass("portfolio__slideItem_visible");
    $(container).removeClass("portfolio_active")
    bubbles.removeBubbles();
  })
  $(document).mouseup(function(e) {
    var $target = $(e.target);
    if ($target.closest(slideItem).length == 0 && $target.closest(slideItem).length == 0) {
      $(slideItem).removeClass("portfolio__slideItem_visible");
      $(container).removeClass("portfolio_active")
      bubbles.removeBubbles();
        }
      });
}());
/*
var bubbles = {
  makeBubbles: function(num){
    var container = document.getElementById("portfolio");
    var holdBubbles = document.createElement("div");
    holdBubbles.classList.add("portfolio__drop-wrapper");
    for (var i = 0; i < num; i++) {
    var bubble = document.createElement("div");
    bubble.classList.add("portfolio__drop");
    bubble.style.top = Math.floor((Math.random() * 100)) + 'vh';
    bubble.style.left = Math.floor((Math.random() * 100)) + 'vw';
    bubble.style.transitionDelay = Math.random() + 's';
    holdBubbles.appendChild(bubble);
    }
    container.appendChild(holdBubbles);
  },

  removeBubbles: function(){
    $(".portfolio__drop-wrapper").remove();
  }

}
*/
var bubbles = {
  makeBubbles: function(num){
    var container = document.getElementById("portfolio");
    var holdBubbles = document.createElement("div");
    holdBubbles.classList.add("portfolio__drop-wrapper");
    for (var i = 0; i < num; i++) {
    var bubble = document.createElement("div");
    bubble.classList.add("portfolio__drop");
    bubble.style.top = Math.floor((Math.random() * 100)) + 'vh';
    bubble.style.left = Math.floor((Math.random() * 100)) + 'vw';
    bubble.style.transitionDelay = Math.random() + 's';
    holdBubbles.appendChild(bubble);
    }
    //return holdBubbles;
    container.appendChild(holdBubbles);
  },

  removeBubbles: function(){
    $(".portfolio__drop-wrapper").remove();
  }

}

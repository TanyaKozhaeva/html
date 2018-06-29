//PRELOADER
document.body.onload = function(){
//  setTimeout(function(){
    var preloader = document.getElementById('preloader');
    if(!preloader.classList.contains('preloader_done')){
      preloader.classList.add('preloader_done');
    }
  //}, 100)
};

//SHOW MORE BTN
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


//SCROLL TO
(function (){
    $('.nav__link').click( function(e){
  var scroll_el = $(this).attr('href');
      $('html, body').delay(200).animate({ scrollTop: $(scroll_el).offset().top }, 1500);
      return false;
    });
}());


//DETECT ELEMENT IN VIEWPORT
function detectInViewBox(elem){
  var elem = elem;
  var elementTop = $(elem).offset().top;
  var elementBottom = elementTop + $(elem).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return (elementBottom > viewportTop && elementTop < viewportBottom)
}

//ANIMATED COUNTER
function counter(){
var elem = document.getElementById("numPanel");
var counted = $(elem).hasClass("counted")
var isInViewBox = detectInViewBox(elem);
if(isInViewBox && !counted){
  $("#numPanel").addClass("counted")
  $.each($('.numPanel__numeric'), function () {
      var count = $(this).data('count'),
          numAnim = new CountUp(this, 0, count, 0, 3);
      numAnim.start();
  });
}
};
$(window).on('scroll load', counter);

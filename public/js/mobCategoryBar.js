$( document ).ready(function() {
    $('.box-carousel').slick({
     dots: false,
     arrows: true,
     slidesToShow: 3,
     slidesToScroll: 1,
     prevArrow: "<button type='button' class='mission-prev-arrow'></button>",
     nextArrow: "<button type='button' class='mission-next-arrow'></button>",

     responsive: [
         {
           breakpoint: 991,
           settings: {
             slidesToShow: 3,
           }
         },
         {
           breakpoint: 767,
           settings: {
             slidesToShow: 2,
           }
         },
         {
             breakpoint: 413,
             settings: {
               slidesToShow: 2,
             }
           }
       ]
 });

});

$(function()
      {
        // Hide search wrap by default;
        $(".search-wrap").hide();

        $(".toggle-search").on("click", function(e) 
        {
          // Prevent default link behavior
          e.preventDefault();

          // Stop propagation
          e.stopPropagation();

          // Toggle search-wrap
          $(".search-wrap").slideToggle(500, function()
          {
            // Focus on the search bar
            // When animation is complete
            $("#search-bar").focus();	
          });
        });

        // Close the search bar if user clicks anywhere
        $(document).click(function(e)
        {
          var searchWrap = $(".search-wrap");
          
          if(!searchWrap.is(e.target) && searchWrap.has(e.target).length === 0)
          {
            searchWrap.slideUp(500);	
          }
        });    
      });

    //   {top services animation}
      $(window).scroll(function() {
        if ($(this).scrollTop() > 450 && !$('.navbar-bottom-services').hasClass('open')) {
          $('.navbar-bottom-services').addClass('open');
          $('.navbar-bottom-services').slideDown();
        } else if ($(this).scrollTop() <= 450) {
          $('.navbar-bottom-services').removeClass('open');
          $('.navbar-bottom-services').slideUp();
        }
      });

    //   {bottom services animation}
      $(window).scroll(function() {

        if ($(this).scrollTop()>450)
        {
            $('.header-bottom').fadeOut();
        }
        else
        {
          $('.header-bottom').fadeIn();
        }
        });
/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(function() {
  // FitVids init
  $("#main").fitVids();

  // Sticky sidebar
  var stickySideBar = function() {
    var show =
      $(".author__urls-wrapper").find("button").length === 0
        ? $(window).width() > 1024 // width should match $large Sass variable
        : !$(".author__urls-wrapper").find("button").is(":visible");
    if (show) {
      // fix
      $(".sidebar").addClass("sticky");
    } else {
      // unfix
      $(".sidebar").removeClass("sticky");
    }
  };

  stickySideBar();

  $(window).resize(function() {
    stickySideBar();
  });

  // Follow menu drop down
  $(".author__urls-wrapper").find("button").on("click", function() {
    $(".author__urls").toggleClass("is--visible");
    $(".author__urls-wrapper").find("button").toggleClass("open");
  });

  // Close search screen with Esc key
  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      if ($(".initial-content").hasClass("is--hidden")) {
        $(".search-content").toggleClass("is--visible");
        $(".initial-content").toggleClass("is--hidden");
      }
    }
  });

  // Search toggle
  $(".search__toggle").on("click", function() {
    $(".search-content").toggleClass("is--visible");
    $(".initial-content").toggleClass("is--hidden");
    // set focus on input
    setTimeout(function() {
      $(".search-content").find("input").focus();
    }, 400);
  });

  // Smooth scrolling
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: 20,
    speed: 400,
    speedAsDuration: true,
    durationMax: 500
  });

  // Gumshoe scroll spy init
  if($("nav.toc").length > 0) {
    var spy = new Gumshoe("nav.toc a", {
      // Active classes
      navClass: "active", // applied to the nav list item
      contentClass: "active", // applied to the content

      // Nested navigation
      nested: false, // if true, add classes to parents of active link
      nestedClass: "active", // applied to the parent items

      // Offset & reflow
      offset: 20, // how far from the top of the page to activate a content area
      reflow: true, // if true, listen for reflows

      // Event support
      events: true // if true, emit custom events
    });
  }

  // add lightbox class to all image links
  $(
    "a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']"
  ).has("> img").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: "mfp-zoom-in",
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  // Add anchors for headings
  $('.page__content').find('h1, h2, h3, h4, h5, h6').each(function() {
    var id = $(this).attr('id');
    if (id) {
      var anchor = document.createElement("a");
      anchor.className = 'header-link';
      anchor.href = '#' + id;
      anchor.innerHTML = '<span class=\"sr-only\">Permalink</span><i class=\"fas fa-link\"></i>';
      anchor.title = "Permalink";
      $(this).append(anchor);
    }
  });
});


/* ==========================================================================
   Own js
   ========================================================================== */

// Fade about-image out on scroll

var about_img = document.getElementById('about-img');
var about_img_2 = document.getElementById('about-img-2');
var about_img_3 = document.getElementById('about-img-3');
var about_img_4 = document.getElementById('about-img-4');

function fadeOutOnScroll(element) {
	if (!element) {
		return;
	}

	var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
	var elementHeight = element.offsetHeight;
	var scrollTop = document.documentElement.scrollTop;

	var opacity = 1;

	if (scrollTop > distanceToTop) {
		opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
	}

	if (opacity >= 0) {
		element.style.opacity = opacity;
	}
}

function scrollHandler() {
     fadeOutOnScroll(about_img);
     fadeOutOnScroll(about_img_2);
     fadeOutOnScroll(about_img_3);
     fadeOutOnScroll(about_img_4);
}

window.addEventListener('scroll', scrollHandler);

// Fade in elements on scroll

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Das Element ist im sichtbaren Bereich
      entry.target.classList.add('fade-in');
    }
  });
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observer = new IntersectionObserver(handleIntersection, options);
const fade_zero = document.getElementById('fade-elem-zero');
const fade_one = document.getElementById('fade-elem-one');
const fade_two = document.getElementById('fade-elem-two');
observer.observe(fade_zero);
observer.observe(fade_one);
observer.observe(fade_two);






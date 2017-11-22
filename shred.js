$(document).ready(function () {

//detect click on menu button or items and trigger menu animation
$(function() {
  $('#mobile-menu li a, #hamburger').click(function(e) {
    drawerToggle();
  })
});

/*================== Handle Menu Click Events ================================*/
$('#desktop-menu li a, #mobile-menu li a').click(function(e) {
  hideFullScreenPhoto();
  switch($(this).attr("href")) {
    case "/":
      displayHomePage();
      break;
    case "artists":
      break;
    case "dates":
      break;
    case "about":
      break;

    default:
      alert('whoops');
    }
  window.scrollTo(0,0);
});

function displayHomePage(){
  replaceContent(content, function() {
    var content ='';

    });
};
// function dates(){
//   var url = "design.json"
//   //ajax call
//   fetchData(url, function(output){
//     var response = JSON.parse(output);

//     var content = "";

//     replaceContent(content, function() {
//       });

//   });
// };

// ========================== Ajax call for retriving data ====================
// @param url is the url to be accessed
function fetchData(url ,handleData) {
  $.ajax({
    url: url,
    success:function(data) {
      handleData(data);
    }
  });
}

/*=============== Handle Photo Click on Photography section ==================*/
$(document).on("click"," .gallery img, #overlay, #full-screen-photo-section", function(e) {
  if($('#overlay').hasClass("under")){
    showFullScreenPhoto();
  }else{
    hideFullScreenPhoto();
  };
  // get id and longDesc from img
    var idOfElement = this.getAttribute('id');
    var longDesc = this.getAttribute('longDesc');
  //set src of full screen image to the enlarged version of the image
  if(isNumber(idOfElement)){
    $('#selected-photo').attr('src', longDesc);
  }

});

function showFullScreenPhoto(){
  $('#overlay').removeClass("under").addClass("over");
  $('#full-screen-photo-section').removeClass('hidden');
}

function hideFullScreenPhoto(){
  $('#overlay').removeClass("over").addClass("under");
  $('#full-screen-photo-section').addClass('hidden');
}

function fullScreenPhoto(id) {

};

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function replaceContent(content ,_callback){
    $('#main').children().fadeOut(500, function() {
      $('#main').empty();
      $(content).appendTo('#main').hide().fadeIn(700);
    });
    $('#main').promise().done(function(){
      _callback();
    })
}

function showContent(_callback){
    $('#main').children().fadeIn(500, function() {
    });
    _callback();
}
// =========================== Open and close menu =============================

//animate menu
function drawerToggle(){
  //for hamburger animation
  var hamburger = document.getElementById('hamburger');
  hamburger.classList.toggle("change");
  //move list up and down
  $("#mobile-menu").toggleClass("menu-hidden", 800, "easeOutQuint");
};

// ======== Pop State function stolen from http://html5.gingerhost.com/ ========

  $(function() {
    $('#desktop-menu li a, #mobile-menu li a').click(function(e) {

      href = $(this).attr("href");

      // HISTORY.PUSHSTATE
      history.pushState('', 'New URL: '+href, href);
      e.preventDefault();
      //bind the page and make that back button work!
      $(window).bind('popstate', function(){
        window.location.href = window.location.href;
      });
    });
    // THIS EVENT MAKES SURE THAT THE BACK/FORWARD BUTTONS WORK AS WELL
    window.onpopstate = function(event) {
      loadContent(location.pathname);
    };
    window.onpopstate =  function(event) {

    };
  });
});

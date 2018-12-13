$(function() {
  
//----------------------------masonry-------------------------------
  // $('.grid').masonry({
  //   itemSelector: '.grid-item',
  //   columnWidth: 1
  // });

//------------------------------гамбургер-----------------------------
  $('.hamburger').click(function() {
    $(this).toggleClass('hamburger-active');
    $('nav').toggleClass('nav-active');
    $('header').toggleClass('header-menu');
  });

//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.6s'});

//------------------------------------form-------------------------------------------
  $('input[type="tel"]').mask('+0 (000) 000-00-00');

  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  $("#order").each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          phone: jQuery('.form-' + index).find("input[name=phone]").val(),
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
      }
    });

  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function(data) {
        $("#order").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      },
      error: function(){
        alert("dont work")
      }
    });
  }

//----------------------------------------fixed----------------------------------
  $(window).scroll(function(){
      if($(this).scrollTop()>20){
          $('.header').addClass('header-active');
      }
      else if ($(this).scrollTop()<20){
          $('.header').removeClass('header-active');
      }
  });

//-------------------------скорость якоря---------------------------------------
  $("#menu").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 56}, 'slow', 'swing');
  //--------------------закриття меню при кліку на ссилку якоря--------------------
     $('.hamburger').removeClass('hamburger-active');
     $('.header-menu').removeClass('header-menu');
     $('.header-active').removeClass('header-active');
     $('.nav-active').removeClass('nav-active');

  });

  //---------------------------скрол-----------

  var container = document.getElementById('scrollbar-container'),
      content = document.getElementById('content'),
      scroll = document.getElementById('scrollbar');

    

  content.addEventListener('scroll', function(e) {
    // scroll.style.height = container.clientHeight * content.clientHeight / content.scrollHeight + "px";
    scroll.style.height = 30 + "px";
    // scroll.style.top = content.scrollTop * container.clientHeight / content.scrollHeight + "px";
    // scroll.style.top = (((300 + content.scrollTop) * scroll.clientHeight) / content.clientHeight - 30)   + "px";
    // scroll.style.top = content.scrollTop * container.clientHeight * (container.clientHeight * content.clientHeight / content.scrollHeight / 82 ) / content.scrollHeight + "px";
    scroll.style.top =  content.scrollTop * ( (content.clientHeight - 30) / (content.scrollHeight - content.clientHeight) ) + "px";

    // console.log('top:', scroll.style.top);
    // console.log('clientHeight:', container.clientHeight, 'content.scrollTop:', content.scrollTop, 'content.scrollHeight:', content.scrollHeight )
  });
  var event = new Event('scroll');

  window.addEventListener('resize', content.dispatchEvent.bind(content, event));
  content.dispatchEvent(event);

  scroll.addEventListener('mousedown', function(start){
    start.preventDefault();
    var y = scroll.offsetTop;
    var onMove = function(end){
      var delta = end.pageY - start.pageY;
      scroll.style.top = Math.min(container.clientHeight - scroll.clientHeight, Math.max(0, y + delta)) + 'px';
      content.scrollTop = (content.scrollHeight * scroll.offsetTop / container.clientHeight);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', function(){
      document.removeEventListener('mousemove', onMove);
    });
  });

  // --------свайпер----------------------------------

  var mySwiper = new Swiper ('.review-swiper', {

    slidesPerView: 1,
    navigation: {
      nextEl: '.review-swiper-next',
      prevEl: '.review-swiper-prev',
    },
    
  });

  var mySwiper2 = new Swiper ('.top7-swiper', {
    
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        type: "bullets",
      },
  });


  //---------акордеон--------------

  $(".acord-head").click(function() {
    if($(this).hasClass("active")){
        $(this).removeClass("active");
        $(this).next().slideUp();
    } else {
        $(".acord-head").removeClass("active");
        $(".acord-body").slideUp();
        $(this).addClass('active');
        $(this).next().slideDown();
    }
  });

  // var accBtns=document.getElementsByClassName("acord-head");
  //   for (var i = 0; i < accBtns.length; i++) {
  //     accBtns[i].addEventListener("click", function () {
  //       this.parentElement.classList.toggle("active")
  //       console.log(this.parentElement)
  //       var accBody=this.nextElementSibling
        

  //     })
  //   }

  // $(".form").submit(function(){
  //   $('#order').popup('hide');
  //   $('#thanks').popup('show')
  // });
  
});
  
  //-----------------map----------------

  var map;
    var marker;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.76602, lng: 37.6794026},
        zoom: 14.33,
        styles: [
        {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [
          {
            "weight": "2.00"
          }
          ]
        },
        {
          "featureType": "all",
          "elementType": "geometry.stroke",
          "stylers": [
          {
            "color": "#9c9c9c"
          }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text",
          "stylers": [
          {
            "visibility": "on"
          },
          {
            "hue": "#7f6d42"
          },
          {
            "saturation": "40"
          }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
          {
            "color": "#f2f2f2"
          }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
          {
            "color": "#ffffff"
          }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [
          {
            "color": "#ffffff"
          }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
          {
            "visibility": "off"
          }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
          {
            "color": "#eeeeee"
          }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
          {
            "color": "#7b7b7b"
          }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
          {
            "color": "#ffffff"
          }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
          {
            "visibility": "simplified"
          }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
          {
            "visibility": "off"
          }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
          {
            "visibility": "off"
          }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
          {
            "color": "#46bcec"
          },
          {
            "visibility": "on"
          }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
          {
            "color": "#c8d7d4"
          }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
          {
            "color": "#070707"
          }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
          {
            "color": "#ffffff"
          }
          ]
        }
        ]
      });
    }

//----------------------------------------preloader----------------------------------

  $(window).on('load', function(){
    $('.preloader').delay(1000).fadeOut("slow");
  });


//----------------------------------------svg----------------------------------
  // ;( function( window, document )
  // {
  //   'use strict';

  //   var file     = 'img/symbols.html',
  //       revision = 1.2;

  //   if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
  //       return true;

  //   var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
  //       request,
  //       data,
  //       insertIT = function()
  //       {
  //           document.body.insertAdjacentHTML( 'afterbegin', data );
  //       },
  //       insert = function()
  //       {
  //           if( document.body ) insertIT();
  //           else document.addEventListener( 'DOMContentLoaded', insertIT );
  //       };

  //   if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
  //   {
  //     data = localStorage.getItem( 'inlineSVGdata' );
  //     if( data )
  //     {
  //         insert();
  //         return true;
  //     }
  //   }

  //   try
  //   {
  //     request = new XMLHttpRequest();
  //     request.open( 'GET', file, true );
  //     request.onload = function()
  //       {
  //         if( request.status >= 200 && request.status < 400 )
  //           {
  //             data = request.responseText;
  //             insert();
  //             if( isLocalStorage )
  //             {
  //               localStorage.setItem( 'inlineSVGdata',  data );
  //               localStorage.setItem( 'inlineSVGrev',   revision );
  //             }
  //         }
  //     }
  //     request.send();
  //   }
  //   catch( e ){}

  // }( window, document ) );
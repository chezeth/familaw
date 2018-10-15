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

  $(".form").each(function(index, el) {
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
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
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
  $(".header__list").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 60}, 'slow', 'swing');
  //--------------------закриття меню при кліку на ссилку якоря--------------------
     // $('.hamburger').removeClass('hamburger-active');
     // $('.header-menu').removeClass('header-menu');
     // $('.header-active').removeClass('header-active');
     // $('.nav-active').removeClass('nav-active');

  });


var container = document.getElementById('scrollbar-container'),
    content = document.getElementById('content'),
    scroll = document.getElementById('scrollbar');

  

content.addEventListener('scroll', function(e) {
  // scroll.style.height = container.clientHeight * content.clientHeight / content.scrollHeight + "px";
  scroll.style.height = "30" + "px";
  // scroll.style.top = content.scrollTop * container.clientHeight / content.scrollHeight + "px";
  scroll.style.top = (((300 + content.scrollTop) * scroll.clientHeight) / content.clientHeight - 30)   + "px";
  // scroll.style.top = content.scrollTop * container.clientHeight / 30 + "px";

  console.log('top:', scroll.style.top);
  console.log('clientHeight:', container.clientHeight, 'content.scrollTop:', content.scrollTop, 'content.scrollHeight:', content.scrollHeight )
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

  
});

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
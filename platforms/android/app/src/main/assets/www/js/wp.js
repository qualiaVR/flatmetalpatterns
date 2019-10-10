$(document).ready(function()
{
  wordpress();

  $.ajax({
    url: 'https://flatmetalpatterns.com//wp-json/wc/v3/products/categories?hide_empty=true&per_page=100', // Your store URL
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa('ck_6c880a08127e1d1162a072be2cf92f673d5f25ef:cs_93587543facd8c03616bd2f6256415e809dc791f'));
    },
    method: 'GET',
    dataType: 'json',
    success: function (res) {
      $.each(res, function (i, cat) {
        var id = cat.id;
        var name = cat.name;
        $("#category").append("<option value=\""+id+"\" >"+name+"</option>")
      })
    }
  });

  $.ajax({
    url: 'https://flatmetalpatterns.com/wp-json/wc/v3/products', // Your store URL
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa('ck_6c880a08127e1d1162a072be2cf92f673d5f25ef:cs_93587543facd8c03616bd2f6256415e809dc791f'));
    },
    method: 'GET',
    dataType: 'json',
    success: function (res) {
      $.each(res, function (i, post) {
        var title=post.name;
        var img=post.images[0].src;
        var link=post.permalink;
        var price=post.price;
        $("#storeList").append("<li><h2>"+title+"<h2></li><li><a href='"+link+"'><img src=\""+img+"\" style=\"max-width: 90%\"></a></li><li>Precio: $"+price+"</li><li>Envio gratis</li>")
      })
    }
  });
});

function store() {
  var id = document.getElementById("category").value;
  $("#storeList").html("");
  $.ajax({
    url: `https://flatmetalpatterns.com/wp-json/wc/v3/products?category=${id}`, // Your store URL
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa('ck_6c880a08127e1d1162a072be2cf92f673d5f25ef:cs_93587543facd8c03616bd2f6256415e809dc791f'));
    },
    method: 'GET',
    dataType: 'json',
    success: function (res) {
      $.each(res, function (i, post) {
        var title=post.name;
        var img=post.images[0].src;
        var link=post.permalink;
        var price=post.price;
        $("#storeList").append("<li><h2>"+title+"<h2></li><li><a href='"+link+"'><img src=\""+img+"\" style=\"max-width: 90%\"></a></li><li>Precio: $"+price+"</li><li>Envio gratis</li>")
      })
    }
  });
}

page = 1;
last = false;

function wordpress() {
  page = 1;
  last = false;
  $("#postsList").html("");

  $.ajax({
    url: 'https://flatmetalpatterns.com/wp-json/wp/v2/posts?per_page=3&categories=2', // Your store URL
    method: 'GET',
    dataType: 'json',
    success: function (result, status, xhr) {
      if(page === xhr.getResponseHeader("X-WP-TotalPages")) {
        last = true;
        console.log(last);
      }
      $.each(result, function(i, field){
        var title=field.title.rendered;
        var contenido;
        var link=field.link;
        if(field.categories.includes(4)){
          contenido=field.excerpt.rendered;
        } else {
          contenido=field.content.rendered;
        }
        $("#postsList").append("<a href='"+link+"'><li><h2>"+title+"<h2></li><li>"+contenido+"</li></a>");
      });
      $("#postsList").append("<span id='loader'>Cargando...</span>");
    }
  });
}

window.onscroll = function() {
  try {
    if (isScrolledIntoView('#loader')) {
      page = page + 1;
      newurl = 'https://flatmetalpatterns.com/wp-json/wp/v2/posts?per_page=3&page='+page+'&categories=2'
      $("#loader").remove();
      if (!last) {
        $.ajax({
          url: newurl, // Your store URL
          method: 'GET',
          dataType: 'json',
          success: function (result, status, xhr) {
            if(page === xhr.getResponseHeader("X-WP-TotalPages")) {
              last = true;
            }
            $.each(result, function(i, field){
              var title=field.title.rendered;
              var contenido;
              var link=field.link;
              if(field.categories.includes(4)){
                contenido=field.excerpt.rendered;
              } else {
                contenido=field.content.rendered;
              }
              $("#postsList").append("<a href='"+link+"'><li><h2>"+title+"<h2></li><li>"+contenido+"</li></a>");
            });
            if(!last){
              $("#postsList").append("<span id='loader'>Cargando...</span>");
            }
          }
        });
      }
    }
  } catch (e) {

  }
}


function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

var pStart = {x: 0, y:0};
var pStop = {x:0, y:0};

function swipeStart(e) {
  if (typeof e['targetTouches'] !== "undefined"){
    var touch = e.targetTouches[0];
    pStart.x = touch.screenX;
    pStart.y = touch.screenY;
  } else {
    pStart.x = e.screenX;
    pStart.y = e.screenY;
  }
}

function swipeEnd(e){
  if (typeof e['changedTouches'] !== "undefined"){
    var touch = e.changedTouches[0];
    pStop.x = touch.screenX;
    pStop.y = touch.screenY;
  } else {
    pStop.x = e.screenX;
    pStop.y = e.screenY;
  }

  swipeCheck();
}

function swipeCheck(){
  var changeY = pStart.y - pStop.y;
  var changeX = pStart.x - pStop.x;
  if (isPullDown(changeY, changeX) ) {
    if($('#page-home').hasClass('ui-page-active')) {
      wordpress();
    }
  }
}

function isPullDown(dY, dX) {
  // methods of checking slope, length, direction of line created by swipe action
  return dY < 0 && (
    (Math.abs(dX) <= 100 && Math.abs(dY) >= 300)
    || (Math.abs(dX)/Math.abs(dY) <= 0.3 && dY >= 60)
  );
}

document.addEventListener('touchstart', function(e){ swipeStart(e); }, false);
document.addEventListener('touchend', function(e){ swipeEnd(e); }, false);
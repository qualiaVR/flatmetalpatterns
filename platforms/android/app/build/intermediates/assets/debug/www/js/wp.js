$(document).ready(function()
{
  var url="https://flatmetalpatterns.com/wp-json/wp/v2/posts?per_page=3&categories=2";
  $.getJSON(url,function(result){
    $.each(result, function(i, field){
      var title=field.title.rendered;
      var contenido;
      if(field.categories.includes(4)){
        contenido=field.excerpt.rendered;
        // var link=field.link;
      } else {
        contenido=field.content.rendered;
      }
      $("#postsList").append("<li><h2>"+title+"<h2></li><li>"+contenido+"</li>");
    });
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
        $("#storeList").append("<li><h2>"+title+"<h2></li><li><a href='"+link+"'><img src=\""+img+"\" style=\"max-width: 90%\"></a></li><li>$"+price+"</li>")
      })
    }
  });
});
jquery(document).ready(function ($) {
  var thongtin = [{
      url: "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/100487209_166874918192809_7978164209181523968_n.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=Cp-eIteZnLAAX_8v8dp&_nc_ht=scontent.fdad3-1.fna&oh=2ea837b52f3f7561b16eeaa026244bd9&oe=5EF4CB69",
      h5: "Nguyễn Trung Khiêm 1",
      p: " Test 1 "
    }, {
      url: "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/100487209_166874918192809_7978164209181523968_n.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=Cp-eIteZnLAAX_8v8dp&_nc_ht=scontent.fdad3-1.fna&oh=2ea837b52f3f7561b16eeaa026244bd9&oe=5EF4CB69",
      h5: "Nguyễn Trung Khiêm 2",
      p: " Test 2 "
    }, {
       url: "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/100487209_166874918192809_7978164209181523968_n.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=Cp-eIteZnLAAX_8v8dp&_nc_ht=scontent.fdad3-1.fna&oh=2ea837b52f3f7561b16eeaa026244bd9&oe=5EF4CB69",
      h5: "Nguyễn Trung Khiêm 3",
      p: " Test 3 "
    }];

    thongtin.sort(function () { return 0.5 - Math.random(); });

    $.each(thongtin , function (index, thongtins) {
      var element = $('<div class="carousel-item"> <img src=" + thongtins.url +" class="d-block w-100" alt="#"> <div class="carousel-caption d-sm-block"> <h5> + thongtins.h5 + </h5> <p> + thongtins.p +</p> </div> </div>')
      
      if (index === 0) {
        element.addClass("active");
      }

      element.appendTo("div.carousel-inner");
    } );

    $('.carousel').carousel({
      interval: 1000,
    })
});

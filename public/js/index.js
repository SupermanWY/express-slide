$(function() {
  var html = ''
  for (var i = 1; i <= 30; i++) {
    html += '<div class="swiper-slide"><img src="./img/s'+ i +'.jpg" /></div>'
  }
  $('.swiper-wrapper').html(html)

  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })

  $('.next-btn').on('click', function() {
    swiper.slideNext()
  })
})
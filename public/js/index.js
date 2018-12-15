$(function() {
  var isPlaying = false
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

  var audio = $('.audio')[0]
  var startAudio = startAudioProxy()

  $('.next-btn').on('click', function() {
    swiper.slideNext()
  })
  $('.audio-play-btn').on('click', function() {
    isPlaying ? endAudio() : startAudio()
  })

  audio.addEventListener('canplay', startAudio)

  function startAudioProxy() {
    var hasPlayed = false

    return function() {
      audio.play().then(function() {
        hasPlayed = true
        onAudioStart()
      }).catch(function () {
        var arr = ['touchend', 'click', 'doubleclick', 'keydown']
        arr.forEach(function(item) {
          document.addEventListener(item, function(){
            if (hasPlayed) {
              document.removeEventListener(item, arguments.callee)
            }
            audio.play()
            onAudioStart()
            hasPlayed = true
          })
        })
      })
    }
  }

  function endAudio() {
    audio.pause()
    onAudioEnd()
  }

  function onAudioStart() {
    isPlaying = true
    $('.audio-play-btn').css('animation', 'rotate 2s infinite linear')
  }
  function onAudioEnd() {
    isPlaying = false
    $('.audio-play-btn').css('animation', '')
  }
})
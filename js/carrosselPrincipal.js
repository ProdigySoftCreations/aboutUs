document.addEventListener('DOMContentLoaded', function() {
    var flkty = new Flickity('.carrosselPrimario', {
      autoPlay: false,
      pauseAutoPlayOnHover: false,
      prevNextButtons: false
    });
  
    var hasAnimated = false;
  
    flkty.on('change', function(index) {
      var slides = document.querySelectorAll('.carrosselPrimario-celula');
      slides.forEach(function(slide) {
        slide.classList.remove('is-active');
      });
      slides[index].classList.add('is-active');
  
      // Se for o segundo slide (índice 1) e ainda não animou
      if (index === 1 && !hasAnimated) {
        slides[index].classList.add('animate-once');
        hasAnimated = true;
      }
    });
  });
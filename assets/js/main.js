(function() {
  "use strict";
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });


  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  new PureCounter();

  
  document.addEventListener("DOMContentLoaded", function() {
    var myModal = new bootstrap.Modal(document.getElementById('produtoModal'));

    function exibirInformacoesProduto(produtoId) {
        var produtoInfo = document.getElementById(produtoId).innerHTML;
        document.getElementById('modalBody').innerHTML = produtoInfo;
        myModal.show();
    }

    // Atribuindo a função ao link do produto 1
    var linkAQ10 = document.getElementById('linkAQ10');
    linkAQ10.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQ10');        
    });

    var linkAQ20 = document.getElementById('linkAQ20');
    linkAQ20.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQ20');        
    });

    var linkAQ20 = document.getElementById('linkAQQuat');
    linkAQ20.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQQuat');        
    });

    var linkAQOrgano = document.getElementById('linkAQOrgano');
    linkAQOrgano.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQOrgano');        
    });

    var linkAQBiocide = document.getElementById('linkAQBiocide');
    linkAQBiocide.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQBiocide');        
    });

    var linkAQNutri = document.getElementById('linkAQNutri');
    linkAQNutri.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQNutri');        
    });

    var linkAQEtanol = document.getElementById('linkAQEtanol');
    linkAQEtanol.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQEtanol');
    });
    
    var linkAQColun = document.getElementById('linkAQColun');
    linkAQColun.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQColun');        
    });

    var linkAQColun = document.getElementById('linkAQColun');
    linkAQColun.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQColun');        
    });

    var linkAQ22 = document.getElementById('linkAQ22');
    linkAQ22.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQ22');        
    });

    var linkAQ23 = document.getElementById('linkAQ23');
    linkAQ23.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQ23');        
    });
   

    var linkAQLub = document.getElementById('linkAQLub');
    linkAQLub.addEventListener('click', function(event) {
        event.preventDefault();
        exibirInformacoesProduto('AQLub');        
    });
   
    // Adicione atribuições para outros links e produtos, se necessário
  });
})()
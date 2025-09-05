import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(el) {
    this.el = el;
    this.options = {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: this.el.querySelector('.swiper-pagination'),
      },
      navigation: {
        nextEl: this.el.querySelector('.swiper-button-next'),
        prevEl: this.el.querySelector('.swiper-button-prev'),
      },
      direction: 'horizontal',
    };

    this.init();
  }

  setOptions() {
    if ('split' in this.el.dataset) {
      this.options.breakpoints = {
        1024: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2,
        },
      };
    }
    if ('autoplay' in this.el.dataset) {
      this.options.autoplay = {
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      };
    }
    if ('loop' in this.el.dataset) {
      this.options.loop = true;
    }
    if ('vertical' in this.el.dataset) {
      this.options.direction = 'vertical';
    }
    this.options.slidesPerView =
      parseFloat(this.el.dataset.slides) || this.options.slidesPerView;
  }

  init() {
    this.setOptions();
    const swiper = new Swiper(this.el, this.options);
  }
}

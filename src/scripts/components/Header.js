export default class Header {
  constructor(element) {
    this.element = element;
    this.options = {
      threshold: 0.1,
      alwaysShow: false,
    };
    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;

    this.init();
    this.initMobileNav();
  }

  init() {
    this.setOptions();

    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  setOptions() {
    if ('threshold' in this.element.dataset) {
      this.options.threshold = this.element.dataset.threshold;
    }
    if ('alwaysShow' in this.element.dataset) {
      this.options.alwaysShow = true;
    }
  }

  onScroll() {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;

    if (!this.options.alwaysShow) {
      this.setHeaderState();
    }
    this.setDirections();
  }
  setHeaderState() {
    if (
      this.scrollPosition >
      document.scrollingElement.scrollHeight * this.options.threshold
    ) {
      this.html.classList.add('header-is-hidden');
    } else if (this.scrollPosition < this.lastScrollPosition) {
      this.html.classList.remove('header-is-hidden');
    }
  }

  setDirections() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }

  initMobileNav() {
    const toggle = document.querySelector('.js-toggle');
    toggle.addEventListener('click', this.toggleNavMenu.bind(this));
  }

  toggleNavMenu() {
    document.documentElement.classList.toggle('nav-is-active');
  }
}

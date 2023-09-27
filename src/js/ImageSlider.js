export default class ImageSlider {
  #currentPosition = 0;
  #slideNunber = 0;
  #slideWidth = 0;

  constructor() {
    this.assignElement();
    this.initSlideNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
  }

  assignElement() {
    this.$sliderContainer = document.querySelector('.slider-container');
    this.$sliderList = this.$sliderContainer.querySelector('.slider-list');
    this.$nextButton = this.$sliderContainer.querySelector('.next');
    this.$previousButton = this.$sliderContainer.querySelector('.previous');
  }

  initSlideNumber() {
    this.#slideNunber =
      this.$sliderList.querySelectorAll('.slider-item').length;
  }

  initSlideWidth() {
    this.#slideWidth = this.$sliderList.clientWidth;
  }

  initSliderListWidth() {
    this.$sliderList.style.width = `${this.#slideNunber * this.#slideWidth}px`;
  }

  addEvent() {
    this.$nextButton.addEventListener('click', this.moveToRight.bind(this));
    this.$previousButton.addEventListener('click', this.moveToLeft.bind(this));
  }

  moveToRight() {
    this.#currentPosition++;
    if (this.#currentPosition === this.#slideNunber) {
      this.#currentPosition = 0;
    }

    this.$sliderList.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
  }

  moveToLeft() {
    this.#currentPosition--;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#slideNunber - 1;
    }

    this.$sliderList.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
  }
}

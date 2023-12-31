export default class ImageSlider {
  #currentPosition = 0;
  #slideNunber = 0;
  #slideWidth = 0;
  #intervalID;
  #autoPlay = true;

  constructor() {
    this.assignElement();
    this.initSlideNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.initAutoPlay();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
  }

  assignElement() {
    this.$sliderContainer = document.querySelector('.slider-container');
    this.$sliderList = this.$sliderContainer.querySelector('.slider-list');
    this.$nextButton = this.$sliderContainer.querySelector('.next');
    this.$previousButton = this.$sliderContainer.querySelector('.previous');
    this.$indicatorContainer = this.$sliderContainer.querySelector(
      '.indicator-container',
    );
    this.$controlWrapper =
      this.$sliderContainer.querySelector('.control-wrapper');
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

  initAutoPlay() {
    this.#intervalID = setInterval(this.moveToRight.bind(this), 3000);
  }

  addEvent() {
    this.$nextButton.addEventListener('click', this.moveToRight.bind(this));
    this.$previousButton.addEventListener('click', this.moveToLeft.bind(this));
    this.$indicatorContainer.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
    this.$controlWrapper.addEventListener('click', this.togglePlay.bind(this));
  }

  moveToRight() {
    this.#currentPosition++;
    if (this.#currentPosition === this.#slideNunber) {
      this.#currentPosition = 0;
    }

    this.$sliderList.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;

    if (this.#autoPlay) {
      clearInterval(this.#intervalID);
      this.#intervalID = setInterval(this.moveToRight.bind(this), 3000);
    }

    this.setIndicator();
  }

  moveToLeft() {
    this.#currentPosition--;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#slideNunber - 1;
    }

    this.$sliderList.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;

    if (this.#autoPlay) {
      clearInterval(this.#intervalID);
      this.#intervalID = setInterval(this.moveToRight.bind(this), 3000);
    }

    this.setIndicator();
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNunber; i++) {
      const li = document.createElement('li');
      li.classList.add('indicator');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.$indicatorContainer.appendChild(docFragment);
  }

  setIndicator() {
    this.$indicatorContainer
      .querySelector('.active')
      ?.classList.remove('active');

    this.$indicatorContainer
      .querySelector(`.indicator:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }

  onClickIndicator(event) {
    const indexPosition = parseInt(event.target.dataset.index);
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.$sliderList.style.left = `-${
        this.#slideWidth * this.#currentPosition
      }px`;
    }

    this.setIndicator();
  }

  togglePlay(event) {
    if (event.target.dataset.status === 'play') {
      this.#autoPlay = true;
      this.$controlWrapper.classList.add('play');
      this.$controlWrapper.classList.remove('pause');
    } else {
      this.#autoPlay = false;
      this.#autoPlay = true;
      this.$controlWrapper.classList.add('pause');
      this.$controlWrapper.classList.remove('add');
      clearInterval(this.#intervalID);
    }
  }
}

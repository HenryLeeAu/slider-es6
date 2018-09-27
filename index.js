class slide {
  constructor(elmWrap, index) {
    this.index = index;
    this.elmWrap = elmWrap;
    this.elm = elmWrap.getElementsByClassName("photo-wrap")[0];
    this.num = elmWrap.getElementsByClassName("slide").length;
    this.msg = elmWrap.getElementsByClassName("register-module");
    this.wrap = elmWrap.getElementsByClassName("photo")[0];
    this.autoRefresh = true;
  }
  _createSlidebtnWrap() {
    const CREATE_ELMS = () => {
      let btnWrap = document.createElement("div");
      let ul = document.createElement("ul");
      btnWrap.className = "slide-btn";
      let btnWrapImplement = this.elmWrap
        .insertBefore(btnWrap, this.elm)
        .appendChild(ul);
      this._createSlidebtns(btnWrapImplement);
    };
    return this.num <= 1 ? false : CREATE_ELMS();
  }
  _createSlidebtns(bWImp) {
    let btnArr = [];
    for (let i = 0; i < this.num; i++) {
      btnArr[i] = document.createElement("li");
      let btn = document.createElement("button");
      btn.addEventListener("click", () => {
        (btnIndex => {
          this.index = btnIndex;
          this._implementMove();
          this._implementShowBox();
        })(i);
      });
      bWImp.appendChild(btnArr[i]).appendChild(btn);
    }
    this._stylingSlideBtns();
  }
  _stylingSlideBtns() {
    const RENDER_STYLE = () => {
      let btnArr = this.elmWrap
        .getElementsByClassName("slide-btn")[0]
        .getElementsByTagName("li");
      for (let i = 0; i < this.num; i++) {
        this.index === i
          ? btnArr[i].setAttribute("class", "clicked")
          : btnArr[i].setAttribute("class", "");
      }
    };
    return !this.elmWrap.getElementsByClassName("slide-btn")[0]
      ? false
      : RENDER_STYLE();
  }
  _calcTotalWidth() {
    return this.elm.offsetWidth * this.num;
  }
  _implementWidthToDoms() {
    let childNodes = this.elm.getElementsByClassName("slide");
    this.wrap.style.width = this._calcTotalWidth() + "px";
  }
  _countingClock() {
    let count = setInterval(() => {
      this.index = this._countingNum(this.index, this.num);
      this._implementMove();
      this._implementShowBox();
    }, 5000);
  }
  _countingNum(nowNum, arrLength) {
    nowNum++;
    nowNum > arrLength - 1 ? (nowNum = 0) : nowNum;
    return nowNum;
  }
  _implementMove() {
    this.wrap.style.marginLeft = -(this.index * this.elm.offsetWidth) + "px";
    this._stylingSlideBtns();
  }
  _implementShowBox() {
    for (let i = 0; i < this.num; i++) {
      this.msg[i].style.display = i === this.index ? "block" : "none";
    }
  }
  _whenResize() {
    window.addEventListener("resize", () => {
      this._implementWidthToDoms();
      this._implementMove();
    });
  }
  init() {
    if (this.num > 1) {
      this._implementWidthToDoms();
      this._implementShowBox();
      this._implementMove();
      this._createSlidebtnWrap();
      this._countingClock();
      this._whenResize();
    }
  }
}

let heroSlide = new slide(document.getElementById("home-photo-slide"), 0);

heroSlide.init();

function getIOSVersion(ua) {
  ua = ua || navigator.userAgent;
  var match = ua.match(/OS ((\d+_?){2,3})\s/i);
  return match ? match[1].replace(/_/g, ".") : "unknown";
}

function isIphoneX() {
  // 判断是否是iphonex
  return (
    /iphone/gi.test(navigator.userAgent) &&
    (screen.height == 812 && screen.width == 375)
  );
}

class InputToView {
  constructor(input, { delay = 300, interval = 300 } = {}) {
    this.input =
      (typeof input).toLowerCase() == "object"
        ? input
        : document.querySelector(input);

    this.isSpecVersion = this.checkVersion();
    this.isIphoneX = isIphoneX();

    this.delay = delay;
    this.interval = interval;

    this.timer_scroll = null;

    this.init();
  }

  init() {
    this.input.addEventListener("focus", this.onFocus.bind(this));
    this.input.addEventListener("blur", this.clearSrcoll.bind(this));
  }

  onFocus() {
    if (this.isSpecVersion || this.isIphoneX) {
      // ios11.0-11.3 对scrollTop及scrolIntoView解释有bug
      // 直接执行会导致输入框滚到底部被遮挡
    } else {
      setTimeout(() => {
        this.timer_scroll = setInterval(
          this.scrollToView.bind(this),
          this.interval
        );
      }, this.delay); // 延时 == 键盘弹起需要时间
    }
  }

  scrollToView() {
    // true:元素的顶端将和其所在滚动区的可视区域的顶端对齐; false:底端对齐。
    let target = this.input;

    if (target.scrollIntoViewIfNeeded) {
      target.scrollIntoViewIfNeeded(true);
    } else {
      target.scrollIntoView(true);
    }

    document.body.scrollTop = document.body.scrollHeight;
  }

  clearSrcoll() {
    this.timer_scroll && clearInterval(this.timer_scroll);
  }

  checkVersion() {
    const iosVsn = getIOSVersion().split(".");
    return +iosVsn[0] == 11 && +iosVsn[1] >= 0 && +iosVsn[1] < 3; // 11.0 - 11.3
  }
}

export default InputToView;

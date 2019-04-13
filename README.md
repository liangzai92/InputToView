# InputToView

移动 web 开发，浏览器兼容性，虚拟键盘遮挡输入框的问题

## 问题

虚拟键盘高度稍微有点高，就会挡住底部的 input 输入框

## 用法

```js
import InputToView from "src/index.js";

let el = document.getElementById("#myInput");
let options = {
  delay: 300,
  interval: 300
};
const myInput = new InputToView(el, options);
```

## 代码

代码没做什么神奇的事情
仅仅只是给指定的 input 元素 绑定了 focus 和 blur 事件，十分简单

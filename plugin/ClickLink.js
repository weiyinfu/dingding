/**
 * 点击超链接时，在默认浏览器打开
 * 
 * 1、为什么要处理超链接？
 * 如果在钉钉本身的窗口打开，会导致难以关闭
 * 并且超链接在默认浏览器打开便于管理
 * 
 * 2、如何处理超链接打开事件？
 * 监听body的click事件，如果event.target是聊天栏的超链接，那么禁止此事件下沉。
 * 
 * 3、如何让浏览器打开超链接？
 * 调用浏览器打开超链接只能在主进程中进行，故浏览器向主进程发送点击超链接事件，使用nodejs本地功能调用默认浏览器打开超链接。
 */

(function () {
  const ipcRenderer = require('electron').ipcRenderer;

  var binded = false//此事件只绑定一次
  function isClass(element, className) {
    //元素的class是否包含className
    if (!element.className) return false
    var classNames = element.className.split(/\s+/)
    return classNames.indexOf(className) !== -1
  }
  function parent(element, className) {
    var now = element;
    while (now.tagName.toLowerCase() != 'html') {
      if (isClass(now, className)) return now;
      now = now.parentNode
    }
    return null;
  }
  function isInClass(element, className) {
    //元素是否位于某个class内
    return parent(element, className) != null;
  }
  function getParentA(element) {
    var now = element;
    while (now.tagName.toLowerCase() != 'html') {
      if (now.tagName.toLowerCase() == 'a') return now;
      now = now.parentNode
    }
    return null;
  }
  function onclick(event) {
    //绑定body的点击事件
    console.log("click")
    console.log(event)
    var a = null
    //只处理msg-bubble里面的超链接
    var messageSelector = "msg-bubble"
    if (event.target.tagName.toLowerCase() == "a" && isInClass(event.target, messageSelector)) {
      a = event.target
    }
    //点击下载图片按钮，在默认浏览器中打开
    var imageDownlodSelector = "dimmer-img-download-btn"
    if (isInClass(event.target, imageDownlodSelector)) {
      a = parent(event.target, imageDownlodSelector)
    }
    //最后一招，只要点击的对象在target里面就可以
    if (a == null) {
      a = getParentA(event.target)
    }
    if (a != null) {
      var url = a.href
      console.log(`clicked url ${url}`)
      //如果是钉钉内部的应用，则不必在浏览器打开
      if (url.indexOf('dingtalk') != -1 && url.indexOf('static.dingtalk') == -1) return
      ipcRenderer.send("clickLink", url)
      event.preventDefault()
      event.stopPropagation()
    }
  }

  function bind() {
    var contentPanel = document.querySelector("body")
    if (contentPanel)
      contentPanel.addEventListener("click", onclick, true)
    return true
  }
  function update() {
    if (binded) return
    binded = bind()

    if (!binded) {
      setTimeout(update, 1000)
    }
  }
  setTimeout(update, 1000)
})()


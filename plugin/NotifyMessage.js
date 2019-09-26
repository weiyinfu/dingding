/**
 * 消息通知
 * 
 * 1、为什么要做消息通知？
 * 浏览器钉钉虽然也有消息通知和声音，但只能在浏览器中通知。如果在其它窗口下工作，不太容易知晓新消息。
 * 
 * 2、消息通知的原理
 * 通过DOM操作监控新消息个数，只有在新消息个数增长的情况下才向用户发送通知。
 * 向用户通知时需要让用户提前看到消息的内容，故需要通过DOM操作提取未读消息。
 * 一条message形如：{user:xxx,message:xxxx,unreadNumber:xxx}
 * 对于屏蔽了的群和用户，unreadNumber=0
 * 浏览器向主进程发送新消息内容，主进程调用electron的通知函数把消息呈现给用户
 * */
(function () {
  //检查新消息的频率
  const CHECK_UNREAD_TIMEOUT = 200
  const ipcRenderer = require('electron').ipcRenderer
  //上次检查时的新消息数，只有当新消息数增多时才报警，如果新消息数变化了，该值应该立即更新

  function hasClass(ele, className) {
    return ele.className.indexOf(className) != -1
  }
  function parent(ele, className) {
    var now = ele
    if (className.startsWith(".")) {
      className = className.slice(1)
    }
    while (now.tagName.toLowerCase() != 'html') {
      if (hasClass(now, className)) {
        return now
      } else {
        now = now.parentNode
      }
    }
    return null
  }
  function getUnreadMessages() {
    var unread = document.querySelectorAll(".unread-num")
    var filteredUnread = []
    for (var unreadElement of unread) {
      var p = parent(unreadElement, '.conv-item-content')
      if (p == null) continue;
      filteredUnread.push(p)
    }
    unread = filteredUnread
    var unreadMessages = []
    for (var unreadElement of unread) {
      var unreadNumber = unreadElement.querySelector(".unread-num").innerText.trim()
      unreadNumber = unreadNumber.length == 0 ? 0 : parseInt(unreadNumber)
      var user = unreadElement.querySelector(".name").innerText.trim()
      if (!user) return []//如果用户名为空说明尚未加载成功
      var content = unreadElement.querySelector(".latest-msg").innerText.trim()
      unreadMessages.push({
        unreadNumber,
        user,
        content,
      })
    }
    return unreadMessages
  }

  function getUnreadCount() {
    const unreadCountElement = document.querySelector("#menu-pannel > ul.main-menus > li.menu-item.menu-message.selected > div > all-conv-unread-count > span")
    var unreadCount = 0
    if (unreadCountElement) {
      unreadCount = parseInt(unreadCountElement.innerText)
    }
    return unreadCount
  }
  var lastUnreadCount = 0
  function checkUnread() {
    var unreadCount = getUnreadCount()
    if (unreadCount > lastUnreadCount) {
      if (unreadCount > 0) {
        var messages = getUnreadMessages()
        if (messages.length) {
          console.log(`sending messages ${messages}`)
          ipcRenderer.send("message", messages)
        }
      }
    }
    lastUnreadCount = unreadCount
    setTimeout(checkUnread, CHECK_UNREAD_TIMEOUT);
  }
  checkUnread()
})()
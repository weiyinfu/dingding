/**网页内的JavaScript */
//检查新消息的频率
const checkUnreadTimeout = 200
const ipc = require('electron').ipcRenderer
//上次检查时的新消息数，只有当新消息数增多时才报警，如果新消息数变化了，该值应该立即更新
var lastUnreadCount = 0

function checkUnread() {
  const unreadCountElement = document.querySelector("#menu-pannel > ul.main-menus > li.menu-item.menu-message.selected > div > all-conv-unread-count > span")
  if (unreadCountElement) {
    var unreadCount = parseInt(unreadCountElement.innerText)
    if (unreadCount > lastUnreadCount) {
      ipc.send("message", unreadCount)
    }
    lastUnreadCount = unreadCount
  } else {
    lastUnreadCount = 0
  }
  setTimeout(checkUnread, checkUnreadTimeout);
}
setTimeout(checkUnread, checkUnreadTimeout)
/**
 * 当前窗口新消息事件
 * 
 * 1、功能描述
 * 现在我的钉钉正在和张三聊天，然后我就切换到了别的窗口。这时张三发来消息，钉钉不会通知我，因为我的聊天界面本身就是张三。
 * 这样就会导致我错过了一些消息。所以，当前聊天窗口的新消息也需要被通知
 * 
 * 2、实现方法
 * 监听当前主窗口的DOMNodeInserted事件。因为当前窗口可能多次切换（跟多个人聊天），所以需要一个定时器不停地给聊天主窗口绑定事件。addEventListener()会自动屏蔽掉那些已经包含了的事件处理器。
 * 需要注意，DOMNodeInserted处理的是元素插入之前的情况，这时元素的子对象可能并没有被插入，而此处需要读取当前插入元素的子元素的信息（用户、消息），所以等待一段时间，等元素插入之后再处理事件，用这种方法来假装元素插入之后。
 *  主进程通过Notification进行通知。
 */
(function () {
	const ipcRenderer = require('electron').ipcRenderer
	function hasClass(ele, className) {
		if (!ele.className) return false
		return ele.className.indexOf(className) != -1
	}
	function onCurrentWindowNewMessage(event) {
		//没有msg-bubble表明不是正经消息
		if (!hasClass(event.target, 'chat-item')) return;
		//因为此时是插入元素之前，必须等到子元素完全插入之后才能对event-target执行dom操作，所以此处delay 500ms
		const chatItem = event.target
		setTimeout(
			() => {
				var message = chatItem.querySelector('.msg-bubble').innerText.trim()
				var user = chatItem.querySelector(".chat-profile-info")
				if (!user) {
					user = chatItem.querySelector('.avatar')
				}
				user = user.innerText.trim()
				if (user.endsWith('机器人')) {
					user = user.slice(0, user.length - '机器人'.length).trim() + '-机器人'
				}
				var group = document.querySelector(".content-pannel-head .title").innerText.trim()
				const sending = {
					user,
					group,
					message
				}
				ipcRenderer.send('CurrentWindowNewMessage', sending)
			}
			, 500)

	}
	function bindEventListenerToCurrentWindow() {
		const contentPanel = document.querySelector("#content-pannel")
		if (contentPanel) {
			contentPanel.addEventListener('DOMNodeInserted', onCurrentWindowNewMessage)
		}
		setTimeout(bindEventListenerToCurrentWindow, 1000)
	}
	bindEventListenerToCurrentWindow()
})()

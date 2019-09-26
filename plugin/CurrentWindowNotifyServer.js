const electron = require("electron")
const Notification = electron.Notification

module.exports = (ipcMain, window) => {
	ipcMain.on("CurrentWindowNewMessage", (event, message) => {
		if (window.isFocused()) return//如果窗口有焦点，说明用户正在注视着当前窗口
		new Notification({
			title: `[钉钉]${message.group}`,
			subtitle: "",
			body: `【${message.user}】${message.message}`,
		}).show()
	})
}
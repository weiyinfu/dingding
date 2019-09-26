//当收到新消息时
const electron = require("electron")
const Notification = electron.Notification

function generateContent(message) {
	var totalUnread = 0
	for (var m of message) totalUnread += m.unreadNumber
	var title = `[钉钉]${totalUnread}条新消息`
	var content = ''
	for (var m of message) {
		if (m.unreadNumber) {
			content += `【${m.user}】${m.content}\n`
		}
	}
	return { title, content }
}
module.exports = (ipcMain, window) => {
	ipcMain.on("message", (event, message) => {
		var { content, title } = generateContent(message)
		new Notification({
			title: title,
			subtitle: "",
			body: content,
			icon: "./dingding.ico",
			// sound: "haha.wav"
		}).show()
	})

}
if (require.main == module) {
	//测试Notification，使用"electron 此文件"  来测试
	const app = require('electron').app
	app.on('ready', () => {
		new Notification({
			title: "title",
			subtitle: "",
			body: "body",
			icon: "./dingding.ico"
			// sound: "haha.wav"
		}).show()
	})
	setTimeout(() => {
		app.exit()
	}, 2000)
}
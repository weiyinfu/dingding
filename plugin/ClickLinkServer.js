const child_process = require('child_process');
const open = require("open")

//有两种打开默认浏览器的方式，其中第一种调用start xxx命令是不管用的
const OpenMethods = {
	openLink: (url) => {
		child_process.exec('start chrome ' + url)
	},
	openLinkByOpen: url => {
		open(url)
	},
}
const openMethod = OpenMethods.openLinkByOpen
module.exports = (ipcMain, window) => {
	ipcMain.on("clickLink", (event, url) => {
		openMethod(url)
	})
}
if (require.main == module) {
	console.log(open)
	openMethod("https://www.baidu.com")
}

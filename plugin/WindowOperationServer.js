//三个按钮事件
module.exports = (ipcMain,window) => {
	ipcMain.on('minimizeWindow', () => window.minimize())

	ipcMain.on('maximizeWindow', () => {
		if (window.isMaximized()) {
			window.unmaximize()
		} else {
			window.maximize()
		}
	})

	ipcMain.on('closeWindow', () => window.close())


}

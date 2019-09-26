/**
 * 窗口操作：包括最大化、最小化、关闭三个按钮
 */
(function () {
	const ipcRenderer = require('electron').ipcRenderer;

	const config = [{
		cssName: ".close-window",
		message: `closeWindow`
	},
	{
		cssName: ".expand-window",
		message: "maximizeWindow"
	}, {
		cssName: ".mini-window",
		message: "minimizeWindow"
	},
	]
	function update() {
		for (let conf of config) {
			document.querySelector(conf.cssName).onclick = () => {
				ipcRenderer.send(conf.message)
			}
		}
	}
	function go() {
		update()
		setTimeout(go, 1000);
	}
	go()

})()
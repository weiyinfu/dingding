const {
  app,
  BrowserWindow,
  Notification,
  ipcMain
} = require("electron")
const fs = require("fs")
const path = require("path")

//主窗口
var win = null
//只允许一个应用启动
if (!app.requestSingleInstanceLock()) {
  app.quit()
}
//当第一个应用意识到有后来者要取代它时，自动聚焦
app.on('second-instance', (event, commandLine, workingDirectory) => {
  if (win.isMinimized()) win.restore()
  win.focus()
})
app.on("ready", () => {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 800,
    height: 800*(Math.sqrt(5)-1)/2,
    frame: true, //是否显示外边框
  })
  win.loadURL("https://im.dingtalk.com")
  win.webContents.on("dom-ready", () => {
    var cssContent = fs.readFileSync(path.join(__dirname, "custom.css")).toString("utf8")
    win.webContents.insertCSS(cssContent)
    var clientJsFolder = path.join(__dirname, "client")
    for (var jsFileName of fs.readdirSync(clientJsFolder)) {
      var jsContent = fs.readFileSync(path.join(clientJsFolder, jsFileName)).toString("utf8")
      win.webContents.executeJavaScript(jsContent)
    }
  })
  win.on("closed", () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
})
// 当全部窗口关闭时退出。
app.on("window-all-closed", () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，否则绝大部分应用及其菜单栏会保持激活。故需要主动退出
  if (process.platform !== "darwin") {
    app.quit()
  }
})
app.on("activate", () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})
//当收到新消息时
ipcMain.on("message", () => {
  new Notification({
    title: "钉钉",
    subtitle: "",
    body: "有新消息",
    icon: "./dingding.ico",
    // sound: "haha.wav"
  }).show()
})

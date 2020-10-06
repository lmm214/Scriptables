// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;

const City = '宁波'
const CityTQ = await getTQ()

// 更改为 true 以重置小部件的背景。默认 false
const resetWidget = false
// 根据脚本的名称，小部件是惟一的。
const filename = Script.name() + ".jpg"
const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)
const fileExists = files.fileExists(path)
const widget = createWidget()

if (config.runsInWidget || (fileExists && !resetWidget)) {
  widget.backgroundImage = files.readImage(path)
  Script.setWidget(widget)
} else {
  // 如果是第一次运行，请设置小部件的背景。
  let img = await Photos.fromLibrary()
  files.writeImage(path, img)
  Script.complete()
}

function createWidget() {
    const w = new ListWidget()
    w.setPadding(4, 0, 0, 0)
    w.spacing = 6
    const Line1 = w.addText(`${CityTQ}`)
    Line1.font = new Font('Menlo', 12)
    return w
}

async function getTQ() {
    const CityURI = encodeURI(`${City}`);
    const url = `https://wttr.in/${CityURI}?format=3`;
    const request = new Request(url)
    const res = await request.loadString()
    return res
}



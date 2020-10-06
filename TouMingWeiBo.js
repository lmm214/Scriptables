/*
 * Author: evilbutcher
 * Github: https://github.com/evilbutcher
 * 本脚本使用了@Gideon_Senku的 Env.scriptable，感谢！
 */

const goupdate = true;
const $ = importModule("Env");
var num = 6; //自定义显示数量
var rancolor = true; //true为开启随机颜色

try {
  var { wbnum, wbrancolor } = importModule("Config");
  num = wbnum();
  rancolor = wbrancolor();
  console.log("将使用配置文件内微博配置");
} catch (e) {
  console.log("将使用脚本内微博配置");
}

const res = await getinfo();


// 更改为 true 以重置小部件的背景。默认 false
const resetWidget = false
// 根据脚本的名称，小部件是惟一的。
const filename = Script.name() + ".jpg"
const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)
const fileExists = files.fileExists(path)
const widget = createWidget(res);

if (config.runsInWidget || (fileExists && !resetWidget)) {
  widget.backgroundImage = files.readImage(path)
  Script.setWidget(widget)
} else {
  // 如果是第一次运行，请设置小部件的背景。
  let img = await Photos.fromLibrary()
  files.writeImage(path, img)
  Script.complete()
}

function createWidget(res) {
  if (res.data.cards[0].title == "实时热点，每分钟更新一次") {
    var group = res.data.cards[0]["card_group"];
    items = [];
    for (var i = 0; i < num; i++) {
      var item = group[i].desc;
      items.push(item);
    }
    console.log(items);

    const w = new ListWidget();
    
    const firstLine = w.addText(`微博热搜`);
    firstLine.font = new Font('SF Mono', 15);
    firstLine.textColor = Color.white();
    firstLine.textOpacity = 0.8;

    const top1Line = w.addText(`- ${items[0]}`);
    top1Line.font = new Font('SF Mono', 13);
    top1Line.textColor = Color.white();

    for (var i = 1; i < items.length; i++) {
      addTextToListWidget(`- ${items[i]}`, w);
    }

    w.addSpacer();
    w.spacing = 5;
    return w;
  }
}

async function getinfo() {
  const url = {
    url:
      "https://m.weibo.cn/api/container/getIndex?containerid=106003%26filter_type%3Drealtimehot",
  };
  const res = await $.get(url);
  log(res);
  return res;
}

function addTextToListWidget(text, listWidget) {
  let item = listWidget.addText(text);
  if (rancolor == true) {
    item.textColor = new Color(color16());
  } else {
    item.textColor = Color.white();
  }
  item.font = new Font('SF Mono', 12);
}

function color16() {
  var r = Math.floor(Math.random() * 256);
  if (r + 50 < 255) {
    r = r + 50;
  }
  if (r > 230 && r < 255) {
    r = r - 50;
  }
  var g = Math.floor(Math.random() * 256);
  if (g + 50 < 255) {
    g = g + 50;
  }
  if (g > 230 && g < 255) {
    g = g - 50;
  }
  var b = Math.floor(Math.random() * 256);
  if (b + 50 < 255) {
    b = b + 50;
  }
  if (b > 230 && b < 255) {
    b = b - 50;
  }
  var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}

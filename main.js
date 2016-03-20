/* eslint strict: 0 */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const electron = require('electron');
const remote = electron.remote;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const crashReporter = electron.crashReporter;
const shell = electron.shell;
const ipcMain = require('electron').ipcMain;
const nativeImage = require('electron').nativeImage;

var ElectronSettings = require('electron-settings');
var settings = new ElectronSettings({
    configDirPath: app.getPath('userData')
});

let mainWindow;
crashReporter.start();

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});



// logs
// for writing error logs
const Console = require('console').Console;

const fs = require('fs');
const output = fs.createWriteStream(app.getPath('userData') + '/user.log');
const errorOutput = fs.createWriteStream(app.getPath('userData') + '/error.log');

const logger = new Console(output, errorOutput);

process.on('uncaughtException', function (error) {
    logger.error(error);
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 728 });

  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }
});

ipcMain.on('set-badge', function(event, arg) {
  console.log('set-badge XX', arg);  // prints "ping"
  event.returnValue = 'ok';
  if (!mainWindow) return;
  let text = arg;
  if (text > 0) text = ''+arg;
  if (process.platform === "darwin") {
    app.dock.setBadge("" + text);
  } else if (process.platform === "win32") {
    var win = mainWindow;

    if (text === "") {
      win.setOverlayIcon(null, "");
      return;
    }

    // Create badge
    var canvas = document.createElement("canvas");
    canvas.height = 140;
    canvas.width = 140;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.ellipse(70, 70, 70, 70, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.textAlign = "center";
    ctx.fillStyle = "white";

    if (text.length > 2) {
      ctx.font = "75px sans-serif";
      ctx.fillText("" + text, 70, 98);
    } else if (text.length > 1) {
      ctx.font = "100px sans-serif";
      ctx.fillText("" + text, 70, 105);
    } else {
      ctx.font = "125px sans-serif";
      ctx.fillText("" + text, 70, 112);
    }

    var badgeDataURL = canvas.toDataURL();
    var img = nativeImage.createFromDataUrl(badgeDataURL);

    win.setOverlayIcon(img, text);
  }
});


/*


*/
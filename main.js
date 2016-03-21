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
  mainWindow = new BrowserWindow({ width: 1024, height: 728, icon: './app/img/talky.png' });

  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }
});

ipcMain.on('set-badge', function(event, arg) {
  if (process.platform === "darwin") {
    app.dock.setBadge(''+arg);
  }
  event.returnValue = 'ok';
});


/*


*/

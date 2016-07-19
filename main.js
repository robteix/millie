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

// handle Squirrel.Windows events
var path = require('path');
var spawn = require('child_process').spawn;
var run = function(args, done) {
  var updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe');
  spawn(updateExe, args, {
    detached: true
  }).on('close', done);
};

if (process.platform === 'win32') {
  var cmd = process.argv[1];
  var target = path.basename(process.execPath);

  if (cmd === '--squirrel-install' || cmd === '--squirrel-updated') {
    run(['--createShortcut=' + target + ''], app.quit);
    return;
  }
  if (cmd === '--squirrel-uninstall') {
    run(['--removeShortcut=' + target + ''], app.quit);
    return;
  }
  if (cmd === '--squirrel-obsolete') {
    app.quit();
    return;
  }
}


var ElectronSettings = require('electron-settings');
var settings = new ElectronSettings({
    configDirPath: app.getPath('userData')
});

let mainWindow;
crashReporter.start({
  productName: 'Millie',
  companyName: 'Delightful Code',
  submitURL: 'https://robteix.com/errors',
  autoSubmit: true
});

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
  mainWindow = new BrowserWindow({
    width: 1024, height: 728, 
    minWidth: 800, minHeight: 600,
    icon: './app/img/mili.png' });

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

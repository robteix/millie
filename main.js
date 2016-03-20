/* eslint strict: 0 */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.NODE_ENV = 'development';

const electron = require('electron');
const remote = electron.remote;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const crashReporter = electron.crashReporter;
const shell = electron.shell;

var ElectronSettings = require('electron-settings');
var settings = new ElectronSettings({
    configDirPath: app.getPath('userData')
});

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
  let mainWindow = new BrowserWindow({ width: 1024, height: 728 });

  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }
});

/* eslint strict: 0 */
'use strict';

//const remote = require('electron').remote;

//var getCurrentWindow = window.require('remote').getCurrentWindow;

import {getCurrentWindow, app, Menu} from 'electron';
import {selectService} from '../actions/millie';

const ipcRenderer = require('electron').ipcRenderer;

// focusWebview sets the focus on the webview for
// the service
export function focusWebview(serviceId) {
  if (serviceId) {
    let webViews = document.getElementsByTagName('webview');
    for (let i = 0; i < webViews.length; i++) {
      let webView = webViews[i];
      if (typeof(webView.id) === 'string' && webView.id.endsWith(serviceId)) {
        webView.focus();
        break;
      }
    }
  }
}

// setBadge sets the icon unread badge. For now this
// only works on OSX. 
export function setBadge(unread) {
  let text = '';
  if (unread > 0) text = ''+unread;
  ipcRenderer.sendSync('set-badge', text);
}

export function makeMenus(services, selectService) {
	if (services === undefined) return;
  let mainWindow = getCurrentWindow();
  if (mainWindow === undefined || mainWindow === null) {
    return;
  }
  let appName = 'Millie';

  // for OSX
  if (process.platform === 'darwin') {
  	let appMenu = {
      label: appName,
      submenu: [{
        label: 'About ' + appName,
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide ElectronReact',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    };
    let editMenu = {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    };
    let viewMenu = {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    };

	let servicesMenu = [{
    label: 'Millie',
      accelerator: 'Command+1',
      click() {
        selectService('millie');
      }
    }];
	let c = 2;
	for (let key of Object.keys(services)) {
		let s = services[key];
    	if (c > 9) break;
    	servicesMenu.push({
	        label: s.title,
	        accelerator: 'Command+'+c++,
	        click() {
	          console.log('Selected!! -> ' + s.id);
	          selectService(s.id);
	        }
    	});
    }
    if (servicesMenu.length > 0) {
    	viewMenu.submenu.push({'type':'separator'}, ...servicesMenu);
    }

    let windowMenu = {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    };

    let helpMenu = {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
      }]
    };

    let menuTemplate = [
    	appMenu,
    	editMenu,
    	viewMenu,
    	windowMenu,
    	helpMenu,
    ];

    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
  } else {

    /************
     *   WINDOWS AND LINUX
     ************/ 
    let fileMenu = {
      label: '&File',
      submenu: [{
        label: 'Close',
        accelerator: 'Alt+F4',
        click() {
          app.quit();
        }
      }]
    };
    let editMenu = {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Control+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Control+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Control+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Control+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Control+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Control+A',
        selector: 'selectAll:'
      }]
    };
    let viewMenu = {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Control+R',
        click() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Control+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Control+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Control+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    };

  let servicesMenu = [{
    label: 'Millie',
      accelerator: 'Control+1',
      click() {
        selectService('millie');
      }
    }];
  let c = 2;
  for (let key of Object.keys(services)) {
    let s = services[key];
      if (c > 9) break;
      servicesMenu.push({
          label: s.title,
          accelerator: 'Control+'+c++,
          click() {
            selectService(s.id);
          }
      });
    }
    if (servicesMenu.length > 0) {
      viewMenu.submenu.push({'type':'separator'}, ...servicesMenu);
    }

    let helpMenu = {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
      }]
    };

    let menuTemplate = [
      fileMenu,
      editMenu,
      viewMenu,
      helpMenu,
    ];    


    let menu = Menu.buildFromTemplate(menuTemplate);
    mainWindow.setMenu(menu);
    Menu.setApplicationMenu(menu);
  }
}

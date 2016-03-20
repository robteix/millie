/* eslint strict: 0 */
'use strict';

import {getCurrentWindow, app, Menu} from 'remote';
import {selectService} from '../actions/talky';

export function setBadge(unread) {
  let text = '';
  if (unread > 0) text = ''+unread;
  if (process.platform === "darwin") {
    app.dock.setBadge("" + text);
  } else if (process.platform === "win32") {
    var win = remote.getCurrentWindow();

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
    var img = NativeImage.createFromDataUrl(badgeDataURL);

    win.setOverlayIcon(img, text);
  }
}

export function makeMenus(services, selectService) {
	if (services === undefined) return;
  let mainWindow = getCurrentWindow();
  if (mainWindow === undefined || mainWindow === null) {
    return;
  }
  let appName = 'Talky';

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
    label: 'Talky',
      accelerator: 'Command+1',
      click() {
        selectService('talky');
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
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click() {
          mainWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
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
    }];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
    Menu.setApplicationMenu(menu);
  }
}
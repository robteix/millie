'use strict';

const ipcRenderer = require("electron").ipcRenderer;

function getCount() {
    let count = 0;
    let elm = document.getElementsByClassName("_5fx8");
    if (elm !== null && elm !== undefined)
    	count = elm.length;
    ipcRenderer.sendToHost("message-count", count);
}

document.addEventListener("DOMContentLoaded", function() {
	setInterval(getCount, 3000);
});

ipcRenderer.on("deleteNotification", function() {
	delete window.Notification;
});

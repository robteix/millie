'use strict';

const ipcRenderer = require("electron").ipcRenderer;

function getCount() {
    let count = 0;
    let badges = document.getElementsByClassName("_5fx8");
    for (let i = 0; i < badges.length; i++) {
    	let n = parseInt(badges.item(i).innerHTML) || 0;
		count+=n;
    }
    ipcRenderer.sendToHost("message-count", count);


}

document.addEventListener("DOMContentLoaded", function() {
	setInterval(getCount, 3000);
});

ipcRenderer.on("deleteNotification", function() {
	delete window.Notification;
});

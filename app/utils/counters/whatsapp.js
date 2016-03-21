'use strict';

const ipcRenderer = require("electron").ipcRenderer;

// getCount tries to parse the number of unread messages in whatsapp.
// The whatsapp web app keeps the unread count in an element with class
// unread-count.
function getCount() {
    let count = 0;
    let badges = document.getElementsByClassName("unread-count");
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

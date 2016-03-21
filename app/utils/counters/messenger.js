'use strict';

const ipcRenderer = require("electron").ipcRenderer;
let __messageCount = -1;

// getCount tries to count unread messages. messenger.com
// doesn't display the information, but it sets the 
// conversation to bold with class _5fx8. We can count
// how many convos have this class.
function getCount() {
    let count = 0;
    let elm = document.getElementsByClassName("_5fx8");
    if (elm) {
    	count = elm.length;
    }
    if (count !== __messageCount) {
    	__messageCount = count;
    	ipcRenderer.sendToHost("message-count", count);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	setInterval(getCount, 3000);
});

ipcRenderer.on("deleteNotification", function() {
	delete window.Notification;
});

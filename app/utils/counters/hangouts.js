'use strict';

const ipcRenderer = require("electron").ipcRenderer;

let __messageCount = -1;

function getCount() {
    let count = 0;
    let badges = document.getElementsByClassName("_5fx8");
    for (let i = 0; i < badges.length; i++) {
    	let n = parseInt(badges.item(i).innerHTML) || 0;
		count+=n;
    }
    if (count !== __messageCount) {
    	__messageCount = count;
    	ipcRenderer.sendToHost("message-count", count);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	setInterval(getCount, 2000);
});
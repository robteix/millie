'use strict';

const ipcRenderer = require("electron").ipcRenderer;

let __messageCount = -1;

// getCount finds how many unread messages are available.
//
// Telegram web displays the information as a little badge by each
// conversation like this:
//
//   <span class="im_dialog_badge badge ng-binding" 
//         ng-show="dialogMessage.unreadCount > 0 &amp;&amp; !dialogMessage.pFlags.out"
//         ng-bind="dialogMessage.unreadCount" my-peer-muted="dialogMessage.peerID"
//         muted-class="im_dialog_badge_muted">
//       1
//   </span>
//
// So we need to look for every im_dialog_badge, grab its inner HTML,
// and the total sum is the number of unread messages.
function getCount() {
    let count = 0;
    let badges = document.getElementsByClassName("im_dialog_badge");
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
	setInterval(getCount, 3000)
});

ipcRenderer.on("deleteNotification", function() {
	delete window.Notification
});

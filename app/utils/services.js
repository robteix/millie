
const services = {
	'talky': {
		title: 'Talky',
		icon: './img/talky.png',
	},
	'hangouts': {
		title: 'Google Hangouts',
		icon: './img/hangouts.png',
	},
	'messenger': {
		title: 'Messenger',
		icon: './img/messenger.png',
	},
	'skype': {
		title: 'Skype',
		icon: './img/skype.png',
	},
	'telegram': {
		title: 'Telegram',
		icon: './img/telegram.png',
	},
	'whatsapp': {
		title: 'Whatsapp',
		icon: './img/whatsapp.png',
	}
};

export default class Services {
	static toArray(ignoreTalky = true) {
		let arr = [];
		for (let id in services) {
			if (!services.hasOwnProperty(id)) continue;
			if (ignoreTalky && id === 'talky') continue;
			arr.push(Object.assign({}, services[id], {id: id}));
		}

		return arr;
	}

	static all() {
		return Object.assign({}, services);
	}

	static talky() {
		return this.service('talky');
	}

	static service(id) {
		if (!services.hasOwnProperty(id)) {
			return null;
		}
		return Object.assign({}, services[id], {id: id});
	}
};
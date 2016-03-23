
const services = {
	'millie': {
		title: 'Millie',
		icon: './img/millie.png',
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
	'slack': {
		title: 'Slack',
		icon: './img/slack.png',
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
	static toArray(ignoreMillie = true) {
		let arr = [];
		for (let id in services) {
			if (!services.hasOwnProperty(id)) continue;
			if (ignoreMillie && id === 'millie') continue;
			arr.push(Object.assign({}, services[id], {id: id}));
		}

		return arr;
	}

	static all() {
		return Object.assign({}, services);
	}

	static millie() {
		return this.service('millie');
	}

	static service(id) {
		if (!services.hasOwnProperty(id)) {
			return null;
		}
		return Object.assign({}, services[id], {id: id});
	}
};

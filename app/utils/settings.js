import ElectronSettings from 'electron-settings';


const app = require('electron').remote.app;

let settings = new ElectronSettings({
    configDirPath: app.getPath('userData')
});

export function get(keyPath) {
	return settings.get(keyPath);
}

export function set(keyPath, value) {
	return settings.set(keyPath, value);
}

export default function settings() {
	return settings;
}

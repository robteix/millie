import ElectronSettings from 'electron-settings';
import {app} from 'remote';

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

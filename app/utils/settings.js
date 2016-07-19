import ElectronSettings from 'electron-settings';

let settings = new ElectronSettings();

export function get(keyPath) {
	return settings.get(keyPath);
}

export function set(keyPath, value) {
	return settings.set(keyPath, value);
}

export default function settings() {
	return settings;
}

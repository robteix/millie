'use strict';

const electron = require('electron');
const exists = require('file-exists');
const fs = require('fs-extra');
const path = require('path');

const app = electron.app || electron.remote.app;

class Settings {
	constructor() {
		this._defaults = {};
		this._settings = this.__readSettings();
	}

	get(key) {
		return this._settings[key];
	}

	set(key, value) {
		// reread the file
		this._settings = this.__readSettings();
		this._settings[key] = value;
		this.__writeSettings(this._settings);
	}

	filePath() {
		const userData = app.getPath('userData');
		return path.join(userData, Settings.FileName);
	}

	__readSettings() {
		const fp = this.filePath();
		console.log(`reading file ${fp}`);
		try {
			return fs.readJsonSync(fp) || this._defaults;
		} catch (e) {
			console.log(`error reading file: ${e}`);
			return this._defaults;
		}
	}

	__writeSettings(obj) {
		try {
			fs.outputJsonSync(this.filePath(), obj);			
		} catch (e) {
			console.log(`ERROR: failed to write config file`)
		}
	}
};

Settings.FileName = 'settings.json';
Settings.Instance = new Settings();

module.exports = Settings.Instance;

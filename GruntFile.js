var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    'create-windows-installer': {
      ia32: {
        appDirectory: path.join(path.resolve(), 'release', 'Millie-win32-ia32'),
        outputDirectory: path.join(path.resolve(), 'release'),
        name: 'Millie',
        title: 'Millie',
        description: 'Millie',
        authors: 'Roberto Selbach Teixeira',
        exe: 'Millie.exe',
        noMsi: true,
        setupIcon: path.join(path.resolve(), 'app', 'img', 'app.ico'),
        iconUrl: 'https://raw.githubusercontent.com/robteix/millie/master/app/img/app.ico',
        loadingGif: path.join(path.resolve(), 'app', 'img', 'heart.gif')
      },
      x64: {
        appDirectory: path.join(path.resolve(), 'release', 'Millie-win32-x64'),
        outputDirectory: path.join(path.resolve(), 'release'),
        name: 'Millie',
        title: 'Millie',
        description: 'Millie',
        authors: 'Roberto Selbach Teixeira',
        exe: 'Millie.exe',
        noMsi: true,
        setupIcon: path.join(path.resolve(), 'app', 'img', 'app.ico'),
        iconUrl: 'https://raw.githubusercontent.com/robteix/millie/master/app/img/app.ico',
        loadingGif: path.join(path.resolve(), 'app', 'img', 'heart.gif')
      }
    }
  });

  grunt.loadNpmTasks('grunt-electron-installer');
};

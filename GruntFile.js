module.exports = function(grunt) {
  grunt.initConfig({
    'create-windows-installer': {
      ia32: {
        appDirectory: './release/Mini-win32-ia32',
        outputDirectory: './release',
        name: 'Mili',
        description: 'Mili',
        authors: 'Roberto Selbach Teixeira',
        exe: 'Mili.exe'
      },
      x64: {
        appDirectory: './release/Mili-win32-x64',
        outputDirectory: './release',
        name: 'Mili',
        description: 'Mili',
        authors: 'Roberto Selbach Teixeira',
        exe: 'Mili.exe'
      }
    }
  });

  grunt.loadNpmTasks('grunt-electron-installer');
};
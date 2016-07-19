module.exports = function(grunt) {
  grunt.initConfig({
    'create-windows-installer': {
      ia32: {
        appDirectory: './release/win32-ia32/Millie-win32-ia32',
        outputDirectory: './release',
        name: 'Millie',
        description: 'Millie',
        authors: 'Roberto Selbach Teixeira',
        exe: 'Millie.exe'
      },
      x64: {
        appDirectory: './release/win32-x64/Millie-win32-x64',
        outputDirectory: './release',
        name: 'Millie',
        description: 'Millie',
        authors: 'Roberto Selbach Teixeira',
        exe: 'Millie.exe'
      }
    }
  });

  grunt.loadNpmTasks('grunt-electron-installer');
};
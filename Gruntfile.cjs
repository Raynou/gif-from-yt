module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    shell: {
      buildClient: {
        command: "vite build",
      },
    },
    copy: {
      server: {
        expand: true,
        cwd: "server",
        src: "*",
        dest: "dist",
      },
    },
  });
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.registerTask("build", ["shell:buildClient", "copy:server"]);
};

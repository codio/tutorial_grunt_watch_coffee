// @annotation:tour gruntfile

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // @annotation:/snippet task-clean        
        clean: {
            build: ['compiled']
        },
        // @annotation:/snippet task-clean
        
        // @annotation:snippet task-copy
        copy: {
            main: {
                files: [{
                    dest: 'compiled/',
                    src: ['**'],
                    cwd: 'source/',
                    expand: true
                }]
            }
        },
        // @annotation:/snippet task-copy
        
        coffee: {
            options: {
                bare: true
            },            
            files: {
                expand: true,
                flatten: false,
                cwd: 'source',
                src: ['**/*.coffee'],
                dest: 'compiled',
                ext: '.js'
            },
        },

        watch: {
            app: {
                files: '**/*.coffee',
                tasks: ['newer:coffee']
            }
        }

        // @annotation:/tour grunt-tasks
            
    });
    
    // @annotation:tour load-tasks 
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-coffee');  
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');    
    // @annotation:/tour load-tasks
    
    // @annotation:tour register-tasks
    grunt.registerTask('default', ['clean', 'coffee']);
    // @annotation:/tour register-tasks

};

// @annotation:/tour gruntfile
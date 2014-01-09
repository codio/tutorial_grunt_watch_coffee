
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Remove compiled folder
        clean: {
            build: ['compiled']
        },
        
        // @annotation:tour coffee
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
        // @annotation:/tour coffee

        // @annotation:tour watch
        watch: {
            app: {
                files: '**/*.coffee',
                tasks: ['newer:coffee']
            }
        }    
        // @annotation:/tour watch
            
    });
    
    // @annotation:tour event
    grunt.event.on('watch', function(action, filepath, target) {
        // Do something custom whenever a file changes
        console.log('\nCUSTOM MESSAGE: Action=' + action + '  Path=' + filepath + '  Target=' + target);
    } ); 
    // @annotation:/tour event

    // @annotation:tour load
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');  
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');    
    // @annotation:/tour load
    
    // @annotation:tour register
    grunt.registerTask('default', ['clean', 'coffee']);
    // @annotation:/tour register
};

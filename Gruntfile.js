//TODO: theme split, ally testing, actual build pipeline.

const generateStaticFile = require('./StaticFileCreator.js');

/// ************************************************************
/// Optional command line options:
///    --cdts_version=<version>                     (e.g. --cdts_version=v4_0_40)
///    --cdts_samples_cdnenv=<environment name>     (e.g. --cdts_samples_cdnenv=esdcprod)
///
/// ************************************************************
module.exports = function(grunt) {
    
    //---[ Content replacing function (in copy and concat tasks)
    //(replaces CDTS version mentions in URLs and optionally environment in sample pages.)
    function cdtsContentReplace(content, srcpath) {
        const newVersionName = grunt.config('project.version_name');
        const newEnvironment = grunt.option('cdts_samples_cdnenv') || null;
        
        //Replace version...
        var vtr = content.replace(/\/v[0-9]+_[0-9]+_[0-9]+\//g, `/${newVersionName}/`); //replaces '/vX_X_X/' where X can be any number
        
        //Replace environment in sample pages...
        if (newEnvironment && (srcpath.includes('/samples/') || srcpath.includes('/appTop/'))) {
            vtr = vtr.replace(/"cdnEnv": "esdcprod"/g, `"cdnEnv": "${newEnvironment}"`); 
        }
        
        return vtr;
    }
    
    //---[ Grunt Modules
    //(Note that there is a module called 'grunt-soy-compile', but it has a bug in our situation because we do message translation on multiple files, so we'll be using grunt-run-java instead)
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin'); //could consider minifying cdts/*.css
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-run-java'); //https://www.npmjs.com/package/grunt-run-java  Compiler: https://code.google.com/archive/p/closure-templates/downloads?page=1, https://repo1.maven.org/maven2/com/google/template/soy/
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-webdriver');
    
    //---[ Task Definitions
    grunt.registerTask('default', 'Default task (performs a dev build)', ['build']);
    grunt.registerTask('build', 'Run non-minified build', ['clean', 'copy-public', 'build-soy', 'genstatic']);
    grunt.registerTask('copy-public', 'Copy all public files', ['copy:wet', 'copy:gcweb-public', 'copy:gcintranet-public', 'copy:global-public']);
    grunt.registerTask('copy-test', 'Copy all test files', ['copy:gcweb-test', 'copy:gcintranet-test']);
    grunt.registerTask('compile-soy', 'Compile soy templates', ['i18n-soy', 'run_java:gcweb', 'run_java:gcintranet']);
    grunt.registerTask('i18n-soy', 'Process soy template for translation', ['run_java:extractmsg-gcweb', 'run_java:extractmsg-gcintranet', 'exec:translate-gcweb', 'exec:translate-gcintranet', 'i18n-verify']);
    grunt.registerTask('build-soy', 'Produce Javascript from soy templates', ['compile-soy', 'concat']);
    grunt.registerTask('build-prod', 'Run production build', ['build', 'minify']);
    grunt.registerTask('minify', 'Minify target files', ['uglify']);
    
    grunt.registerTask('serve', 'Start development web server', ['build', 'copy-test', 'connect', 'watch']);
    grunt.registerTask('serve-nobuild', 'Start development web server on current build (USE WITH CAUTION, only use with known state of directories dist and tmp)', ['nobuild-warning', 'connect', 'watch']);
    grunt.registerTask('test', 'Start dev web server and run tests', ['setenv', 'build', 'copy-test', 'connect', 'webdriver:maintests']); //NOTE: should we do a build-prod instead?

    grunt.registerTask('nobuild-warning', 'Issue a warning on screen about using serve-nobuild', function() {
        grunt.log.writeln('***** WARNING ***** When using "serve-nobuild", you have to be sure that the directories "dist" and "tmp" are in a known good state (as they would be after a build)');
        grunt.log.writeln('                If ./dist and ./tmp are not consistent with a proper build, you may experience unexpected runtime errors.');
    });

    grunt.registerTask('setenv', 'Set environment variable from grunt configuration', function(target) {
        if (!target || target === 'test') {
            process.env.CDTS_TEST_VERSION_NAME = grunt.config('project.version_name');
        }
    });
    
    //---[ Can get called with 'i18n-verify', 'i18n-verify:gcweb' or 'i18n-verify:gcintranet'
    grunt.registerTask('i18n-verify', 'Checks for untranslated messages in translation files.', function(target) {
        const domParser = require('xmldom').DOMParser;
        const xpath = require('xpath');
        const fs = require('fs');

        let success = true;
        const xpathSelect = xpath.useNamespaces({"def": "urn:oasis:names:tc:xliff:document:1.2"});

        (target? [target]: ['gcweb', 'gcintranet']).forEach((themeName) => {
            const parser = new domParser();
            const englishFileName = `./src/${themeName}/wet-messages.en.xlf`;
            const frenchFileName = `./src/${themeName}/wet-messages.fr.xlf`;
            const englishXmlDoc = parser.parseFromString(fs.readFileSync(englishFileName, 'utf8'));
            const frenchXmlDoc = parser.parseFromString(fs.readFileSync(frenchFileName, 'utf8'));
            
            //(first, a sanity check to make sure our lookups actually work (ie that file format hasn't changed))
            //(should at least have 1 translated message - will fail if no message has been translated yet)
            const controlTestResults = xpathSelect('//def:trans-unit[./def:target[@state="final"]]/@id', frenchXmlDoc);
            if (controlTestResults.length <= 0) {
                throw new Error('Unexpected empty translated message list, double-check the XPATH in Gruntfile.js (or is this the very first time transaction generation is done?)');
            }
            
            //(check to see if french files contains obsolete/unused keys)
            const frenchKeys = xpathSelect('//def:trans-unit/@id', frenchXmlDoc);
            for (let i=0; i<frenchKeys.length; i++) {
                if (xpathSelect(`//def:trans-unit[@id=${frenchKeys[i].nodeValue}]`, englishXmlDoc).length <= 0) {
                    grunt.log.warn(`WARNING: Found an entry in [${frenchFileName}] that is no longer found in [${englishFileName}], it should be removed. Key=[${frenchKeys[i].nodeValue}]`);
                }
            }

            //(select id of trans-unit elements whose target are not marked "final"
            const results = xpathSelect('//def:trans-unit[./def:target[@state!="final"]]/@id', frenchXmlDoc);
            if (results.length > 0) {
                grunt.log.error(`ERROR: Found ${results.length} untranslated message(s) in [${frenchFileName}], id(s): ${results.map((item) => item.nodeValue).join(', ')}`);
                success = false;
            }
        });

        return success;
    });
    
    //---[ Can get called with 'genstatic', 'genstatic:gcweb' or 'genstatic:gcintranet'
    grunt.registerTask('genstatic', 'Generate static fallback files.', function(target) {
        const fs = require('fs');
        const path = require('path');
        const definitionPath = './src/fallbackFileDefinitions';
        
        grunt.log.writeln('--- Generating static fallback files...', target || '<all>');
        
        ['gcweb', 'gcintranet'].forEach((themeName) => {
            //(if target specified, only run for that one)
            if ( (!target) || (themeName === target) ) {
                const files = fs.readdirSync(definitionPath);
                
                grunt.log.writeln(`---   ${themeName}: Processing ${files.length} definition file(s)...`);
                
                files.forEach((fallbackFile) => {
                    const fallbackFileDefPath = `${definitionPath}/${fallbackFile}`;
                    
                    const getStaticFileDefinition = require(fallbackFileDefPath);
                    
                    generateStaticFile(grunt, themeName, path.basename(fallbackFile, path.extname(fallbackFile)), getStaticFileDefinition);
                });
            }
        });
    });
    
    //---[ Configuration
    grunt.util.linefeed = '\n';
    grunt.initConfig({
        //---[ Global Configuration Properties
        project: {
            pkg: grunt.file.readJSON('package.json'),
            version_name: grunt.option('cdts_version') || 'v<%= project.pkg.version.replace(/\\./g, "_")%>',
            target: './dist/app/cls/WET',
            temp: './tmp',
            banner:  '/*!\n * Centrally Deployed Templates Solution (CDTS) / Solution de gabarits à déploiement centralisé (SGDC)\n' +
                        ' * Version <%= project.pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n *\n */',
        },
        
        clean: {
            target: '<%= project.target %>',
            temp: '<%= project.temp %>',
        },

        copy: {
            wet: {
                files: [
                    {cwd: 'public/wet', src: ['**'], dest:'<%= project.target %>/gcweb/<%= project.version_name %>', expand: true},
                    {cwd: 'public/wet', src: ['**'], dest:'<%= project.target %>/gcintranet/<%= project.version_name %>', expand: true},
                ],
            },
            'gcweb-public': {
                files: [
                    {cwd: 'public/gcweb', src: ['**'], dest:'<%= project.target %>/gcweb/<%= project.version_name %>/cdts', expand: true},
                    {cwd: 'public/common', src: ['**'], dest:'<%= project.target %>/gcweb/<%= project.version_name %>', expand: true},
                ],
                options: {
                    process: cdtsContentReplace,
                },
            },
            'gcintranet-public': {
                files: [
                    {cwd: 'public/gcintranet', src: ['**'], dest:'<%= project.target %>/gcintranet/<%= project.version_name %>/cdts', expand: true},
                    {cwd: 'public/common', src: ['**'], dest:'<%= project.target %>/gcintranet/<%= project.version_name %>', expand: true},
                ],
                options: {
                    process: cdtsContentReplace,
                },
            },
            'global-public': {
                files: [
                    {cwd: 'public/global', src: ['**'], dest:'<%= project.target %>/global', expand: true}
                ]
            },
            'gcweb-test': {
                files: [
                    {cwd: 'test/html/gcweb', src: ['**'], dest:'<%= project.target %>/gcweb/<%= project.version_name %>/cdts/test', expand: true}
                ],
                options: {
                    process: cdtsContentReplace,
                },
            },
            'gcintranet-test': {
                files: [
                    {cwd: 'test/html/gcintranet', src: ['**'], dest:'<%= project.target %>/gcintranet/<%= project.version_name %>/cdts/test', expand: true}
                ],
                options: {
                    process: cdtsContentReplace,
                },
            },
        },

        run_java: {
            'extractmsg-gcweb': {
                command: 'java',
                jarName: 'compilers/SoyMsgExtractor.jar',
                javaArgs: '--outputFile ./src/gcweb/wet-messages.en.xlf --targetLocaleString en --sourceLocaleString en --srcs ./src/gcweb/appPage.soy,./src/gcweb/wet.soy,./src/gcweb/serverPage.soy',
            },
            'extractmsg-gcintranet': {
                command: 'java',
                jarName: 'compilers/SoyMsgExtractor.jar',
                javaArgs: '--outputFile ./src/gcintranet/wet-messages.en.xlf --targetLocaleString en --sourceLocaleString en --srcs ./src/gcintranet/wet.soy,./src/gcintranet/serverPage.soy',
            },
            'gcweb': {
                command: 'java',
                jarName: 'compilers/SoyToJsSrcCompiler.jar',
                javaArgs: '--outputPathFormat <%= project.temp %>/gcweb/wet-{LOCALE}.js --messageFilePathFormat ./src/gcweb/wet-messages.{LOCALE}.xlf --locales en,fr --srcs ./src/gcweb/appPage.soy,./src/gcweb/wet.soy,./src/gcweb/serverPage.soy',
            },
            'gcintranet': {
                command: 'java',
                jarName: 'compilers/SoyToJsSrcCompiler.jar',
                javaArgs: '--outputPathFormat <%= project.temp %>/gcintranet/wet-{LOCALE}.js --messageFilePathFormat ./src/gcintranet/wet-messages.{LOCALE}.xlf --locales en,fr --srcs ./src/gcintranet/wet.soy,./src/gcintranet/serverPage.soy',
            },
        },
        exec: {
            //https://github.com/martinroob/ngx-i18nsupport/tree/master/projects/xliffmerge
            'translate-gcweb': {
                command: 'npx xliffmerge --profile ./src/gcweb/xliffmerge.conf.json',
            },
            'translate-gcintranet': {
                command: 'npx xliffmerge --profile ./src/gcintranet/xliffmerge.conf.json',
            },
        },
        
        concat: {
            options: {
                banner: '<%= project.banner %>',
                stripBanners: false,
                process: cdtsContentReplace,
            },
            'gcweb-en': {
                src: ['<%= project.temp %>/gcweb/wet-en.js', './src/common/*.js'],
                dest: '<%= project.target %>/gcweb/<%= project.version_name %>/cdts/compiled/wet-en.js',
            },
            'gcweb-fr': {
                src: ['<%= project.temp %>/gcweb/wet-fr.js', './src/common/*.js'],
                dest: '<%= project.target %>/gcweb/<%= project.version_name %>/cdts/compiled/wet-fr.js',
            },
            'gcintranet-en': {
                src: ['<%= project.temp %>/gcintranet/wet-en.js', './src/common/*.js'],
                dest: '<%= project.target %>/gcintranet/<%= project.version_name %>/cdts/compiled/wet-en.js',
            },
            'gcintranet-fr': {
                src: ['<%= project.temp %>/gcintranet/wet-fr.js', './src/common/*.js'],
                dest: '<%= project.target %>/gcintranet/<%= project.version_name %>/cdts/compiled/wet-fr.js',
            },
        },
        
        uglify: {
            options: {
                sourceMap: true,
                output: {comments: false},
                banner: '<%= project.banner %>'
            },
            gcweb: {
                cwd: '<%= project.target %>/gcweb/<%= project.version_name %>/cdts/compiled',
                src: ['wet-en.js', 'wet-fr.js'],
                dest: '<%= project.target %>/gcweb/<%= project.version_name %>/cdts/compiled',
                ext: '.js',
                expand:true,
            },
            gcintranet: {
                cwd: '<%= project.target %>/gcintranet/<%= project.version_name %>/cdts/compiled',
                src: ['wet-en.js', 'wet-fr.js'],
                dest: '<%= project.target %>/gcintranet/<%= project.version_name %>/cdts/compiled',
                ext: '.js',
                expand:true,
            },
        },
  
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './dist',
                },
            },
        },

        watch: {
            options: {
                spawn: true,
                interrupt: false,
            },
            'gcweb-public': {
                files: ['./public/gcweb/**', './public/common/**'],
                tasks: ['copy:gcweb-public'],
            },
            'gcintranet-public': {
                files: ['./public/gcintranet/**', './public/common/**'],
                tasks: ['copy:gcintranet-public'],
            },
            'global-public': {
                files: ['./public/global/**'],
                tasks: ['copy:global-public'],
            },
            'gcweb-test': {
                files: ['./test/html/gcweb/**'],
                tasks: ['copy:gcweb-test'],
            },
            'gcintranet-test': {
                files: ['./test/html/gcintranet/**'],
                tasks: ['copy:gcintranet-test'],
            },
            'gcweb-soy': {
                files: ['./src/gcweb/*.soy', './src/common/*.js'],
                //Note that in watch, we extract the messages and trigger translation script, but we do not run i18n-verify to cause of failure on untranslated message - we don't want to interrupt the dev server.
                tasks: ['run_java:extractmsg-gcweb', 'exec:translate-gcweb', 'run_java:gcweb', 'closure-compiler:gcweb-en', 'concat:gcweb-en', 'closure-compiler:gcweb-fr', 'concat:gcweb-fr', 'genstatic:gcweb'],
            },
            'gcweb-fr-xlf': {
                files: ['./src/gcweb/wet-messages.fr.xlf'],
                tasks: ['run_java:gcweb', 'closure-compiler:gcweb-fr', 'concat:gcweb-fr', 'genstatic:gcweb'],
            },
            'gcintranet-soy': {
                files: ['./src/gcintranet/*.soy', './src/common/*.js'],
                //Note that in watch, we extract the messages and trigger translation script, but we do not run i18n-verify to cause of failure on untranslated message - we don't want to interrupt the dev server.
                tasks: ['run_java:extractmsg-gcintranet', 'exec:translate-gcintranet', 'run_java:gcintranet', 'closure-compiler:gcintranet-en', 'concat:gcintranet-en', 'closure-compiler:gcintranet-fr', 'concat:gcintranet-fr', 'genstatic:gcintranet'],
            },
            'gcintranet-fr-xlf': {
                files: ['./src/gcintranet/wet-messages.fr.xlf'],
                tasks: ['run_java:gcintranet', 'closure-compiler:gcintranet-fr', 'concat:gcintranet-fr', 'genstatic:gcintranet'],
            },
        },
        
        webdriver: {
            maintests: {
                configFile: './wdio.conf.js',
            },
        },
    });     
};
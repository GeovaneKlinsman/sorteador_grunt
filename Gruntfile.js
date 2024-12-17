module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {                      //nessa opção estamos desenvolvendo e reproduzindo localmente na maquina
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {                       //nessa opção é o ambiente final na linha de produção vai minificar nosso arquivo css...
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComents: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less'); //essa é a chamada do less para ser carregado nossos arquivos
    grunt.loadNpmTasks('grunt-contrib-watch'); //pluguin para não precisar digitar comando npm run grunt...
    grunt.loadNpmTasks('grunt-replace'); //pluguin para copiar os arquivos e mover para pastas criadas
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); //pluguin para minificar o html
    grunt.loadNpmTasks('grunt-contrib-clean');  //pluguin para apagar pastas
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']); //essa tarefa é a padrão que o grunt exige não precisanos mais referenciar a função com o final olaGrunt como é um array devido as [] podemos referenciar o less e o sass
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}
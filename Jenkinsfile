pipeline {
    
    environment {
        CI = 'true'
    }

    agent {
        docker {
            image 'node:10'
            args '-p 3000:3000'
        }
    }

    stages {
        stage('lint test') {
            steps {
                sh 'npm install'
                sh 'npm run lint'
                
                fileExists 'Dockerfile'
            }
        }

        stage( 'build app') {
            steps {
                script{
                    app = docker.build("dummyapi:${env.BUILD_ID}")
                }
            
                
                // sh 'node ./src/ &'
            }

        stage('Test_node10') {
            steps {
                sh 'docker run -p 3001:3001 dummyapi'
                sh 'npm test'
                sh 'mv ./index.html ./coverage.html'
                publishHTML target: [
                allowMissing: true,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: '.',
                reportFiles: 'lint.html, coverage.html, tests.html',
                reportName: 'Coverage Report'
                ]
            }
        }
    }

    post {
            // always {
            //     echo 'This has finished so I am cleaning workspace'
            //     deleteDir() /* clean up our workspace */
            // }
            success {
                echo 'I succeeded!'

            }
            unstable {
                echo 'I am unstable :/'
            }
            failure {
                echo 'I failed :('
            }
            fixed {
                echo 'Things have improved on previous run...'
            }
        }
    }

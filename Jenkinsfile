pipeline {

    agent any
    
    environment {
        CI = 'true'
    }

    // agent {
    //     docker {
    //         image 'node:10'
    //         args '-p 3000:3000'
    //         }
    //     }
    options{
        timestamps()
    }

    stages {

// via docker node  - run app and tests
        stage('lint and run jest tests') {
            agent {
                docker {
                    image 'node:10'
                    args '-p 3000:3000'
                    }
                }

            steps {
                sh 'node --version'
                sh 'npm install'
                sh 'npm run lint'
                sh 'node ./src/ &'
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


// This builds/tags image via dockerfile
        stage('Build image') {
            agent { dockerfile true }
            steps {
                sh 'docker --version'
                echo 'Built image is tagged :latest'
            }
        }
    }

// pick up latest tagged image and push to dockerhub
        // stage() {
            //  steps {
            //      sh 'docker run -it -p 3001:3001  -d dummyapi'
            //      }
            //  }   
        // }
    post {
    
        always {
            echo 'This has finished so I am cleaning workspace'
            deleteDir() /* clean up our workspace */
        }
        success {
            echo 'I succeeded! :-) :-) :-)'

        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I failed :('
        }
        fixed {
            echo 'Things have improved on previous run... :-)'
        }
    }
}
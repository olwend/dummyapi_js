pipeline {

    environment {
        registry = "olwend/dummyapi"
        registryCredential = 'dockerhub'
        CI = 'true'
  }

    agent any   

    options{
        timestamps()
    }

    stages {

// via docker node  - run app and tests
        stage('lint and run jest tests') {
            agent {
                docker {
                    image 'node:10-slim'
                    }
                }

            steps {
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
            steps {
                script {
                    app = docker.build registry + ":$BUILD_NUMBER"
                }
                echo 'Built image is olwend/dummyapi'
            }
        }

// pick up latest tagged image and push to dockerhub
        stage('push to docker hub') {
             steps {
                //  sh 'docker push olwend/dummyapi:latest'
                sh 'app.push'
                 echo 'Pushing to repository'
            }
        }   
    }

    post {
    
        always {
            echo 'This has finished so I am cleaning workspace'
            sh 'docker rmi olwend/dummyapi'
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
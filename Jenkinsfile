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
                    image 'node:10'
                    args '-p 3000:3000'
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
            agent { 
                dockerfile true {
                    // additionalBuildArgs '--build-arg version=1'
                }
            }
            steps {
                echo 'Built image is tagged version=1'
                }
        }

// pick up latest tagged image and push to dockerhub
        stage('push to docker hub') {
             steps {
                 sh 'docker tag *:latest olwend/dummyapi:latest'
                 sh 'docker push olwend/dummyapi:latest'
                //  script {
                //      docker.withRegistry('https://registry.hub.docker.com', 'Dockerhub') {
                //          app.push("latest")
                //      }
                //  }
            }
        }   
    }

    post {
    
        always {
            echo 'This has finished so I am cleaning workspace'
            // sh 'docker system prune -a'
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
pipeline {

  agent any

  stages {
    stage('Run lint pre build for test') {
      steps {
        sh 'npm install'
        sh 'npm run lint'
        }
      }

    // stage build image - push to dockerhub
    
    // create agent container with image
    stage('Testimage') {
      // docker pull olwend/dummyapi
      agent {
        docker {
          image 'node:10'
          args '-p 3001:3001'
        }
      }

        steps {
          // sh 'docker run -d -p 3001:3001 dummyapi'
          sh 'node ./src/ &'
          echo 'Running tests in a fully containerized environment...'
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
      s}

      // stage('To provision EC2 instance')

      // configure instance - add Docker
      //  pull image and run container
 // Docker docs - build docker image on latest code and run that image below
      stage('Build docker'){
        steps {
        sh 'docker build  .'
            echo ' Built docker image'}
          // sh 'docker build --tag=dummyapi .'
      //             // sh 'docker build  .'
      //     // push to docker hub
         
      }

      //  smoke test of EC2 image
    }

    environment {
      CI = 'true'
    }

  post {
        always {
            echo 'This has finished so I am cleaning workspace'
            deleteDir() /* clean up our workspace */
        }
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
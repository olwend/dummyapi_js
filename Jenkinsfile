pipeline {

  environment {
    CI = 'true'
    // registry = 'cloud.docker.com/olwend'
    // registryCredential = 'm0nTana1'
  }
  agent {
    docker {
      image 'node:10'
      args '-p 3000:3000'
    }

  }  

  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run lint'
  // Docker docs - build docker image on latest code and run that image below
        fileExists 'Dockerfile'
        // sh 'docker build --tag=dummyapi .'

        
        }
      }
    
    stage('Test10') {
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
          // sh 'docker build -t ${env.BUILD_TAG}'
          // push to docker hub
        }
      }
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
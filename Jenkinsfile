pipeline {

  environment {
    CI = 'true'
    registry = 'cloud.docker.com/olwend'
    registryCredential = 'm0nTana'
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
        
        fileExists 'Dockerfile'
        // docker command line - see Docker docs
        
        }
      }
    }
    stage('Test10') {
      steps {
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
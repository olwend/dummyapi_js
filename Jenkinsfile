pipeline {
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
      }
    }
    stage('Test10') {
      steps {
        sh 'node ./src/ &'
        sh 'npm test'
        publishHTML target: [
          allowMissing: true,
          alwaysLinkToLastBuild: false,
          keepAll: true,
          reportDir: '.',
          reportFiles: 'lint.html, index.html, Tests.html',
          reportName: 'Coverage Report'
          ]
      }
    }
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
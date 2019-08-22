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
        fileExists 'Dockerfile'
      }
    }
    stage('Test10') {
      steps {
        sh 'node ./src/ &'
        sh 'npm test'
        sh 'publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: false, reportDir: 'dummyAPI/src/', reportFiles: 'index.html, lint.html', reportName: 'HTML Report', reportTitles: 'CodeCoverage, EsLint'])'
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
            echo 'I succeeeded!'
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
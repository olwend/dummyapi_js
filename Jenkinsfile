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
      }
    }
  }
  environment {
    CI = 'true'
  }
}
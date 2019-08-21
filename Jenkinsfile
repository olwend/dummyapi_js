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
    stage('Test') {
      steps {
        sh './jenkins/scripts/test.sh'
      }
    }
  }
//   environment {
//     CI = 'true'
//   }
}
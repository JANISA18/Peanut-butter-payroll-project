pipeline {
  agent any

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/JANISA18/Peanut-butter-payroll-project.git'
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Build Backend') {
      steps {
        dir('backend') {
          sh 'npm install'
          // Add more like: sh 'npm run test' or 'npm start' if needed
        }
      }
    }
  }

  post {
    always {
      echo 'Build finished!'
    }
  }
}

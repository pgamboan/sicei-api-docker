pipeline {
    agent any

    environment {
        DOCKER = '/usr/local/bin/docker'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Docker esté disponible
                    if (!sh(script: "command -v $DOCKER", returnStatus: true)) {
                        error "Docker no está instalado o no es accesible."
                    }
                    
                    // Detener y eliminar el contenedor si esta running
                    def containerRunning = sh(script: "docker ps -q -f name=sicei-container", returnStdout: true).trim()
                    if (containerRunning) {
                        sh "docker stop sicei-container"
                        sh "docker rm sicei-container"
                    }
                    
                    // Build
                    echo "Construyendo imagen con tag ${env.BUILD_ID}..."
                    sh "docker build -t sicei-container:${env.BUILD_ID} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy
                    echo "Desplegando el contenedor 'sicei-container'..."
                    sh "docker run -d --name sicei-container -p 8000:8000 sicei-container:${env.BUILD_ID}"
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completado con éxito."
        }
        failure {
            echo "Hubo un error en el pipeline."
        }
    }
}

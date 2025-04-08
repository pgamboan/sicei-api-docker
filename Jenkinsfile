pipeline {
    agent any

    environment {
        DOCKER = '/usr/local/bin/docker'
        PATH = "/usr/local/bin:/usr/bin:/bin:${env.PATH}"
        CONTAINER = 'sicei-container'
    }


    stages {
        stage('Build') {
            steps {
                script {
                    def dockerExists = sh(script: "command -v $DOCKER", returnStatus: true) == 0
                    if (!dockerExists) {
                        error "Docker no está instalado o no es accesible."
                    }

                    def containerRunning = sh(script: "docker ps -q -f name=${env.CONTAINER}", returnStdout: true).trim()
                    if (containerRunning) {
                        sh "docker stop ${env.CONTAINER}"
                        sh "docker rm ${env.CONTAINER}"
                    }

                    echo "Construyendo imagen con tag ${env.BUILD_ID}..."
                    sh "docker build -t ${env.CONTAINER}:${env.BUILD_ID} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Desplegando el contenedor '${env.CONTAINER}'..."
                    sh "docker run -d --name ${env.CONTAINER} -p 8000:8000 ${env.CONTAINER}:${env.BUILD_ID}"
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

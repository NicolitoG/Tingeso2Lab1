pipeline{
    agent any
    tools{
        maven "maven"

    }
    stages{
        stage("Build JAR File"){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions:[], userRemoteConfigs: [[url: 'https://github.com/NicolitoG/Tingeso2Lab1']])
                dir ("BackendMono"){
                    bat "mvn clean package"
                }
            }
        }
        stage("Test"){
            steps{
                dir ("BackendMono"){
                    bat "mvn test"
                }
            }
        }
        stage("Build and Push Docker Image"){
            steps{
                dir ("BackendMono"){
                    script{
                        bat 'echo *** AGENT INFO ***'
                        bat 'ver'
                        withDockerRegistry(credentialsId: 'docker-credentials'){
                            bat "docker build -t nicolitog/back-image:latest ."
                            bat "docker push nicolitog/back-image:latest"
                        }
                    }
                }
            }
        }
    }
}
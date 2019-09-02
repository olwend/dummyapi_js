
# Purpose
    This is a basic API written as a learning exercise to understand  http requests 
    writing to a Mongo-memory-server.  
    Tests demo the functionality.
    
# Infrastructure - INCREASE KNOWLEDGE OF DEV OPS
    Node server can be run as a docker container.
    To progress I first set up AWS Codepipeline for CI/CD.  This was consuming high amount of resource so I stopped instance.
    __jenkinsindocker__ This branch builds a pipeline using Jenkins in a docker container to push a docker image to repository
	        Jenkins: 
	    - Build app from pipeline
            - Tests - proceed if passes
            - Build -> Docker image 
	    - Push to DockerHub
	    
NEXT STAGE:
    - Ansible playbook to create infrastructure for build/ test/ deploy to webserver on EC2 LINUX AMI instance
    
# Dependencies
* Jest test runner 
* Node version >= 10.15.3
* npm >= 6.4.1
* body-parser
* cors
* express
* helmet
* mongodb
* mongodb-memory-server
* morgan

# Process for Docker container running Jenkins

1.	To start a docker container of jenkinsci

```
docker run \
-—name jenkins \
--rm   -u root \
-p 8080:8080 \
-v jenkins-data:/var/jenkins_home \ 
-v /var/run/docker.sock:/var/run/docker.sock  \
-v "$HOME":/home \
jenkinsci/blueocean 
```
Enhancement:  docker-compose.yml

 ```docker-compose up``` follow up with ```docker-compose down``` to clean up

Container port has been opened on 8080

```
bash-4.4# docker ps
CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                               NAMES
35864caaa9e4        jenkinsci/blueocean   "/sbin/tini -- /usr/…"   45 hours ago        Up 45 hours         0.0.0.0:8080->8080/tcp, 50000/tcp   dummyapi_jenkins_1
```

2.  Set up Jenkins with the admin password

3.  Can access container via docker using name as shown above docker ps

        
        docker exec -it dummyapi_jenkins_1 bash
        
Browse to http://localhost:8080

4. Stop Jenkins via CLI (ctrl + C), the settings for Jenkins repo are lost as container cleans up on stop.

5. Create initial pipeline as  Jenkinsfile. - persists in git hub repo, along with /Jenkins/scripts 

6. Pipeline downloads NODE docker image then builds - installing dependencies (npm install) and runs node app as a docker          container. 

7. Git pulled repo maps to home repo of Jenkins container downloaded to the node_modules workspace 
        (within the /var/jenkins_home/workspace/dummyapi_js directory in the Jenkins container).


# Process for Docker container running Jenkins

1.	To start a docker container of jenkinsci

```
docker run \
-— name jenkins \
--rm   -u root \
-p 8080:8080 \
-v jenkins-data:/var/jenkins_home \ 
-v /var/run/docker.sock:/var/run/docker.sock  \
-v "$HOME":/home \
jenkinsci/blueocean 

```
Container port has been opened on 8080

```
bash-4.4# docker ps
CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                               NAMES
35864caaa9e4        jenkinsci/blueocean   "/sbin/tini -- /usr/…"   45 hours ago        Up 45 hours         0.0.0.0:8080->8080/tcp, 50000/tcp   jenkins
```

2.  Set up Jenkins with the admin password

3.  Can access container via docker 

        ```
        docker exec -it jenkins bash
        ```
Browse to http://localhost:8080
4.  
Then stop Jenkins via CLI (ctrl + C), the settings for Jenkins repo are lost as container cleans up on stop.

5. Create initial pipeline as  Jenkinsfile. - persists in git hub repo, along with /Jenkins/scripts 

6. Pipeline downloads NODE docker image then builds - installing dependencies (npm install) and runs node app as a docker container. 

7. Git pulled repo maps to home repo of Jenkins container. downloaded to the node_modules workspace (within the /var/jenkins_home/workspace/dummyapi_js directory in the Jenkins container).


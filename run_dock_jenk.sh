
#!bin/bash 
docker run --name jenkins \
--rm -u root \
-p 8080:8080 \
-v jenkins-data:/var/jenkins-home \
-v /var/run/docker.sock:/var/run/docker.sock \
-v "$HOME":/home \
jenkinsci/blueocean
# use long term support version 10
FROM node:10

# app directory
WORKDIR /app

ENV myDummyAPI="DummyAPI"

# install dependencies
COPY package*.json ./

RUN ["npm install",  "npm t", "echo running tests"]

# bundle app source
COPY ./src ./src

# set up a healthcheck
HEALTHCHECK --interval=5s \
            --timeout=5s \
            CMD curl -f http://127.0.0.1:8000 || exit 1

# app binds to port 3001 accessed by docker daemon
EXPOSE 3001

# define runtime
CMD [ "node", "/app/src"]





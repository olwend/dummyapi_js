# use long term support version 10
FROM node:10-alpine

# app directory
WORKDIR /app

ENV myDummyAPI="DummyAPI"

# install dependencies
COPY package*.json ./

RUN npm install --production

# bundle app source
COPY ./src ./src

# app binds to port 3001 accessed by docker daemon
EXPOSE 3001

# define runtime
CMD [ "node", "/app/src"]

# set up a healthcheck
HEALTHCHECK --interval=3s \
            --timeout=5s \
            CMD curl -f http://127.0.0.1:3001 || exit 1






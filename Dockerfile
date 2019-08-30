# use long term support version 10
FROM node:10

# app directory
WORKDIR /app

ENV myDummyAPI="DummyAPI"

# install dependencies
COPY package*.json ./

RUN npm install

# bundle app source
COPY . .

# app binds to port 8080 so ma by docker daemon
EXPOSE 3001

# define runtime
CMD [ "node", "/app/src"]





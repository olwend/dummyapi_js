# use long term support version 10
FROM node:10

# app directory
WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./

RUN npm install

# bundle app source
COPY . .

# app binds to port 8080 so ma by docker daemon
EXPOSE 3001

# define runtime
CMD [ "node", "/usr/src/app/src"]





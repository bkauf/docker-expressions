FROM node:7.9
RUN apt-get update && apt-get install dnsutils -y
RUN npm install
# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir /expressions
RUN mkdir /expressions/cron
RUN mkdir /expressions/service
RUN mkdir /expressions/container

WORKDIR /usr/src/app

# restart server on file change
RUN npm install -g nodemon

#RUN npm install docker-events
# Install app dependencies
COPY package.json /usr/src/app

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
HEALTHCHECK --interval=6s --timeout=2s CMD curl --fail http://localhost:8080/health || exit 1
#CMD [ "npm", "start" ]
CMD [ "nodemon", "start" ]

FROM node:wheezy
RUN npm install
# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
RUN echo "deb http://repo.mongodb.com/apt/debian wheezy/mongodb-enterprise/3.4 main" | tee /etc/apt/sources.list.d/mongodb-enterprise.list
RUN apt-get update && apt-get install -y cron && apt-get install -y nano && apt-get install -y rsyslog

COPY package.json /usr/src/app
# restart server on file change
RUN npm install -g nodemon
RUN npm install nodemailer
RUN npm install cheerio
RUN npm install request

# Install app dependenciesbid


# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
ENTRYPOINT ["/usr/src/app/init.sh"]

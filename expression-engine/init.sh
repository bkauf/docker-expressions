#!/bin/bash
#service mongod start
service rsyslog start
service cron start
ln -s /usr/local/bin/node /usr/sbin/node
echo "* * * * * /usr/src/app/cron.js > /cron.log 2>&1" >> mycron
crontab mycron
rm mycron
(crontab -u root -l; echo "$line") | crontab -u root -
nodemon index.js -D

# Docker Expressions
## A JavaScript Based Events Parser and Automation Tool

Create your own dynamic functionality based on events that happen in your cluster!

There are two containers, a web portal to write your expression scripts, and an engine that fires them. All expressions are written in JavaScript and get executed upon matching events from the docker events stream or every 60 seconds if CRON is selected. Both services must run on a management node! In a UCP setup if you add  the expression = yes label to one of your manager nodes and enable scheduling containers on it the compose file in this dir will work to launch the application.



![Expression-Web](/Expressions-WalkThough.png?raw=true "Docker Expressions")
![Expression-Web](/Docker-Expressions.png?raw=true "Docker Expressions")




### Expression-Web Container

![Expression-Web](/Expressions-Web2.png?raw=true "Expression-Web UI")

This is the web interface container. It's written in Node.js. It needs access to an /expressions mount to store your expressions in folders that correspond to the events you've chosen for them to fire off.

```
docker run -itd --rm -p 8090:8080 -v /home/bkauf/Desktop/expressions:/expressions \
bkauf/expressions-web
```


### Expression-Engine Container

The Expression Engine will need access to this same /expressions mount as the expression-web container and also access to the docker.sock to read the events API. Ideally both the engine and the web expression containers are run on a swarm manager node and have a shared volume. It may also be necessary to enable api email access to the email account you specify in your code (must with a gmail account).

```
docker run -itd -p 8088:8080 --rm \
-v /usr/bin/docker:/usr/bin/docker \
-v /home/bkauf/Desktop/expressions:/expressions \
-v /var/run/docker.sock:/var/run/docker.sock bkauf/expressions-engine
```

## Sample Expressions

### Send and Email on a container kill Event
(note you have to enable your gmail account to allow sending emails via API for the below to work)
```javascript

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test@gmail.com',
    pass: 'password'
  }
});

var mailOptions = {
  from: 'test@gmail.com',
  to: 'test2@gmail.com',
  subject: 'Container Failure: '+ container.Actor.Attributes['com.docker.swarm.service.name'],
  text: JSON.stringify(container)
};
if (container.Action == 'kill'){
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Container Failure!: ' + container.toString());
        }
      });
}
```

### Change the Scale of a service in swarm based off a value scraped from a remote webpage body

```javascript
request('http://192.168.1.5:8888', function (error, response, body) {

     exec("docker service scale node-web-app="+body, puts);

});
function puts(error, stdout, stderr) { sys.puts(stdout) }
```

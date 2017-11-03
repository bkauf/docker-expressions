# Events Engine

This is the engine that will run through the expressions volume for each event in the docker events stream(Currently only service, container). It will take the event as a JSON object input into your expression code.  

Example container object returned after a kill event in the docker events API stream:
```
{"status":"kill","id":"23239c6e0f541668b08b085c1f5235661022524a4be2090f0a06a08cc0b52738","from":"bkauf/expressions-engine:latest@sha256:2c48ff195a2303d9361198fdf0fadc3c30453269a14918d4ead8eac1d0160105","Type":"container","Action":"kill","Actor":{"ID":"23239c6e0f541668b08b085c1f5235661022524a4be2090f0a06a08cc0b52738","Attributes":{"com.docker.stack.namespace":"expressions","com.docker.swarm.node.id":"aezzaemsywpoiwvkn0tf1qcfq","com.docker.swarm.service.id":"qz5jeib1lits9y5bbiyrmt6tw","com.docker.swarm.service.name":"expressions_expressions-engine","com.docker.swarm.task":"","com.docker.swarm.task.id":"3nf31uzb1h1ot41tdbjz4mh1e","com.docker.swarm.task.name":"expressions_expressions-engine.1.3nf31uzb1h1ot41tdbjz4mh1e","com.docker.ucp.access.label":"/","com.docker.ucp.collection":"swarm","com.docker.ucp.collection.root":"true","com.docker.ucp.collection.swarm":"true","image":"bkauf/expressions-engine:latest@sha256:2c48ff195a2303d9361198fdf0fadc3c30453269a14918d4ead8eac1d0160105","name":"expressions_expressions-engine.1.3nf31uzb1h1ot41tdbjz4mh1e","signal":"15"}},"scope":"local","time":1509710553,"timeNano":1509710553896095700}
```

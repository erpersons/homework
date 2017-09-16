var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = 5000;

//routers
var taskRouter = require('../routes/tasks')
//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//routes
app.use('/tasks', taskRouter);
//start listenig for request on a specific port
app.listen(port, function(){
    console.log('listening on port', port);
});
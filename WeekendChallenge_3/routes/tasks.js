var router = require('express').Router();
var path = require('path');
var pool = require('../modules/pool.js');

router.get('/', function(req, res){
    console.log('in GET/tasks route');
    pool.connect(function(connectionError, client, done){
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else{
            client.query('SELECT * FROM todo', function(queryError, resultObj){
                done();
                console.log('in client.query');
                if(queryError) {
                    console.log('in query error!');
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    console.log('resultObj.rows', resultObj.rows);
                    res.send(resultObj.rows);
                } //end second if else
                
            }) //end client.query
        } //end first if else
    }) //end pool.connect
}) //end router.get
router.post('/', function(req, res) {
    var newTaskObj = req.body;
    console.log('in router.post');
    console.log(newTaskObj);
    pool.connect(function(connectionError, client, done){
        if(connectionError){
            console.log(connectionError);
            res.sendStatus(500);
        } else{
            var tQuery = 'INSERT INTO tasks (task, complete) VALUES($1, $2)';
            var taskArray = [newTaskObj.task, newTaskObj.complete];
            client.query(tQuery, taskArray, function(queryError, resultObj){
                done();
                if(queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else{
                    console.log('yaaaay');
                    res.sendStatus(202);
                } //end second if else
            }) //end client.query
        } //end if else statement
    }) //end pool.connect
}) //end router.post
module.exports = router;
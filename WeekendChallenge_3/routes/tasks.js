var router = require('express').Router();
var path = require('path');
var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    console.log('in GET/tasks route');
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log(connectionError);
            // console.log('in router.get');
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM todo', function (queryError, resultObj) {
                done();
                console.log('in client.query');
                if (queryError) {
                    console.log('in query error!');
                    // console.log(queryError);
                    res.sendStatus(500);
                } else {
                    console.log('resultObj.rows', resultObj.rows);
                    res.send(resultObj.rows);
                } //end second if else

            }) //end client.query
        } //end first if else
    }) //end pool.connect
}) //end router.get
router.post('/', function (req, res) {
    var newTaskObj = req.body;
    console.log('in router.post');
    console.log(newTaskObj);
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            console.log('in else of router.post')
            var tQuery = 'INSERT INTO todo (taskname) VALUES($1)';
            //todo is table name!
            var taskArray = [newTaskObj.task];
            client.query(tQuery, taskArray, function (queryError, resultObj) {
                done();
                if (queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    console.log('yaaaay');
                    res.sendStatus(202);
                } //end second if else
            }) //end client.query
        } //end if else statement
    }) //end pool.connect
}) //end router.post
router.put('/:id', function (req, res) {
    var dbId = req.params.id;
    console.log('in put task route');
    console.log('req.params.id ->', req.params.id);
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            'UPDATE todo SET status=true WHERE id =$1';
            
            
        } //end if else
    }) //end pool.connect
}) // end router.put
router.delete('/:id', function (req, res) {
    var dbId = req.params.id;
    console.log('in delete task route');
    console.log('req.params.id ->', req.params.id);
    //pool.connect
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log('in pool.connect', dbId);
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM todo WHERE id=$1;', [dbId], function (queryError, result) {
                done();
                if (queryError) {
                    console.log(queryError);
                    console.log('in pool.connect client.query');
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                } //end second if else
            })
        } //end if else
    })
}) //end router.delete

module.exports = router;
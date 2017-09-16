var router = require('express').Router();
var path = require('path');

router.get('/', function(req, res){
    console.log('root url received');
    var indexPath = path.join(__dirname, './server/public/index.html');
    res.sendFile(indexPath);
});

module.exports = router;
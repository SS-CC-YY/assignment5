/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name:Chenyu Song
 * Email:songchen@oregonstate.edu
 */

require('path');
require('fs')
var postDa = require('./postData.json');

var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function(req, res, next) {
    res.status(200).render('postPage', {
        posts: postDa,
        ifshow: true
    });
});

app.get('/:id', function(req, res, next) {
    var post = req.params.id;
    if (0 <= post || post > 7) {
        res.status(200).render('postPage', {
            posts: [postDa[post]],
            ifshow: false
        });
    } else next();
})

app.get('*', function(req, res, next) {
    res.status(404).render('404', {
        url: req.url
    })
});

app.listen(port, function() {
    console.log("== Server is listening on port", port);
});
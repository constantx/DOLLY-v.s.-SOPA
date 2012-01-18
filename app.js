// hello dolly

/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();
var PORT = process.env.PORT || 3000;
// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'DOLLYvsSOPA' }));
    app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('":method :url" :status'));
    app.use(app.router);
});

// environment specific config 
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res, next){
    res.render('index',{
        title: 'hello dolly.',
        isProduction: (process.env.NODE_ENV == 'production') ? true : false
    });
});

// Only listen on $ node app.js
if (!module.parent) {
    app.listen(PORT);
    console.log("Express server listening on port %d", app.address().port);
}
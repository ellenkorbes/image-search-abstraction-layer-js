
var express = require('express')
var request = require('request')
var path = require('path')
var mongo = require('mongodb').MongoClient
var mongouri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;
var app = express()

app.use(express.static('public'))

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'))
})

app.get("/recent", function (request, response) {
  mongo.connect(mongouri, function(err, db) {
      if (err) throw err
      db.collection('search-history').find({}, { _id: 0 }).sort( { when: -1 } ).limit( 10 ).toArray((err, data) => {
        if (err) throw err
        response.json(data)
      })
  })
})

app.get("/search/:q", function (request, response) {
    var time = new Date()
    mongo.connect(mongouri, function(err, db) {
        var newEntry = [{
        "term": request.params.q,
        "when": time
          }]
        db.collection('search-history').insert(newEntry, function(err, result) {
        if (err) throw err
            db.close()
        })
    }) 
  getImagePixabay(request.params.q, request.query.offset).then(ans => {
    response.json(ans); 
  }) 
})

function getImagePixabay (search, page = 1) {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://pixabay.com/api/?key=${process.env.PIX}&q=${search}&page=${page}`,
      json: true,
    };
    function getPicsPixabay(err, response, body) {
      if (!err && response.statusCode == 200) {
        body = body.hits.filter(image => {
          if (!image.is_album) {
            return image;
          }
        }).map(image => {
          return {
            url: image.webformatURL,
            thumbnail: image.previewURL,
            context: image.pageURL,
          };
        });
        resolve(body)
      }
    }
    function boop (err, response, body) { 
      return body 
    }
    
    request(options, getPicsPixabay)
  })
}

var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
})

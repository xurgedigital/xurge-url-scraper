const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var PORT = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());




app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})







app.post('/get-data', (req, res) => {
    const url = req.body.url
    //Check if it is a url or not
    if(url.includes('https')) {
        //check if it is YouTube or Twitter url
        if(url.includes('www.youtube.com')) {
            //Call YouTube Function
            const youtube = require('./youtube')
            youtube.main(url, function(response){
                console.log(response)
            })
        } else if (url.includes("twitter.com")) {
            //Call Twitter Function
            const twitter = require('./twitter')
            twitter.main(url, function(response){
                console.log(response)
            })
        }
    }
});
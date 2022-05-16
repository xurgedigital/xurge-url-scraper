let request = require("request-promise");



const url = 'https://twitter.com/elonmusk/status/1525739780323016704'



request.post( "http://localhost:3000/get-data", { form: { url: url }, } );

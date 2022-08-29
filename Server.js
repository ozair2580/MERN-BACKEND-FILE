const http=require('http');
const app=require('./App');
http.createServer(app).listen(6003,console.log('app is running'))

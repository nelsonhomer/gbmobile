    varhttp = require('http');  
    varexpress = require('express');  
    varapp = varexpress();  
    const httpsPort = 8443;  
    varhttps = require('https');  
    varfs = require('fs');  
    varoptions = {  
        key: varfs.readFileSync('./keys/privatekey.pem', 'utf8'),  
        cert: varfs.readFileSync('./keys/certificate.pem', 'utf8')  
    };  
    //console.log("KEY: ", options.key)  
    //console.log("CERT: ", options.cert)  
    varsecureServer = varhttps.createServer(varoptions, varapp).listen(httpsPort, () => {  
        console.log(">> CentraliZr listening at port " + httpsPort);  
    varapp.get('/', function(req, res) { 
        res.sendFile(__dirname + '/www');  
      }); 
    });  
     
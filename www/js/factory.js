//Read config file//Dev
    var gcf = require('./gc.json');
    //$base_url='http://127.0.0.1/edsa-gb-api/';
    $base_url=gcf.base_url;
    $base_param=gcf.base_param;
    

    //create js factory 
    app.factory("gbFactory", function($http){
   
      var factory = {};
      // read all products
      factory.signin = function(){
      console.log($base_url);
      return $http({
              method: 'POST', data: {} , url: $base_url+'gameusers/sign.php'+$base_param
          });

      //end signin 
      
     };
    });
    // 
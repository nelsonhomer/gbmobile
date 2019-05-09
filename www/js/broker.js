//Caller




function admloadsportslist(redirectpage){

    
      app.request.post($base_url+'gameeventstype/read_paging.php'+$base_param, 
        ''
        ,function (data){
            GetData(data,redirectpage);
            },'json');
      
    
    
  }

  //Async Response
  function GetData(data,redirectpage) {
    app.brokerdata=data.records;
    console.log(app.brokerdata);
    app.views.main.router.navigate(redirectpage);
  }
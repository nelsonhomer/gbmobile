

  
  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    try {
  	 FB.getLoginStatus(function(response) {
    		statusChangeCallback(response);
  	  });
	}
	catch(err) {
  	  console.log('Error Encountered: ' +  err.message);
        } 
  }


  
  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  

//check login state 
//checkLoginState();
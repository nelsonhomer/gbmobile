  
  //$('#facebookLogin').on('click', function () { facebookLogin(); })
var userID = null;
var userName = null;
var userEmail = null;
var userSessionToken = null;
var FBresponse=null;


//for web 
// Load the SDK asynchronously
(function(d, s, id) {
  app.preloader.show();
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "./js/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
  
} (document, 'script', 'facebook-jssdk'));

var finished_rendering = function() {
  app.preloader.hide();
  console.log("finished rendering plugins");
}




window.fbAsyncInit = function() {
  // In your onload handler
  FB.Event.subscribe('xfbml.render', finished_rendering);
  FB.init({
    appId      : '365464900666799',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v3.2' // The Graph API version to use for the call
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  //FB.getLoginStatus(function(response) {
  //  statusChangeCallback(response);
  //});
  
  //hide pre-loader
  app.preloader.show();
};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    document.getElementById('userSessionToken').value=response.authResponse.accessToken;
    FB.api('/me',{fields: 'email,name'}, function(response) {
      console.log(response);
  
      //alert(JSON.stringify(response));
      
      document.getElementById('userID').value=response.id;
      document.getElementById('userName').value=response.name;
      document.getElementById('userEmail').value = response.email;
      //signin to app
      GetUserData();
     // document.getElementById('status').innerHTML =        'Thanks for logging in, ' + response.name + '!';
    });
    
    
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = ' ' +
      '';
    //call login screen
    app.preloader.hide();
    app.loginScreen.open('#my-login-screen');
    
  }
}

function GetUserData() {
  console.log('Welcome!  Fetching your information.... ');
   
  
  signin();
  //JSON.stringify(response)
  
  app.loginScreen.close('#my-login-screen');
  app.preloader.hide();
}	
// end web 
// Cordova app
var fbLoginSuccess = function (result) {
  console.log(JSON.stringify(result));
  
  userID=result.userID;
  userSessionToken=result.accessToken;
  document.getElementById('userID').value=result.userID;
  document.getElementById('userSessionToken').value = result.accessToken;
  //fetch user data
  CordovaFacebook.graphRequest({
    path: '/me',
    params: { fields: 'email,id,first_name,last_name,gender,link,name' },
    onSuccess: function (userData) {
        //alert(JSON.stringify(userData));
        userName = userData.name;
        userEmail = userData.email;
        document.getElementById('userID').value=userData.id;
        document.getElementById('userEmail').value = userData.email;
        document.getElementById('userName').value=userData.name;
        console.log(JSON.stringify(userData));
        GetUserData();

    },
    onFailure: function (result) {
        if (result.error) {
            Error.log('error', 'There was an error in graph request:' + result.errorLocalized);
        }
        app.dialog.alert('There was an error in graph request:' + result.errorLocalized);
        app.preloader.hide();

    }
   });  
}
var fbloginError=function(result) {
  if(result.cancelled) {
    app.dialog.alert("The user doesn't like my app");
  } else if(result.error) {
    app.dialog.alert("There was an error:" + result.errorLocalized);
  }
  console.error(JSON.stringify(result));
  app.preloader.hide();
}
// Cordova app

function facebookLogin() {  
  //show preloader 
  app.preloader.show();
  //Check Device 

  //Mobile App 
  try {
    //logout session before logging in
    document.getElementById('userID').value=null;
    document.getElementById('userName').value=null;
    document.getElementById('userEmail').value = null;
    document.getElementById('userSessionToken').value=null;
    CordovaFacebook.logout();
    
    //alert('logging out');
    //login
    //CordovaFacebook.login('public_profile,email]',fbLoginSuccess,fbloginError);
    CordovaFacebook.login({
      permissions: ['public_profile'],
      onSuccess: fbLoginSuccess,
      onFailure: fbloginError 
   });
    //alert('logging in');


    /*if (result.success==1){
      console.log('Access Token:' + result.accessToken );
      console.log('Access Token:' + result.userID );
      console.log('Response : ' + JSON.stringify(result));
      alert(JSON.stringify(result));
    } */
    //facebookConnectPlugin.login(['public_profile'], fbLoginSuccess, fbloginError);
  } catch(error) {
         //alert(error);
         FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
  }
  //console.log('Closed Login screen');
  console.log('Successful login for: ' + document.getElementById('userName').value);
  console.log('User ID: ' + document.getElementById('userID').value);
  console.log('Email: ' + document.getElementById('userEmail').value );
  console.log('Access Token: ' + document.getElementById('userSessionToken').value);
}

//GB API functions

function signin(){
  app.preloader.show();
  var uid=document.getElementById('userID').value;
  var uname=document.getElementById('userName').value;
  var uem=document.getElementById('userEmail').value;
  var udata= { gusername: uem,
    gpassword: uem,
    glastname: uname,
    gfirstname: uname,
    gmiddlename: uname,
    gemail: uem,
    gmobile: '',
    gfbid: uid,
    gaddress1: '',
    gaddress2: '',
    gcountry: ''
  }
  app.request.post($base_url+'gameusers/signin.php'+$base_param, 
      JSON.stringify(udata)
      ,function (data){
        getappuserdata(data);
       console.log(data);  },'json');
}

//Join Group
function joinGroup(){
 
  var groupcode = $$('#my-groupcode-screen [name="groupcode"]').val();
  //alert(groupcode);
  
  
  var udata= { 
    groupcode: groupcode,
    ggameuserid:  app.root.userdata.guserid
  }
  app.request.post($base_url+'gamegroupmembers/create.php'+$base_param, 
      JSON.stringify(udata)
      ,function (data){
          refreshdata(data);
          },'json');
}

//async return functions
//signin
function getappuserdata(udata){

  app.root.userdata=udata;
  if (udata.groupcode=='') {
     //Open group input window
     app.preloader.hide();
     app.loginScreen.open('#my-groupcode-screen');
     return;
  }
  //check if admin
  var udata= { 
      ggameuserid:  app.root.userdata.guserid
  }
  app.preloader.show(); 
  app.request.post($base_url+'gamegroupmembers/isadmin.php'+$base_param, 
      JSON.stringify(udata)
      ,function (data){
          isadmin(data);
          },'json');
  //
  
}
//join group
function refreshdata(data){
  app.preloader.show();
  if (data.status==1) {
    app.dialog.alert (data.message);
    app.loginScreen.close('#my-groupcode-screen');
    //refresh data
    app.root.userdata.groupid=data.groupid;
    app.root.userdata.groupcode=data.groupcode;
    app.preloader.hide();
    app.dialog.alert('Welcome ' + app.root.userdata.gfirstname + " Let's play!" );
    

   } else {
      app.preloader.hide();
      app.dialog.alert(data.message);
   }
  console.log(app.root.userdata); 

}

function isadmin(data){
  app.preloader.show();
  if (data.status==1) {
    //Popuate Admin menus
    
    app.request.post($base_url+'gadminmenus/read_paging.php'+$base_param, 
      ''
      ,function (data){
          app.preloader.show();
          loadadminmenus(data);
          },'json');
      
   } else {
    app.preloader.hide();
      //do nothing
   }
  //Show Welcome screen 
  app.dialog.alert('Welcome ' + app.root.userdata.gfirstname + " Let's play!" );
  //show preloader 
  app.preloader.hide();
}

function loadadminmenus(menudata){
  var list =document.getElementById('adminlist');
  var menuitems=menudata.records
  
  for (idx in menuitems) {
      var node = document.createElement("li");   
      var ahrefnode= document.createElement("a");  
      //ahrefnode.href="javascript:" + menuitems[idx].gfunction + "('" + menuitems[idx].gmenuroute + "')" ;
      ahrefnode.href=menuitems[idx].gmenuroute;
      ahrefnode.className='my-class panel-close';
      var textnode = document.createTextNode(menuitems[idx].gmenuname);    
      ahrefnode.appendChild(textnode);  
      node.appendChild(ahrefnode);                
      list.appendChild(node);     
  }
                            
  app.preloader.hide();

  console.log(menudata); 

}
//set values to null
//document.getElementById('userID').value='10161581955845531';
//document.getElementById('userName').value='nelsonhomer@yahoo.com';
//document.getElementById('userEmail').value = 'nelsonhomer@yahoo.com';
//document.getElementById('userSessionToken').value='3434514';

document.getElementById('userID').value=null;
document.getElementById('userName').value=null;
document.getElementById('userEmail').value = null;
document.getElementById('userSessionToken').value=null;


if (document.getElementById('userID').value==''){
  // Open login screen
  app.loginScreen.open('#my-login-screen');

} else  {
  //alert(JSON.stringify(app.root.userdata=udata));
  signin();
  
}




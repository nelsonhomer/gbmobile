// Dom7
var $$ = Dom7;



    // Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.gbf7.ninetySeven', // App bundle ID
  name: 'Nintety Seven', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ],
      userdata:{},
      brokerdata:{}
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
    onBackKeyDown: function() {

            var cpage = homeView.activePage;
            var cpagename = cpage.name;
            console.log(cpagename);
            if (($$('#leftpanel').hasClass('active')) || ($$('#rightpanel').hasClass('active'))) { // #leftpanel and #rightpanel are id of both panels.
                app.closePanel();
                return false;
            } else if ($$('.modal-in').length > 0) {
                app.closeModal();
                return false;
            } else if (cpagename == 'index') {
                    app.confirm('Are you sure you want to exit?', function() {
                    // var deviceType = device.platform;
                    // if(deviceType == “Android” || deviceType == “android”){
                    navigator.app.exitApp();
                    // }
                },
                function() {
                });
            } else {
              homeView.router.back();
            }

    },
    
  //end App root Methods  
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var catalogView = app.views.create('#view-catalog', {
  url: '/catalog/'
});




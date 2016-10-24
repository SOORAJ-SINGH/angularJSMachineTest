(function () {
  
    angular.module("machineTest").run(["ngTableDefaults",'$rootScope', '$location', '$cookies', '$http', configureDefaults]);


    function configureDefaults(ngTableDefaults,$rootScope, $location, $cookies, $http) {
        console.log('in app.run for configureDefaults ');

        ngTableDefaults.params.count = 5;
        ngTableDefaults.settings.counts = [];


        // keep user logged in after page refresh
        console.log(' keep user logged in after page refresh');
        
        var cookieString = $cookies.get('globals');
        if (cookieString) {
        	$rootScope.globals  = JSON.parse(cookieString);
    	}else{
    		$rootScope.globals  = {};
    	}
       
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
       		//$location.path('/');
       	}
 		
        //rootscope listen to the locationChange event..
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            console.log('in the locationChangeStart',event, next, current);
            // redirect to login page if not logged in and trying to access a restricted page
            //debugger
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;

            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
            
        });


        //rootscope listen to the RouteChangeError event..
        $rootScope.$on('$routeChangeError', function (current,previous, rejection) {
            console.error('in the routeChangeError',current,previous, rejection);
        });
    }




})(); //end Self Invoked Function
(function(){
'use strict';

app.controller('loginController',['$rootScope','$location','userAuthenticateService',function($rootScope,$location,userAuthenticateService){
	console.log('in login controller');
	var loginCtrl = this;

	//clear the Credentials
	//userAuthenticateService.clearCredentials();


	loginCtrl.login = function(){
	console.log('in login controller function');

		loginCtrl.dataLoading = true;


		userAuthenticateService.login(loginCtrl.username,loginCtrl.password,function(response){
			console.log('callback response',response);
			if (response.success) {
				userAuthenticateService.setCredentials(loginCtrl.username,loginCtrl.password);
				$location.path('/');
			}
			else{
				loginCtrl.error = response.message;
				loginCtrl.dataLoading = false;
			};
		});
	};

	$rootScope.logout = function(){
		console.log('logging out.');
		userAuthenticateService.clearCredentials();
		$location.path('/login');

	};
	}]); //end loginController

})(); //end self invoked function
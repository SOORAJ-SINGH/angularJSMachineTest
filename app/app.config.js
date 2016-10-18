(function(){

app.config(['$routeProvider', function ($routeProvider) {
    console.log('in app.config ');

    

    $routeProvider
		.when('/', { templateUrl: "app/components/users/users.html", controller: "userController", controllerAs: "userCtrl"  })
		.when('/login', { templateUrl: "app/components/login/login.html", controller: "loginController", controllerAs: "loginCtrl"  })
		.when('/users', { templateUrl: "app/components/users/users.html", controller: "userController", controllerAs: "userCtrl"  })
		.when('/posts', { templateUrl: "app/components/posts/posts.html", controller: "postController", controllerAs: "postCtrl" })
		.otherwise({ redirectTo: '/login' });
    console.log('configured the routeProvider');


}]);

})(); //end Self Invoked Function
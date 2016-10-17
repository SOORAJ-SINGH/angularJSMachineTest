app.config(['$routeProvider', function ($routeProvider) {
    console.log('configuring the routeProvider');
    $routeProvider
		.when('/', { templateUrl: "app/components/users/users.html", controller: "userController" })
		.when('/users', { templateUrl: "app/components/users/users.html", controller: "userController" })
		.when('/posts', { templateUrl: "app/components/posts/posts.html", controller: "postController" })
		.otherwise({ redirectTo: '/' });
    console.log('configured the routeProvider');


}]);
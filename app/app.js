var app = angular.module('machineTest', ['ngRoute', 'ui.bootstrap','ngTable']);

angular.module("machineTest").run(configureDefaults);
configureDefaults.$inject = ["ngTableDefaults"];

function configureDefaults(ngTableDefaults) {
    console.log('in configureDefaults');
    ngTableDefaults.params.count = 5;
    ngTableDefaults.settings.counts = [];
}


app.directive('menu',function(){
	return {
		restrict : "E",
		templateUrl: "app/common/menu.html",
	    controller: 'postController'
	};
});

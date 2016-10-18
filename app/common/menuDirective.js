(function () {
    app.directive('menu', function () {
        return {
            restrict: "E",
            templateUrl: "app/common/menu.html",
            controller: 'loginController'
        };
    });
})(); //end Self Invoked Function
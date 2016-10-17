(function () {
    app.directive('menu', function () {
        return {
            restrict: "E",
            templateUrl: "app/common/menu.html",
            controller: 'postController'
        };
    });
})(); //end Self Invoked Function
(function () {
    var userController = function ($scope, userService, NgTableParams) {
        console.log('in userController');
        $scope.hello = "hello all";
        $scope.users;
        $scope.status;

        getUsers();




        function getUsers() {
            userService.getUsers().
                then(
                function (data) {
                    console.log('response in controller', data);
                    $scope.users = data;
                    //$scope.tableParams = new NgTableParams({}, { dataset: data });
                    $scope.customConfigParams = createUsingFullOptions(data);
                },
                function (response) { $scope.status = 'unable to load!'; });
        }

        function createUsingFullOptions(data) {
            var initialParams = {
                count: 6 // initial page size
            };
            var initialSettings = {
                // page size buttons (right set of buttons in demo)
                counts: [],
                // determines the pager buttons (left set of buttons in demo)
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2,
                dataset: data
            };
            return new NgTableParams(initialParams, initialSettings);
        }
    }

    //registering the userController to the module
    app.controller('userController', ['$scope', 'userService', 'NgTableParams', userController]);


})(); //end Self Invoked Function
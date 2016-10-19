(function () {

    var userController = function ( userService, NgTableParams) {
        console.log('in userController');
        var userCtrl = this;

        userCtrl.hello = "hello all";
        userCtrl.users;
        userCtrl.status;

        getUsers();




        function getUsers() {
            //get the users using the userService
            userService.getUsers().
                then(
                function (data) {
                    console.debug('response in user controller', data);
                    userCtrl.users = data;
                    //userCtrl.tableParams = new NgTableParams({}, { dataset: data });
                    userCtrl.customConfigParams = createUsingFullOptions(data);
                },
                function (response) { userCtrl.status = 'unable to load!'; });
        }

        function createUsingFullOptions(data) {
            //console.log('data in createUsingFullOptions: ',data);
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
    app.controller('userController', [ 'userService', 'NgTableParams', userController]);

})(); //end Self Invoked Function
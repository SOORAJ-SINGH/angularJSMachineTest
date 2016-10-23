(function () {


 //registering the userController to the module
    app.controller('userController', [ 'userService', 'NgTableParams', userController]);


    function  userController( userService, NgTableParams) {
        console.log('in userController');
        var userCtrl = this;

        userCtrl.hello = "hello all";
        userCtrl.users;
        userCtrl.status;
        //userCtrl.filter;
        getUsers();
        userCtrl.showUserDetails = showUserDetails;

        function showUserDetails(name ){
             console.log('name',name);
             userCtrl.showUserDetail= name;
        }

        function getUsers() {
            //get the users using the userService
            userService.getUsers().
                then(
                function (data) {
                    console.log('response in controller', data);
                    userCtrl.users = data;
                    //userCtrl.tableParams = new NgTableParams({}, { dataset: data });
                    userCtrl.customConfigParams = createUsingFullOptions(data);
                },
                function (error) { userCtrl.status = 'unable to load!'; });
        }

        function createUsingFullOptions(data) {
            console.log('data in createUsingFullOptions: ',data);
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

    
   

})(); //end Self Invoked Function
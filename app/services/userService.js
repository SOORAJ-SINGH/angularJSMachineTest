(function () {

    //userService to get users data using the API call
    app.service('userService', ['$http', 'userURL', function ($http, userURL) {
        console.log('in userService');

        this.getUsers = function () {

            return $http({
                method: 'GET',
                url: userURL,
                dataType: 'jsonp'
            }).then(function successCallback(response) {
                console.log('in Success', response);
                return response.data;
            }, function errorCallback(response) {
                console.log('in Error', response);

            });
        }

    }]);

    //userFactory to get users data using the API call
    app.factory('userFactory', ['$http', 'userURL', function ($http, userURL) {
        console.log('in userFactory');
        var user = {};

        user.getUsers = function () {

            return $http({
                method: 'GET',
                url: userURL,
                dataType: 'jsonp'
            }).then(function successCallback(response) {
                console.log('in Success', response);
                return response.data;
            }, function errorCallback(response) {
                console.log('in Error', response);

            });
        }

        return user;

    }]);


    

})(); //end Self Invoked Function

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


    //postFactory to get and post POSTS data using the API calls
    app.factory('postFactory', ['$http', function ($http) {
        console.log('in postFactory');
        var post = {};

        //gets the data from the api call using the $http
        post.getPosts = function () {

            return $http({
                method: 'GET',
                url: postURL,
                headers: {
                    'Content-Type': 'application/jsonp; charset=utf-8'
                }
            }).then(function successCallback(response) {
                console.log('in Success', response);

                return response.data;
            }, function errorCallback(response) {
                console.log('in Error', response);

            });
        }


        post.savePost = function (postData) {
            console.log('in PostFactory postData', postData);
            return $http({
                method: 'POST',
                url: postURL,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                },
                data: JSON.stringify(postData)
            }).then(
            function successCallback(response) {
                console.log('in Success', response);

                return response;
            },
            function errorCallback(response) {
                console.log('in Error', response);

            });
        }

        return post;

    }]);

})(); //end Self Invoked Function

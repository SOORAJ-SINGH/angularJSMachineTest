(function(){
	//postFactory to get and post POSTS data using the API calls
    app.factory('postFactory', ['$http', 'postURL', function ($http, postURL) {
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
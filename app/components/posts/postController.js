(function () {

  //registering the postController to the module
    app.controller('postController', [ 'postFactory', 'userService', '$routeParams', '$location', '$filter', postController]);
     
    //postsController();
     
    function postController ( postFactory, userService, $routeParams, $location, $filter) {
        console.log('in postsController');
        console.log('in postsController routeParams', $routeParams);

        var postCtrl = this;

        postCtrl.posts;
        postCtrl.postUsers;
        postCtrl.status;
        postCtrl.dataSaving = false;

        getPosts();
        getUsers();
        
        

        //check for the URL parameter
        if (Object.keys($routeParams).length !== 0) {
            console.log('$routeParams are present');
            postCtrl.urlUserId = $routeParams.id;
        }

        postCtrl.isActive = function (viewLocation) {
            console.log('in isActive viewlocation and location path', viewLocation, $location.path());
            var active = (viewLocation === $location.path());
            return active;
        };

        //get the post from postFactory 
        function getPosts() {
            //get the data from postFactory using API call
            postFactory.getPosts()
                .then(
                function (data) { console.debug('response in postController', data); postCtrl.posts = data; },
                function (response) { postCtrl.status = 'unable to load!'; });
        }

        //get the users details and assign the user data to the postCtrl
        function getUsers() {
            //get the data from postFactory using API call
            userService.getUsers()
                .then(
                function (data) {
                    console.log('getting users data to be used in postController', data);
                    postCtrl.postUsers = data;return data;
                },
                function (response) { postCtrl.status = 'unable to load!'; });
        }




        postCtrl.getUserName = function (userId) { 
            var userName = '';

            //this need to be done based on the getUsers data....
            if (postCtrl.postUsers) {

                //console.log('getting the usename by userId', userId);
                //console.log('users list',postCtrl.postUsers);
                
                //get the postUsers...........
                var found = $filter('filter')( postCtrl.postUsers, { id: userId }, true);
                
                if ( found !== undefined  ) { 
                //console.log('found users', found);
                       if (found.length) {
                               //found
                                userName = found[0].name;
                        }         
                }
                else{
                console.error('not found users', found);
                }
            }else{
                console.error('postUsers is empty!');
                //getUsers();
            }
            if (userName) {
                return userName;
            }
            else {
                return 'dummy';
            }

        }; //end getUserName

        //save the post by postFactory 
        postCtrl.savePost = function (myForm) {
            console.log('in SavePost', postCtrl);
            
            //console.log('myForm',myForm);
            if (myForm) {
                console.log('myForm', myForm.$valid);
                postCtrl.dataSaving = true;
                if (myForm.$valid) {
                    console.log('form is valid');
                    

                    var postData = angular.copy(postCtrl.post);
                    //pass is to the post factory to save using the API call 
                    postFactory.savePost(postCtrl.post)
                        .then(
                        function onSuccess(response) {
                            console.log('in Success savePost', response);
                            console.log('in Success status', response.status);

                            if (response.status === 201) {
                                console.log('in Success 201');
                                window.toastr.success('saved');
                            }
                            else {
                                window.toastr.error('Some error occurred!');
                            }
                            postCtrl.dataSaving = false;
                        },
                        function onError(response) {
                            console.log('in Error', response);
                            window.toastr.error('Some error occurred!');
                            postCtrl.dataSaving = false;

                        });
                }
                else {
                    console.log('Form not valid');
                    window.toastr.info('Form not Valid!');
                    postCtrl.dataSaving = false;
                }
            }
            else {
                console.log('form doesnt exists');
            }
        }
    }

    
})(); //end Self Invoked Function
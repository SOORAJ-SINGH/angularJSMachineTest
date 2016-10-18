(function(){
	"use strict";
	app.service('userAuthenticateService',['$rootScope','Base64','$timeout','$http','$cookies',function($rootScope,Base64,$timeout,$http,$cookies){
		console.log('in userAuthenticateService');

		//user login
		this.login = function(username,password,callback){
			console.log(' userAuthenticateService login');

			//dummy authentication....
			$timeout(function(){
				var response = {success: username === 'test'  && password === 'test'};
				if (!response.success) {
					response.message = "username or password not correct";
				};
				callback(response);
			},	1000);

		};


		//user setAuthenticationCredentials
		this.setCredentials = function(username,password){
			//create the authData
			var authData = Base64.encode(username +":"+password);
			
			//console.log('store in the global rootscope');
			//store in the global rootscope
			$rootScope.globals = {
				currentUser : username,
				authData : authData
			};
			console.log('$rootScope.globals',$rootScope.globals);
			//store this in cookies also and add as default in the http request.
			$http.defaults.headers.common['Authorization'] = 'Basic'  + authData;
			//console.log();
				//set the expiry to 10 minutes
			var expiresDate = new Date();
			expiresDate.setMinutes(expiresDate.getMinutes() + 10);
			console.log('expiresDate',expiresDate);
			$cookies.put('globals',JSON.stringify($rootScope.globals),{
            expires: expiresDate
        });
		};

		//clears the user AuthenticationCredentials
		this.clearCredentials = function () {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

	}]); //end userAuthenticateService


app.factory('Base64', function () {
    /* jshint ignore:start */
 
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
    /* jshint ignore:end */
});
})(); //end Self invoked function
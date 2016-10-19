(function(){
'use strict';

app.directive('mtModal',function(){
	return{
		restrict:'E',
		templateUrl : "app/common/modalTemplate.html",
		controller : function(){
			console.log('in the mtModal directive');
		}
	};
});	

})();//end Self invoked function
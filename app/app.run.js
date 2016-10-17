(function () {
  
    angular.module("machineTest").run(["ngTableDefaults", configureDefaults]);


    function configureDefaults(ngTableDefaults) {
        console.log('in app.run for configureDefaults ');
        ngTableDefaults.params.count = 5;
        ngTableDefaults.settings.counts = [];
    }




})(); //end Self Invoked Function
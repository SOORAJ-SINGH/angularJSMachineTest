//defining the machineTest module
var app = angular.module('machineTest', ['ngRoute', 'ui.bootstrap', 'ngTable','ngCookies'])
    .constant("userURL", "http://jsonplaceholder.typicode.com/users")
    .constant("postURL", "http://jsonplaceholder.typicode.com/posts");




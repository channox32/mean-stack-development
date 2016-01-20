(function(){

angular.module('Todo')
.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl : 'modules/user/index.html',
        controller: 'UserController',
        controllerAs : 'user'
    }).when('/profile/:user_id',{
        templateUrl : 'modules/profile/index.html',
        controller : 'UserController',
        controllerAs : 'profile'
    }).otherwise({
        redirectTo : '/'
    });
})
.controller('UserController',UserController);

UserController.$inject = ['$scope','$location','UserService','AuthService'];

function UserController($scope,$location,UserService,AuthService){
    var _self = this;

    _self.invalid = true;
    _self.registration = {
        password : '',
        re_password : ''
    }

    _self.launchModal = function(id){
        $(id).modal();
    }

    _self.login = function(){
        UserService.login(_self.loginData)
        .then(function(response){
            $location.path('/profile/' + AuthService.getUserData());
        },function(){
            alert("User does not exists!");
            _self.loginData.password = '';
        });
    }

    _self.register = function(id){
        UserService.register(_self.registration)
        .then(function(){
            $('#' + id).modal('toggle');
        }, function(){
            _self.registration = {};
        });
    }

    $scope.$watch(function(){
        return _self.registration.re_password;
    },function(newVal, oldVal){
        if(newVal !== '' && _self.registration.password !== '' && newVal === _self.registration.password){
            _self.invalid = false;
        }
    });

}

}());
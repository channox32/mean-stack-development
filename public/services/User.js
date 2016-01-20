(function(){
    angular.module('Todo')
    .service('UserService',UserService);

    UserService.$inject = ['$http','$q','AuthService'];

    function UserService($http,$q,AuthService){
        return {
            register : function(userData){
                var deferred = $q.defer();
                $http.post('apiv1/user/create',userData)
                .success(function(data,status){
                    if (data &&status && status === 200){
                        AuthService.user = data._id;
                        deferred.resolve();
                    }else{
                        deferred.reject();
                    }
                })
                .error(function(){
                    deferred.reject();
                });
                return deferred.promise;
            },

            login : function(userCredential){
                var deferred = $q.defer();
                $http.post('apiv1/user/login',userCredential)
                .success(function(data,status){
                    if(data && data.length > 0 && status && status === 200){
                        AuthService.user = data[data.length-1]._id;
                        deferred.resolve();
                    }else{
                        deferred.reject();
                    }
                }).error(function(){
                    deferred.reject();
                });
                return deferred.promise;
            }
        };
    }

}());
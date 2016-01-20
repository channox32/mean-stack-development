(function(){
    angular.module('Todo')
    .service('AuthService',AuthService);

    function AuthService(){
        return {
            user : undefined,
            isLoggedIn : function(){
                if(this.user){
                    return true;
                }else{
                    return false;
                }
            },
            getUserData : function(){
                return this.user;
            }
        };
    }
}());
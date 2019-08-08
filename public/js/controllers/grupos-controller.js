angular
    .module('alurapic')
    .controller('GruposController', function($scope, $http) {

        $scope.grupoLista = [];

        $http
            .get('v1/grupos')
            .success(function(grupos) {
                $scope.grupoLista = grupos;
            })
            .error(function(err0) {
                console.log(err0);
            });


    });
angular.module('alurapic').controller('FotosController', function($scope, $http) {

    $scope.fotoLista = [];

    /* Versão antiga
    var promise = $http.get('v1/fotos');
    promise
        .then( function(ret) {
            $scope.fotoLista = ret.data;
        })
        .catch( function(err0) {
            console.log(err0);
        });
    */

    $http.get('v1/fotos')
        .success( function(ret) {
            $scope.fotoLista = ret;
        })
        .error( function(err0) {
            console.log(err0)
        });

  });
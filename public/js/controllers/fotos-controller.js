angular
    .module('alurapic')
    .controller('FotosController', function($scope, $http) {

        $scope.fotoLista = [];
        $scope.filtro = '';
        $scope.mensagem = '';

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

        $http
            .get('v1/fotos')
            .success( function(ret) {
                $scope.fotoLista = ret;
            })
            .error( function(err0) {
                console.log(err0)
            });

        $scope
            .removerFoto = function(regFoto) {
                $http
                    .delete('v1/fotos/' + regFoto._id)
                    .success( function() {
                        var indexFoto = $scope.fotoLista.indexOf(regFoto);
                        $scope.fotoLista.splice(indexFoto,1);
                        $scope.mensagem = 'Foto ' + regFoto.titulo + ' deleted successfuly!';
                    })
                    .error( function(err0) {
                        console.log(err0);
                        $scope.mensagem = 'Foto ' + regFoto.titulo + ' not deleted!';
                    });
            };

    });
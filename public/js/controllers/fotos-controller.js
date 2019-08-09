angular
    .module('alurapic')
    .controller('FotosController', function($scope, recursoFoto) {

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

        // Está em meus-servicos.js
        // var recursoFoto = $resource('v1/fotos/:fotoId');

        // Consulta
        recursoFoto.query(
            function(regFot) {
                $scope.fotoLista = regFot;
            }, 
            function(err0) {
                console.log(err0);
            });

        /* Versão antiga II 
        $http
            .get('v1/fotos')
            .success( function(ret) {
                $scope.fotoLista = ret;
            })
            .error( function(err0) {
                console.log(err0)
            });
        */

        $scope
            .removerFoto = function(regFoto) {

                recursoFoto.delete({fotoId : regFoto._id}, 
                    function() {
                        var indexFoto = $scope.fotoLista.indexOf(regFoto);
                        $scope.fotoLista.splice(indexFoto,1);
                        $scope.mensagem = 'Foto ' + regFoto.titulo + ' deleted successfuly!';
                    },
                    function(err0) {
                        console.log(err0);
                        $scope.mensagem = 'Foto ' + regFoto.titulo + ' not deleted!';
                    });

                /* Versão antiga
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
                */
            };

    });
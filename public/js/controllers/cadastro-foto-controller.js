angular.module('alurapic')
    .controller('CadastroFotoController', function($scope, $http, $routeParams) {

        $scope.foto = {};
        $scope.mensagem = '';

        // $scope.exibeAlerta = false;  Para definir se mostra painel de mensagem ou não

        if( $routeParams.fotoId ) {
            $http
                .get('v1/fotos/' + $routeParams.fotoId)
                .success(function(regFoto) {
                    $scope.foto = regFoto;
                    // $scope.mensagem = `Foto ${$routeParams.fotoId}` TemplateString
                })
                .error(function(err0) {
                    console.log(err0);
                    $scope.mensagem = `Cannot possible to get foto`;
                });
        }

        $scope.submeterDados = function() {

            if ($scope.formulario.$valid) {
                if ($scope.foto._id) {
                    $http
                        .put('v1/fotos/' + $scope.foto._id, $scope.foto)
                        .success(function() {
                            $scope.foto = {};
                            $scope.mensagem = "Foto updated OK";
                        })
                        .error(function(err0) {
                            console.log(err0);
                            $scope.mensagem = "Fail to update foto";
                        });
                } else {
                    $http
                        .post('v1/fotos', $scope.foto)
                        .success(function() {
                            $scope.foto = {};
                            $scope.mensagem = "Foto added OK";
                        })
                        .error(function(err0) {
                            console.log(err0);
                            $scope.mensagem = "Fail to insert foto";
                        });
                } // if ($scope.foto._id) ... else ...
            } // if ($scope.formulario.$valid)

        };

    });
angular.module('alurapic')
    .controller('CadastroFotoController', function($scope, $http) {

        $scope.foto = {};

        $scope.mensagem = '';

        // $scope.exibeAlerta = false;

        $scope.submeterDados = function() {

            if ($scope.formulario.$valid) {
                $http
                    .post('v1/fotos', $scope.foto)
                    .success(function() {
                        $scope.foto = {};
                        $scope.mensagem = "Foto cadastrado OK";
                    })
                    .error(function(err0) {
                        $scope.mensagem = "Falha na inserção da foto";
                        console.log(err0);
                    });
            }


        };


    });
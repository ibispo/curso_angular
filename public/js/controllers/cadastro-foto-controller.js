
// Fonte: http://www.fundosanimais.com/Imagens/gato.jpg

angular.module('alurapic').controller('CadastroFotoController', 
    // ['$scope', 'recursoFoto', '$routeParams', 'cadastroDeFotos',
    function($scope, recursoFoto, $routeParams, cadastroFotos) {

        $scope.foto = {};
        $scope.mensagem = '';

        /* 
            Se eu quero usar, query string, i.e, para montar URL padrão
            servico.jsp?para1=X&param2=Y...

            // Está em meus-servicos.js
            var queryString = null;
            var recursoFoto = $resource( 'v1/fotos/:fotoId', queryString, 
            {
                update : {
                    method: 'PUT'
                }
            });
        */

        // $scope.exibeAlerta = false;  Para definir se mostra painel de mensagem ou não

        if( $routeParams.fotoId ) {

            recursoFoto.get({fotoId : $routeParams.fotoId}, 
                function(regFoto) {
                    $scope.foto = regFoto;
                },
                function(err0) {
                    console.log(err0);
                    $scope.mensagem = `Cannot possible to get foto.`;
                });

            /* Versão antiga
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
            */
        }

        $scope.submeterDados = function() {

            if ($scope.formulario.$valid) {


                /*

                    Por convenção, o controller não pode manipular DOM.
                    Temos que utilizar o conceito de "two ways bind".
                    ---------------------------------------------------
                    Temos que ter baixo (ou nenhum) acoplamento entre o DOM
                    e o controller.

                    Portanto, manipular DOM no controller é uma completa 
                    heresia.

                    Diretiva do Angular: Se for necessária, a manipulação do DOM
                    no controller é permitida, pq, é possível a manipulação de 
                    forma "confinada", ie, de forma apartada do controller.

                */


                cadastroFotos.cadastrar($scope.foto)
                    .then(function(dados) {
                        $scope.mensagem = dados.mensagem;
                        if ( dados.inclusao )
                            $scope.foto = {};
                       
                       // $scope.focado = true;

                       /*
                            $scope tem outras propriedades e uma dela é
                            broadcast
                       */

                       // $scope.$broadcast('fotoCadastrada');

                    })
                    .catch(function(dados) {
                        $scope.mensagem = dados.mensagem;
                    })
                    


                /*

                    Versão anterior ANTES da factory "cadastroFotos"
                    em "meus-servicos.js"


                if ($scope.foto._id) {

                    recursoFoto.update({fotoId: $scope.foto._id}, $scope.foto, 
                        function() {
                            // $scope.foto = {};
                            $scope.mensagem = "Foto updated OK";
                        },
                        function(err0) {
                            console.log(err0);
                            $scope.mensagem = "Fail to update foto";
                        });

                    / ************************* Versão antiga
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
                    **************************** /

                } else {

                    recursoFoto.save($scope.foto, 
                        function() {
                            $scope.foto = {};
                            $scope.mensagem = "Foto added OK";
                        },
                        function(err0) {
                            console.log(err0);
                            $scope.mensagem = "Fail to insert foto";
                        });

                    / *************************** Versão antiga
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
                    **************************** /

                } // if ($scope.foto._id) ... else ...

                */

            } // if ($scope.formulario.$valid)

        };

    } /* ] */ );
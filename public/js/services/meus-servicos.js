angular.module('meuServico', ['ngResource'])

    /*

        Serviço de "foto"

    */


    .factory('recursoFoto', 
        function($resource) {

            /*
                Se eu quero usar, query string, i.e, para montar URL padrão
                servico.jsp?para1=X&param2=Y...

                Por isso, queryString abaixo está null
            */
            var queryString = null;

            /*
                O $resource não suporta o verbo HTTP PUT, porém é possível 
                implementá-lo. Por fim, a declaração correta da função .query() 
                precisa receber funções anônimas. A primeira representando a 
                função (callback) de sucesso, e a segunda a função de erro.            
            */

            return $resource( 'v1/fotos/:fotoId', queryString, {
                update : {
                    method: 'PUT'
                }
                
        });

    })

    /*

        $q é uma "promise"

        $rootScope é o "pai" de todos os $scope da aplicação


    */

    .factory('cadastroFotos', function(recursoFoto, $q, $rootScope) {

        var servico = {};
        var evento = 'fotoCadastrada';

        servico.cadastrar = function(photo) {

            return $q( function(resolve, reject) {
                if (photo._id) {
                    // -> Alterar
                    recursoFoto.update({fotoId : photo._id}, photo, 
                        function() {
                            $rootScope.$broadcast(evento);
                            resolve({
                                mensagem : `Foto ${photo.titulo} updated successfuly.`,
                                inclusao : false
                            });
                        },
                        function(err0) {
                            console.log(err0);
                            reject({
                                mensagem : `Cannot possible update photo ${photo.titulo}.`
                            });
                        });
                } else {
                    // -> Incluir
                    recursoFoto.save(photo, 
                        function() {
                            $rootScope.$broadcast(evento);
                            resolve({
                                mensagem : `Foto ${photo.titulo} added successfuly.`,
                                inclusao : true
                            });
                        },
                        function(err0) {
                            console.log(err0);
                            reject( {
                                mensagem : `Cannot possible add photo ${photo.titulo}.`
                            });
                        });
                }
            });

        }

        return servico;

    });
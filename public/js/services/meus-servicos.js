angular
    .module('meuServico', ['ngResource'])
    .factory('recursoFoto', 
        function($resource) {

            /*
            Se eu quero usar, query string, i.e, para montar URL padrão
            servico.jsp?para1=X&param2=Y...
            */
            var queryString = null;
            return $resource( 'v1/fotos/:fotoId', queryString, {
                update : {
                    method: 'PUT'
                }
                
        });

    });

/*
    Diretivas são componentes reutilizáveis que podem encapsular marcação e comportamento. 
    São criadas sempre dentro de um módulo através da função .directive. Toda diretiva 
    deve sempre retornar um DDO (Directive Definition Object) configurado para que 
    funcione

    É aconselhável que manipulação de DOM seja realizada em diretivas, assim 
    separamos essa responsabilidade do código de um controller ou de um serviço. 
    Por consequência ambos tornam-se mais fáceis de compreender e de testar. 
    Porém, nada impede que o desenvolvedor manipule DOM dentro dos controllers, 
    o Angular não bloqueia isso, apesar de contestável, pela filosofia do 
    framework.


    ddo.scope
    ---------
    Usamos @ quando queremos realizar uma cópia do valor passado para a diretiva 
    no HTML para dentro do escopo isolado na diretiva. Essa cópia é sempre um 
    valor em string.

    Usamos & geralmente quando queremos executar dentro de uma diretiva uma 
    função que pertence a um escopo pai, o de um controller.

    Usamos = quando queremos que tanto a diretiva quanto o controller acessem o 
    mesmo dado, isto é, qualquer alteração no escopo privado da diretiva afetará 
    a propriedade do controller e qualquer alteração nesta propriedade no 
    controller afetará a diretiva. Temos aqui uma comunicação bidirecional.

*/

        /*
            directive -> 'meuPainel'

            Com a propriedade restrict declaramos que ela pode ser utilizada 
            tanto como atributo (A), quanto como elemento (E). Mesmo usando 
            camelCase na definição da diretiva, devemos utilizar o hífen na 
            marcação HTML.

            Elemento
            <meu-painel></meu-painel>

            Atributo ------\
            <div         meu-painel    ></div>

        */

angular.module('minhaDiretiva', [])
    .directive('meuPainel', function() {
      

        var ddo = {};  /// Directive definition object
      
        ddo.restrict = "AE";   // (A)ttribute (E)lement

        ddo.scope = {
            titulo: '@'  // ou '@titulo', caso o escopo privado da diretiva tenha o mesmo nome do atributo
        };

        ddo.transclude = true; // Para incluir tags "filhas"

        ddo.templateUrl = 'js/directives/meu-painel.html';

        return ddo;

    })
    .directive('minhaFoto', function() {
      
        var ddo = {};  /// Directive definition object
      
        ddo.restrict = "AE";   // (A)ttribute (E)lement

        ddo.scope = {
            url: '@',  
            titulo: '@'  
        };

        // ddo.transclude = true; // Para incluir tags "filhas"

        ddo.templateUrl = 'js/directives/minha-foto.html';

        return ddo;

    })
    .directive('meuBotaoPerigo', function() {
      
        var ddo = {};  
      
        ddo.restrict = "E";   // (E)lement

        ddo.scope = {
            nome: '@',  // String (Cópia de valor)
            acao: '&'   // Passar expressão (referencia) a ser avaliada na diretiva. Ela quer chamar o "remover" do Controller
        };

        ddo.template = '<button ng-click="acao(foto);" class="btn btn-danger btn-block">{{nome}}</button>';

        return ddo;

    })
    .directive('meuFoco', function() {

        var ddo = {};

        ddo.restrict = "A";

        /*
        ddo.scope = {
            focado : '=' // Permite que qquer alteracao que minha diretiva faça, meu controller ficará sabendo
        };
        */

        /* TEM QUE SER NESSA ORDEM (parâmetros posicionais)
           ------------------------------------------------
           1º parâmetro = scope
           2º parâmetro = element
        */

        ddo.link = function(scope /* da diretiva */, element /* do DOM */ ) {

            /*

                "$watch" é um pouco custoso para processamento. Se tiverem muitos
                "watches" a coisa pode ficar lenta. É importante avaliar outras
                opções para obtenção dos mesmos resultados.

                
                
                scope.$watch('focado', function() {
                    // alert('Changed!');
                    if (scope.focado) {
                        // JQLite de manipulação de DOM - API Siso não tem focus()
                        element[0].focus();
                        scope.focado = false;
                    }
                });
                
                
            */

            // retirado focado="focado" do elemento do DOM <a> em foto.html

            scope.$on('fotoCadastrada', function() {
                element[0].focus();
            });

                
        }

        return ddo;

    })
    .directive( 'focoBispo', function() {

        var ddo = {};

        ddo.restrict = "A";

        ddo.scope = {
            focado : '=' // Permite que qquer alteracao que minha diretiva faça, meu controller ficará sabendo
        };

        ddo.link = function( escopo, elemento, atributos ) {

            escopo.$watch('focado', function(newValue, oldValue) {

                console.log(atributos);

                console.log(
`Element: ${elemento[0].name}
New: ${newValue}
Old: ${oldValue}`
);

            }, true);

        };

        return ddo;

    })
    .directive('meusTitulos', function() {
        
        var ddo = {};
        
        ddo.restrict = 'E';
        
        ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';

        ddo.controller = function($scope, recursoFoto) {
            recursoFoto.query( function(listaFoto) {
                $scope.titulos = listaFoto.map(foto => foto.titulo);
            });
        };

        return ddo;

    });
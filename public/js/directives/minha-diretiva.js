
/*
    Diretivas são componentes reutilizáveis que podem encapsular marcação e comportamento. 
    São criadas sempre dentro de um módulo através da função .directive. Toda diretiva 
    deve sempre retornar um DDO (Directive Definition Object) configurado para que 
    funcione
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

    });
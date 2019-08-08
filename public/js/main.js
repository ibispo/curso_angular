// Criando modulo principal da aplicacao
angular
    .module('alurapic', ['minhaDiretiva', 'ngAnimate', 'ngRoute'])
    .config(function($routeProvider, $locationProvider) {

        /*
        Para habilitarmos o sistema de rotas no modo html5Mode 
        sabemos que é necessária a diretiva <base href="/"> 
        dentro da tag <head> da view principal da aplicação

        Precisamos do artefato $locationProvider para 
        habilitarmos o html5Mode. É através dele que 
        habilitamos este modo.
        */

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/fotos', {
                templateUrl: 'partials/principal.html',
                controller: 'FotosController'
            });

        $routeProvider
            .when('/fotos/new', {
                templateUrl: 'partials/foto.html',
                controller: 'CadastroFotoController'
            });            

        $routeProvider
            .when('/fotos/edit/:fotoId', {
                templateUrl: 'partials/foto.html',
                controller: 'CadastroFotoController'
            });            

        $routeProvider
            .otherwise({redirectTo: '/fotos'});


    }); 




// A linha importar o módulo "ngAnimate" necessário para trabalhar com animações CSS.

/*

Uma AE (Angular Expression) é somente leitura, nossa view lê a informação no escopo do 
controller, mas não é capaz de atualizá-la. Este tipo de associação é chamado de 
one-way data binding, a informação flui do controller para a view. Aliás, esse dado 
associado à view pode ser qualquer tipo literal do JavaScript, inclusive um objeto.

Angular não se coaduna com a prática do "Progressive Enhancement", no qual criamos 
uma página usando um simples HTML e CSS, usando JavaScript apenas para adicionar 
melhorias. Com Angular, se o JavaScript estiver desativado ou não for suportado, 
nada da aplicação funcionará.

*/
// Criando modulo principal da aplicacao
angular.module('alurapic', []);


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
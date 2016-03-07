var Angpress = angular.module('Angpress', [
  'ngRoute',
  'articoliControllers',
  'ui.bootstrap',
  'ngSanitize',
  'ngResource',
  'angular-loading-bar',
  'ngAnimate'
]);


Angpress.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.
  when('/', {
    templateUrl: 'wp-content/themes/angularpress/template/list.html',
    controller: 'ListaController',
    redirectTo: 'page/1'
  }).

  when('/page/:currentPage', {
        templateUrl: 'wp-content/themes/angularpress/template/list.html',
        controller: 'ListaController'
        
    }).

  when('/page/:currentPage/articolo/:itemId', {
    templateUrl: 'wp-content/themes/angularpress/template/articolo.html',
    controller: 'DettaglioController'
    
  }).

////////////////////////////////////
// Categoria
//////////////////////////////////// 

   when('/cat/:categoryy/:catID/page/:currentPage', {
    templateUrl: 'wp-content/themes/angularpress/template/categoria.html',
    controller: 'CategoriaController',

  }).

   when('/cat/:categoryy/:catID/page/:currentPage/articolo/:itemId', {
    templateUrl: 'wp-content/themes/angularpress/template/articolo-cat.html',
    controller: 'DettagliocatController',

}).
 

////////////////////////////////////
// Page
//////////////////////////////////// 


   when('/pagina/:itemId', {
    templateUrl: '/wp-content/themes/angularpress/template/articolo-pag.html',
    controller: 'DettaglioPAGController'    
    
  }). 


  otherwise({
    redirectTo: '/'
  });
}]);



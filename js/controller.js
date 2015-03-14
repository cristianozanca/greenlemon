// Recupero valori dall'header json per numero articoli totali per paginazione

var req = new XMLHttpRequest();
var URL =   'wp-json/posts';
req.open('GET', URL, false);
req.send(null);
// se serve attivare max pagine dall Header con la riga qui sotto
// var maxpagine = req.getResponseHeader("X-WP-TotalPages");
var totarticoli = req.getResponseHeader("X-WP-Total");
//var currentPage = -1;
//var newPage = '';

// Factory per valore articoli per page da recuperare in controllers con l'injection di "artperpagina"

var articoliControllers = angular.module('articoliControllers', []);

articoliControllers.factory('artperpagina', function() {
     
      return {
                  itemsPerPage : 3
              };
      
          });
////////////////////////////////////////////////////////////////////////////////////////////

// Lista articoli totali

////////////////////////////////////////////////////////////////////////////////////////////

articoliControllers.controller('ListaController', ['$scope', 'artperpagina', '$http','$routeParams','$location','$rootScope', function($scope, artperpagina,$http, $routeParams, $location,$rootScope) {

  $scope.itemsPerPage = artperpagina.itemsPerPage;

  $scope.totalItems = totarticoli; //preso da get header
  $scope.numeropagine = Math.ceil(totarticoli / $scope.itemsPerPage);
  $scope.currentPage = $routeParams.currentPage;

  
// attivo la classe active sulla voce del menu bootstrap selezionata

  $scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) == 0;
    };

// questo per Go to page

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
 
  $scope.$watch("currentPage",function(value){
    $rootScope.watchPage = value;
    if (value){
      $location.path("/page/" + value);
      // [ignore_sticky_posts] perché altrimenti si rompe la paginazione (n post per page)
      $http.get('wp-json/posts?filter[ignore_sticky_posts]=0&filter[posts_per_page]=' + $scope.itemsPerPage + '&page=' + value)
       .then(function(res){
          $scope.filteredArticoli = res.data; 

    });

    }
  });
  



}]);

////////////////////////////////////////////////////////////////////////////////////////////

// articolo singolo da lista articoli totali

////////////////////////////////////////////////////////////////////////////////////////////

articoliControllers.controller('DettaglioController', ['$scope', 'artperpagina', '$http','$routeParams','$location','$rootScope', function($scope, artperpagina, $http, $routeParams, $location, $rootScope) {

// attivo la classe active sulla voce del menu bootstrap selezionata

  $scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) == 0;
    };


//var paginaback = $routeParams.currentPage;
$scope.paginaback = Number($routeParams.currentPage);  

$http.get('wp-json/posts?filter[ignore_sticky_posts]=1&filter[posts_per_page]=' + artperpagina.itemsPerPage + '&page=' + $routeParams.currentPage )
       .then(function(res){
          $scope.filteredArticoli = res.data; 
    $scope.whichItem = $routeParams.itemId;
    //console.log($scope.whichItem);

    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId)-1;
    } else {
      $scope.prevItem = $scope.filteredArticoli.length-1;
      //console.log( $scope.filteredArticoli.length);
    }

    if ($routeParams.itemId < $scope.filteredArticoli.length-1) {
      $scope.nextItem = Number($routeParams.itemId)+1;
    } else {
      $scope.nextItem = 0;
    }

    });



}]);


////////////////////////////////////////////////////////////////////////////////////////////

// elenco articoli di categoria

////////////////////////////////////////////////////////////////////////////////////////////

articoliControllers.controller('CategoriaController', ['$scope','$route','artperpagina', '$http','$routeParams','$location','$rootScope', function($scope, $route, artperpagina, $http, $routeParams, $location,$rootScope) {

// prendo il numero di articoli della categoria dall' ID CATEGORIA dell'url json

//$catnum = $route.current.catID;
$catnum = Number($routeParams.catID);
//console.log($catnum);
// porto ID categoria nel template
$scope.catnumz = $catnum;
$http.get('wp-json/taxonomies/category/terms/' + $catnum + '').success(function(data){
    var count = data['count'];
    
  $scope.itemsPerPage = artperpagina.itemsPerPage;
  $scope.totalItems = count;
  $scope.numeropagine = Math.ceil(count / $scope.itemsPerPage);
  //console.log($scope.numeropagine);
 
// NOME DELLA CATEGORIA
  //$categoria = 'categoria1';

  //$categoria = $route.current.catname;
  $categoria = $routeParams.categoryy;
  //console.log($categoria);

  $scope.categoriaz = $categoria;
  
// vedo qual'è la pagina corrente

  $scope.currentPage = $routeParams.currentPage;
   
// attivo la classe active sulla voce del menu bootstrap selezionata

$scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) == 0;
    };


// questo per Go to page

       $scope.setPage = function (pageNo) {
       $scope.currentPage = pageNo;
      };

// prendo dati dal json a seconda della pagina in cui mi trovo
 
  $scope.$watch("currentPage",function(value){

    $rootScope.watchPage = value;

    if (value){
      $location.path("/cat/" + $categoria + "/" + $catnum + "/page/" + value);
 
  $http.get('wp-json/posts?filter[posts_per_page]=' + artperpagina.itemsPerPage + '&filter[cat]='+ $catnum +'&page=' + value)

  

       .then(function(res){
          $scope.filteredCategorie = res.data;
          


    });

    }
  });

// after linea 77 chiudo se c'è errore apro pop-up
}).
  error(function(data) {
    alert('data categoria missing');
  });

}]);

////////////////////////////////////////////////////////////////////////////////////////////

// articolo singolo da categoria

////////////////////////////////////////////////////////////////////////////////////////////

articoliControllers.controller('DettagliocatController', ['$scope','$route', 'artperpagina', '$http','$routeParams','$location','$rootScope', function($scope, $route, artperpagina, $http, $routeParams, $location , $rootScope) {

// attivo la classe active sulla voce del menu bootstrap selezionata

  $scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) == 0;
    };

// prendo il nome della categoria da url  
//$categoria = $route.current.catname;
$categoria = $routeParams.categoryy;

// porto nome categoria nei template
$scope.categoriaz = $categoria;
$catnum = Number($routeParams.catID); 
// porto ID categoria nel template
$scope.catnumz = $catnum;    

//var paginaback = $routeParams.currentPage;
$scope.paginaback = Number($routeParams.currentPage);  

//  INSERIRE CATEGORY NAME dopo [category_name]

$http.get('wp-json/posts?filter[cat]=' + $catnum + '&page=' + $routeParams.currentPage)
       .then(function(res){
          $scope.filteredCategorie = res.data; 
    $scope.whichItem = $routeParams.itemId;

    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId)-1;
    } else {
      $scope.prevItem = $scope.filteredCategorie.length-1;
      //console.log($scope.filteredCategorie.length);
    }

    if ($routeParams.itemId < $scope.filteredCategorie.length-1) {
      $scope.nextItem = Number($routeParams.itemId)+1;
    } else {
      $scope.nextItem = 0;
    }

    });



}]);


////////////////////////////////////////////////////////////////////////////////////////////

// pagina singola

////////////////////////////////////////////////////////////////////////////////////////////

articoliControllers.controller('DettaglioPAGController', ['$scope','$route', 'artperpagina', '$http','$routeParams','$location','$rootScope', function($scope, $route, artperpagina, $http, $routeParams, $location , $rootScope) {


//$scope.paginaback = Number($routeParams.currentPage);  

// prendo l id della pagina
$scope.item_id = $routeParams.itemId;

//carico il json della pagina 
$http.get('wp-json/posts/' + $scope.item_id )
       .then(function(res){
          $scope.filteredPagina = res.data; 

    });



}]);


////////////////////////////////////////////////////////////////////////////////////////////
// Recupero valori dall'header json per numero articoli totali per paginazione

var req = new XMLHttpRequest();
var URL = "/wp-json/posts";
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
      $http.get('/wp-json/posts?filter[ignore_sticky_posts]=0&filter[posts_per_page]=' + $scope.itemsPerPage + '&page=' + value)
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

$http.get('/wp-json/posts?filter[ignore_sticky_posts]=1&filter[posts_per_page]=' + artperpagina.itemsPerPage + '&page=' + $routeParams.currentPage )
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

// elenco articoli di categoria1 

////////////////////////////////////////////////////////////////////////////////////////////

articoliControllers.controller('CategoriaController', ['$scope','$route','artperpagina', '$http','$routeParams','$location','$rootScope', function($scope, $route, artperpagina, $http, $routeParams, $location,$rootScope) {

// prendo il numero di articoli della categoria dall' ID CATEGORIA dell'url json

$catnum = $route.current.catID;
$http.get('/wp-json/taxonomies/category/terms/' + $catnum + '').success(function(data){
    var count = data['count'];
    
  $scope.itemsPerPage = artperpagina.itemsPerPage;
  $scope.totalItems = count;
  $scope.numeropagine = Math.ceil(count / $scope.itemsPerPage);
 
// NOME DELLA CATEGORIA
  //$categoria = 'categoria1';

  $categoria = $route.current.catname;
  
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
      $location.path("/" + $categoria + "/page/" + value);
 
  $http.get('/wp-json/posts?filter[posts_per_page]=' + artperpagina.itemsPerPage + '&filter[category_name]='+ $categoria +'&page=' + value)

  

       .then(function(res){
          $scope.filteredCategorie = res.data;
          


    });

    }
  });

// after linea 77 chiudo se c'è errore apro pop-up
}).
  error(function(data) {
    alert('data categoria1 missing');
  });

}]);

////////////////////////////////////////////////////////////////////////////////////////////

// articolo singolo da categoria1

////////////////////////////////////////////////////////////////////////////////////////////

articoliControllers.controller('DettagliocatController', ['$scope','$route', 'artperpagina', '$http','$routeParams','$location','$rootScope', function($scope, $route, artperpagina, $http, $routeParams, $location , $rootScope) {

// attivo la classe active sulla voce del menu bootstrap selezionata

  $scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) == 0;
    };
$categoria = $route.current.catname;
     
    //alert(categoryname);   

//var paginaback = $routeParams.currentPage;
$scope.paginaback = Number($routeParams.currentPage);  

//  INSERIRE CATEGORY NAME dopo [category_name]

$http.get('/wp-json/posts?filter[category_name]=' + $categoria + '&page=' + $routeParams.currentPage)
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

// elenco articoli di una categoria specifica = post-formats

////////////////////////////////////////////////////////////////////////////////////////////

articoliControllers.controller('CategoriaControllerpf', ['$scope','artperpagina', '$http','$routeParams','$location','$rootScope', function($scope, artperpagina, $http, $routeParams, $location,$rootScope) {

// prendo il numero di articoli della categoria dall' ID CATEGORIA dell'url json

$http.get('/wp-json/taxonomies/category/terms/205').success(function(data){
    var count = data['count'];

// selezionare quanti articoli per pagina

  $scope.itemsPerPage = artperpagina.itemsPerPage;
  $scope.totalItems = count;
  $scope.numeropagine = Math.ceil(count / $scope.itemsPerPage);

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
      $location.path("/post-formats/page/" + value);

  // prendo i dati delle pagine della categoria

  $http.get('/wp-json/posts?filter[posts_per_page]=' + artperpagina.itemsPerPage + '&filter[category_name]=post-formats&page=' + value)
  

       .then(function(res){
          $scope.filteredCategorie = res.data;
          // $scope.numeropagine = ($scope.filteredCategorie.length / $scope.itemsPerPage) ;


    });

    }
  });

// after linea 77 chiudo e e c'è errore apro pop-up
}).
  error(function(data) {
    alert('data post-formats missing');
  });

}]);

////////////////////////////////////////////////////////////////////////////////////////////

// articolo singolo di una categoria specifica = post-formats

////////////////////////////////////////////////////////////////////////////////////////////

articoliControllers.controller('DettagliocatControllerpf', ['$scope', 'artperpagina','$http','$routeParams','$location','$rootScope', function($scope, artperpagina, $http, $routeParams, $location, $rootScope) {

// attivo la classe active sulla voce del menu bootstrap selezionata

$scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) == 0;
    };


//var paginaback = $routeParams.currentPage;
$scope.paginaback = Number($routeParams.currentPage);  

//  INSERIRE CATEGORY NAME dopo [category_name]

$http.get('/wp-json/posts?filter[posts_per_page]=' + artperpagina.itemsPerPage + '&filter[category_name]=post-formats&page=' + $routeParams.currentPage)
       .then(function(res){
          $scope.filteredCategorie = res.data; 
    $scope.whichItem = $routeParams.itemId;

    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId)-1;
    } else {
      $scope.prevItem = $scope.filteredCategorie.length-1;
      
    }

    if ($routeParams.itemId < $scope.filteredCategorie.length-1) {
      $scope.nextItem = Number($routeParams.itemId)+1;
    } else {
      $scope.nextItem = 0;
    }

    });



}]);

////////////////////////////////////////////////////////////////////////////////////////////

// elenco articoli di una categoria specifica = markup

////////////////////////////////////////////////////////////////////////////////////////////

articoliControllers.controller('CategoriaControllerMark', ['$scope','artperpagina', '$http','$routeParams','$location','$rootScope', function($scope, artperpagina, $http, $routeParams, $location,$rootScope) {

// nome CATEGORIA e ID <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

$nomecategoria = 'markup';
$idcat = 196;

// prendo il numero di articoli della categoria dall' ID CATEGORIA dell'url json

$http.get('/wp-json/taxonomies/category/terms/'+ $idcat).success(function(data){
    var count = data['count'];

// selezionare quanti articoli per pagina

  $scope.itemsPerPage = artperpagina.itemsPerPage;
  $scope.totalItems = count;
  $scope.numeropagine = Math.ceil(count / $scope.itemsPerPage);

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

      // NOME CATEGORIA 

      $location.path('/' + $nomecategoria +'/page/' + value);
     
  // prendo i dati delle pagine della CATEGORIA

  $http.get('/wp-json/posts?filter[posts_per_page]=' + artperpagina.itemsPerPage + '&filter[category_name]=' + $nomecategoria +'&page=' + value)
  

       .then(function(res){
          $scope.filteredCategorie = res.data;
          // $scope.numeropagine = ($scope.filteredCategorie.length / $scope.itemsPerPage) ;


    });

    }
  });

// after linea 77 chiudo e e c'è errore apro pop-up
}).
  error(function(data) {
    alert('data post-formats missing');
  });

}]);

////////////////////////////////////////////////////////////////////////////////////////////

// articolo singolo di una categoria specifica = markup

////////////////////////////////////////////////////////////////////////////////////////////

articoliControllers.controller('DettagliocatControllerMark', ['$scope', 'artperpagina','$http','$routeParams','$location','$rootScope', function($scope, artperpagina, $http, $routeParams, $location, $rootScope) {

//  INSERIRE CATEGORY NAME SLUG  [category_name] <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

$nomecategoria = 'markup';

// attivo la classe active sulla voce del menu bootstrap selezionata

$scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) == 0;
    };


//var paginaback = $routeParams.currentPage;
$scope.paginaback = Number($routeParams.currentPage);  

$http.get('/wp-json/posts?filter[posts_per_page]=' + artperpagina.itemsPerPage + '&filter[category_name]=' + $nomecategoria + '&page=' + $routeParams.currentPage)
       .then(function(res){
          $scope.filteredCategorie = res.data; 
    $scope.whichItem = $routeParams.itemId;

    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId)-1;
    } else {
      $scope.prevItem = $scope.filteredCategorie.length-1;
      
    }

    if ($routeParams.itemId < $scope.filteredCategorie.length-1) {
      $scope.nextItem = Number($routeParams.itemId)+1;
    } else {
      $scope.nextItem = 0;
    }

    });



}]);

////////////////////////////////////////////////////////////////////////////////////////////


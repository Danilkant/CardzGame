'use strict';

var app = angular.module('CardGame', ['ngRoute', 'ngResource']);

app.directive('routeLoader', function() {
  return {
    restrict: 'EA',
    link: function(scope, element) {
      // Store original display mode of element
      var shownType = element.css('display');
      function hideElement() {
        element.css('display', 'none');
      }
            
      scope.$on('$routeChangeStart', function() {
        element.css('display', shownType);
      });
      scope.$on('$routeChangeSuccess',hideElement);
      scope.$on('$routeChangeError', hideElement);
      // Initially element is hidden
      hideElement();
    }
  }
});

app.factory('Dumpster', function($resource) {

    return $resource('/files/cardraveyard.json', { }, {
      getData: {method: 'GET', isArray: false}
    });

});
app.controller('MainController', function($scope, $route, $routeParams, $location, Dumpster) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams; 
     $scope.confirm = "You are now in the dumpster.";
     $scope.keyword = "console";

     $scope.cd = {
        cd: Dumpster.getData(),

        getSearch: function(method, title){
          var list = [];
          var data = $scope.cd.cd;

          for(var a of data.cards){
            if(a.title.toLowerCase().includes(title.toLowerCase())){
              list.push(a);
            }
          }
          if(method != $scope.keyword){
            if(list.length === 1){
              return list[0];
            }else{
              return list;
            }
          }else{
            console.log(list);
          }
        }
     };

     $scope.initializeCD = function(){
     };
});

app.controller('gameDataController', function($scope, $routeParams) {
  $scope.name = "gameDataController";
  $scope.params = $routeParams;

  $scope.searchAssist = function(event){
    return event.currentTarget.value;
  };

  $scope.randomQuote = function(quotes){
    var quote;
    quote = quotes[Math.floor((Math.random() * quotes.length))]
    return quote;
  };


});

app.config(function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/main', {
      templateUrl: '/js/templates/templateMenu.html',
    })
    .when('/deck', {
      templateUrl: '/js/templates/templateDeck.html',
      controller : 'gameDataController',
    })
    .when('/deck/:title', {
      templateUrl: '/js/templates/templateCard.html',
      controller : 'gameDataController',

    })
    .otherwise({
      redirectTo: '/main'
    })
});
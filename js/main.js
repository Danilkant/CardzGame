'use strict';

var app = angular.module('CardGame', ['ngRoute', 'ngResource', 'mm.foundation']);

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

app.factory('CardDumpster', function($resource) {

    return $resource('/files/cardraveyard.json', { }, {
      getData: {method: 'GET', isArray: false}
    });

});

app.factory('RepetetiveTable', function() {

    return function(type, response){
          
          if(typeof(response) === 'object'){
            var link = document.getElementById(type);
            var preText;
            preText += '<table>';
            preText += '<thead>';
            console.log(response);
            for(var a of response){ 
              for(var b in a){
                preText += '<th>'+b+'</th>';
              }
              break;
            }
            preText += '</thead>';
            preText += '<tbody>';
            for(var a of response){
              preText += '<tr>'; 
              for(b in a){
                preText += '<td>'+a[b]+'</td>';
              }
              preText += '</tr>';
            }
            preText += '</tbody>';
            preText += '</table>';
            link.innerHTML = preText;
          }else{
            console.log(typeof(response));
          }
    }
});
app.controller('MainController', function($scope, $route, $routeParams, $location, CardDumpster) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams; 
     $scope.confirm = "You are now in the dumpster.";
     $scope.keyword = "console";

     $scope.cd = {
        cd: CardDumpster.getData(),

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

     $scope.pd = {
        max: 4,
        pd: [],

        alterDeck: function(method, title){
          var card = $scope.cd.getSearch('', title);
          var arr = $scope.pd.pd;
          var altered = false;

           switch(method.toLowerCase(method)){
             case 'add':
               if(arr.indexOf(card) === -1){
                 if(arr.length < $scope.pd.max){
                   if(card.title != undefined){
                     arr.push(card);
                     altered = true;
                   }else{
                     console.log("Data type isn\'t a card.");
                   }
                 }else{
                   console.log("Deck has reached max capacity.");
                 }
               }else{
                 console.log("Already exists: "+title);
               }
               break;
             case 'delete':
                 if(card.title != undefined){
                   var index = arr.indexOf(card);
                   if(index > -1){
                     arr.splice(index, 1);
                     altered = true;
                   }
                 }
               break;
             default: console.log("Method doesn\'t exist: "+method);
               break;
           }

          if(altered === true){
            $scope.pd.pd = arr;
          }
        }
     };
});

app.controller('gameDataController', function($scope, $routeParams) {
  $scope.name = "gameDataController";
  $scope.params = $routeParams;

  $scope.searchAssist = function(event){
    console.log(event.currentTarget.value);
    return event.currentTarget.value;
  };

  $scope.randomQuote = function(quotes){
    var quote;
    quote = quotes[Math.floor((Math.random() * quotes.length))]
    return quote;
  };


});

app.controller('gamePlayController', function($scope, $routeParams) {
  $scope.name = "gamePlayController";
  $scope.params = $routeParams;

  $scope.friendly = {
    field: []
  };

  $scope.enemy = {
    field: []
  };

  $scope.initializeFields = function(){
    var deck = $scope.pd.pd;
    $scope.enemy.field = deck;
    $scope.friendly.field = deck;
  };
});

app.config(function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider
    .when('/main', {
      templateUrl: '/js/templates/templateMenu.html',
    })
    .when('/play', {
      templateUrl: '/js/templates/templateGame.html',
      controller : 'gamePlayController',
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
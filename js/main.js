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

        setDefault:  function(){
          var player = {
            name: 'Dank Memes',
            deck: []
          }
          $scope.pd.pd.push(player);
        },

        alterDeck: function(method, player, data){
          var arr = $scope.pd.pd[player].deck;
          var altered = false;
          switch(method.toLowerCase()){
            case 'add':
                if(arr.length < max){
                  if(data.title != undefined){
                    arr.push(data);
                    altered = true;
                  }else{
                    console.log("Data type isn\'t a card.");
                  }
                }else{
                  console.log("Deck has reached max capacity.");
                }
              break;
            case 'delete':
                if(data.title != undefined){
                  var index = arr.indexOf(data);
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
            $scope.pd.pd[player].deck = arr;
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

app.controller('databaseController', function($scope, $routeParams, $http, RepetetiveTable) {
  $scope.name = "databaseController";
  $scope.params = $routeParams;

  $scope.Booking = function(){
    var booking_flight_num = document.getElementById('booking_flight_num');
    var booking_flight_date = document.getElementById('booking_flight_date');
    var booking_class_id = document.getElementById('booking_class_id');
    var booking_card_name = document.getElementById('booking_card_name');
    var booking_card_issue = document.getElementById('booking_card_issue');
    var booking_passengers = document.getElementById('booking_passengers');
    var request = $http({
          method: 'POST',
          url: '/files/register.passengers.php',
          data: { 
            submit: true,
            booking_flight_num: booking_flight_num.value,
            booking_flight_date: booking_flight_date.value,
            booking_class_id: booking_class_id.value,
            booking_card_name: booking_card_name.value,
            booking_card_issue: booking_card_issue.value,
            booking_passengers: booking_passengers.value
          }
        });
  };

  $scope.getAll = function(type){
    switch(type){
      case 'flightSchedule':
          var id = document.getElementById('sc_id');
          var loc = document.getElementById('sc_oa');
          var request = $http({
            method: 'POST',
            url: '/files/get.all.php',
            data: { submit: true, type: type, aircraft_id: id.value, port_loc: loc.value }
          }).success(function(response){
            RepetetiveTable(type, response);
          });
        break;
      default:
        var request = $http({
          method: 'POST',
          url: '/files/get.all.php',
          data: { submit: true, type: type }
        }).success(function(response){
          RepetetiveTable(type, response);
        });
        break; 
    }

  };

  $scope.crudAircraft = function(type){
    switch(type){
      case 'create':
          var ac_id = document.getElementById('ac_id');
          var ac_type = document.getElementById('ac_type');
          var ac_name = document.getElementById('ac_name');
          var ac_max = document.getElementById('ac_max_seats');
          var ac_row = document.getElementById('ac_seats_row');
          var request = $http({
            method: 'POST',
            url: '/files/crud.aircraft.php',
            data: { submit: true, crud_type: type, ac_id: ac_id.value, ac_type: ac_type.value, ac_name: ac_name.value, ac_max_seats: ac_max.value, ac_seats_row: ac_row.value }
          });
        break;
      case 'update':
          var ac_id = document.getElementById('ac_id');
          var ac_type = document.getElementById('ac_type');
          var ac_name = document.getElementById('ac_name');
          var request = $http({
            method: 'POST',
            url: '/files/crud.aircraft.php',
            data: { submit: true, crud_type: type, ac_id: ac_id.value, ac_type: ac_type.value, ac_name: ac_name.value }
          });
        break;
      case 'delete':
          var ac_id = document.getElementById('ac_id');
          var request = $http({
            method: 'POST',
            url: '/files/crud.aircraft.php',
            data: { submit: true, crud_type: type, ac_id: ac_id.value }
          });
        break;
      default:
        return false
        break; 
    }
  };

  $scope.crudPriceCategories = function(type){
    switch(type){
      case 'create':
          console.log("hello world");
          var ct_name = document.getElementById('ct_name');
          var ct_from = document.getElementById('ct_from');
          var ct_to = document.getElementById('ct_to');
          var ct_price = document.getElementById('ct_price');
          var ct_refund = document.getElementById('ct_refund');
          var ct_restrict = document.getElementById('ct_restrict');
          var ct_class_id = document.getElementById('ct_class_id');
          var request = $http({
            method: 'POST',
            url: '/files/crud.categories.php',
            data: { submit: true, crud_type: type, ct_name: ct_name.value, ct_from: ct_from.value, ct_to: ct_to.value, ct_price: ct_price.value, ct_refund: ct_refund.value, ct_restrict: ct_restrict.value, ct_class_id: ct_class_id.value }
          });
        break;
      case 'update':
          var ct_old_name = document.getElementById('ct_old_name');
          var ct_name = document.getElementById('ct_name');
          var ct_from = document.getElementById('ct_from');
          var ct_to = document.getElementById('ct_to');
          var ct_price = document.getElementById('ct_price');
          var ct_refund = document.getElementById('ct_refund');
          var ct_restrict = document.getElementById('ct_restrict');
          var ct_class_id = document.getElementById('ct_class_id');
          if(ct_price.value === ''){
            ct_price.value = 0;
          }
          if(ct_restrict.value === ''){
            ct_restrict.value = 0;
          }
          var request = $http({
            method: 'POST',
            url: '/files/crud.categories.php',
            data: { submit: true, crud_type: type,
             ct_old_name: ct_old_name.value, ct_name: ct_name.value,
              ct_from: ct_from.value, ct_to: ct_to.value,
               ct_price: ct_price.value, ct_refund: ct_refund.value,
                ct_restrict: ct_restrict.value,
                 ct_class_id: ct_class_id.value }
          });
        break;
      case 'delete':
          var ct_name = document.getElementById('ct_name');
          var request = $http({
            method: 'POST',
            url: '/files/crud.categories.php',
            data: { submit: true, crud_type: type, ct_name: ct_name.value }
          });
        break;
      default:
        return false
        break; 
    }
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
    .when('/db', {
      templateUrl : '/js/templates/templateDB.php',
      controller : 'databaseController',
    })
    .otherwise({
      redirectTo: '/main'
    })
});
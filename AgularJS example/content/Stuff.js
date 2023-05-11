// Define the AngularJS module
var app = angular.module('myApp', ['ngRoute']);



app.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'MyController',
    })
    .when('/view1', {
      templateUrl: 'views/view1.html',
      controller: 'MyController'
    })
    .when('/view2', {
      templateUrl: 'views/view2.html',
      controller: 'MyController'
    })
    .otherwise({
      redirectTo: '/home'
    })
}]);


app.controller('sideController', function ($scope, $window, $http, $interval) {

  $http.get('content/data.json').then(function (response) {

    $scope.currentTime = new Date(response.data.date).toTimeString();
    $scope.currentDate = new Date(response.data.date).toDateString();
  })


 

  $interval(function () {
    var now = new Date();
    $scope.time = now.toTimeString();

    if ($scope.time === $scope.currentTime) {

      alert("Party Time!!!!!!!!!!\n" + $scope.currentTime);

    }
  }, 1000);

  var now = new Date();

  $scope.date = now.toDateString();

  $interval(function () {
    if ($scope.date === $scope.currentDate) {

      alert("Party Day!!!!!!!!!!\n" + $scope.currentDate);

    }
  }, 300000);

});

app.controller('MyController', function ($scope, $window, $http, $interval) {

  $scope.showAlert = function (message) {
    $window.alert(message);
  };


  $scope.showPopup = function () {
    alert("This is the pop up message");
  };


  var collectionDate = '2001-01-03';
  $scope.newDate = new Date(collectionDate);


  $http.get('content/data.json').then(function (examplData) {
    $scope.eventData = examplData.data;
  })

  $scope.targetDate = '2023-05-10T12:00:00Z';

  // Load the date and time from the JSON file every 5 seconds
  $interval(function () {
    $http.get('content/data.json').then(function (response) {
      $scope.currentDate = new Date(response.data.date);

      $scope.checkTime = function () {
        if ($scope.currentDate && $scope.currentDate.getTime() === new Date($scope.targetDate).getTime()) {
          alert("Party Time!!!!!!!!!!\n" + $scope.currentDate);
        } else {
          alert("It's not time \n" + $scope.currentDate + " " + $scope.targetDate)
        }

      };


    });
  }, 5000);



});
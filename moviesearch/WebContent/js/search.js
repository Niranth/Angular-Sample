/**
 * 
 */

'use strict';

var module = angular.module("myApp", [ 'ngRoute' ]);

module.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/', {
		templateUrl : 'pages/home.html',
		controller : 'mainController'
	})

	// route for the MovieController  page
	.when('/moviesbyname', {
		templateUrl : 'pages/moviesbyname.html',
		controller : 'MovieController'
	})

	// route for the contact page
	.when('/contact', {
		templateUrl : 'pages/contact.html',
		controller : 'contactController'
	})
	
	//otherwise
	.otherwise({
		redirectTo : '/'
	});
	;
});

// create the controller and inject Angular's $scope
module.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
});

//create the controller and inject Angular's $scope
module.controller('contactController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
});

module.controller('MovieController', function($scope, $http) {
	$scope.$watch('search', function() {
		fetch();
	});

	$scope.search = "sherlock";

	function fetch() {
		$http.get(
				"http://www.omdbapi.com/?t=" + $scope.search
						+ "&tomatoes=true&plot=full").then(function(response) {
			$scope.details = response.data;
		});

		$http.get("http://www.omdbapi.com/?s=" + $scope.search).then(
				function(response) {
					$scope.related = response.data;
				});
	}

	$scope.update = function(movie) {
		$scope.search = movie.Title;
	};

	$scope.select = function() {
		this.setSelectionRange(0, this.value.length);
	}
});

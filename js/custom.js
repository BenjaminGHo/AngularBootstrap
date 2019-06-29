var app = angular.module('myApp', []);

/* testing for first controller
app.controller('customersCtrl', function($scope, $http) {
	$http.get("https://www.w3schools.com/angular/customers.php")
	.then(function (response) {
		$scope.names = response.data.records;
	});
});
*/

app.controller('nflCtrl', function($scope, $http) {

	$http.get("http://www.nfl.com/liveupdate/scorestrip/ss.json")
	.then(function (response) {
		var games = response.data.gms;
		var jsonList = [];

		angular.forEach(games, function(value, key) {
			
			// parent game
			var individualGame = value;

			// retrieve game information
			var homeTeamName =  individualGame.hnn;
			var visitTeamName = individualGame.vnn;
			var gameTime =  individualGame.t;
			var eid = individualGame.eid;
			
			// assemble game information
			var gamePush = {homeTeamName: homeTeamName, visitTeamName: visitTeamName, gameTime: gameTime, eid: eid};

			// push the results to a list
			jsonList.push(gamePush);
						
		});
	
		$scope.games = jsonList;
	})
	.catch(function(data) {
	});


	$scope.getScoreByEID = function(eid) {
		$http.get("http://www.nfl.com/liveupdate/game-center/" + eid + "/" + eid + "_gtd.json")
		.then(function (response) {

			var gameData = response.data[eid];

			$.each($scope.games, function(i,v)
			{
				if ($scope.games[i]["eid"] == eid) {
					var homeScoreT = gameData["home"]["score"].T;
					var awayScoreT = gameData["away"]["score"].T; 					
					$scope.games[i]["finalScore"] = homeScoreT + " - " + awayScoreT;
				}
			})
		})
		.catch(function(data) {
			$scope.games[0]["finalScore"] = 'Information not available'
		});

	};

});

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

	$http.get("http://www.nfl.com/liveupdate/scorestrip/ss.xml")
	.then(function (response) {
		
		var jsonList = [];
		var game, xmlDoc;
		
		xmlDoc = $.parseXML(response.data);
		$stringToXMLObject = $(xmlDoc);
		$stringToXMLObject.find("ss").find("gms").find("g").each(function()
		{
			var homeTeamName =  $(this).attr("hnn");
			var visitTeamName =  $(this).attr("vnn");
			var gameTime =  $(this).attr("t");
			var eid = $(this).attr("eid");
			
			game = {homeTeamName: homeTeamName, visitTeamName: visitTeamName, gameTime: gameTime, eid: eid};
			jsonList.push(game);
		})

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

	};

});

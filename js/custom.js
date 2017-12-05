var app = angular.module('myApp', []);

app.controller('customersCtrl', function($scope, $http) {
	$http.get("https://www.w3schools.com/angular/customers.php")
	.then(function (response) {
		$scope.names = response.data.records;
	});
});

app.controller('nflCtrl', function($scope, $http) {
	$http.get("http://www.nfl.com/liveupdate/scorestrip/ss.xml")
	.then(function (response) {
		xmlDoc  = $.parseXML(response.data);
		$stringToXMLObject = $(xmlDoc);
		
		var jsonList = [];
		var team;
		
		$stringToXMLObject.find("ss").find("gms").find("g").each(function()
		{
			team = {homeTeamName: $(this).attr("hnn"), visitTeamName: $(this).attr("vnn")};
			jsonList.push(team);
		})

		$scope.teams = jsonList;
	})
	.catch(function(data) {
	});
});

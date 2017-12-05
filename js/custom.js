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
		var team, xmlDoc;
		
		xmlDoc = $.parseXML(response.data);
		$stringToXMLObject = $(xmlDoc);
		$stringToXMLObject.find("ss").find("gms").find("g").each(function()
		{
			team = {homeTeamName: $(this).attr("hnn"), visitTeamName: $(this).attr("vnn"), eid: $(this).attr("eid")};
			jsonList.push(team);
		})

		$scope.teams = jsonList;
	})
	.catch(function(data) {
	});
});

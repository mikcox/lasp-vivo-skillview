'use strict';
skillsModule.controller('modalCtrl', [
	'$scope',
	'$modal',
	function ($scope, $modal, $modalInstance, data) {
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
		
		$scope.open = function () {
			var modalInstance = $modal.open({
				templateUrl: 'views/about.php',
				controller: 'aboutModalCtrl',
			});		    
		};
	}
]);

skillsModule.controller('aboutModalCtrl', [
	'$scope',
	'$modalInstance',
	function ($scope, $modalInstance, data) {
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}
]);
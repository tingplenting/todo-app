(function () {

	'use strict';

	angular
		.module('todoApp')
		.controller('CategoriesCtrl',CategoriesCtrl);

	CategoriesCtrl.$inject = [
			'$scope',
			'$ionicPlatform',
			'$cordovaSQLite'
		];

	function CategoriesCtrl (scope,ionicPlatform,cordovaSQLite) {

		scope.categories = [];

		ionicPlatform.ready(function() {

			var query = "SELECT * FROM tb_categories";
			cordovaSQLite.execute(db, query, []).then(function(res) {
				if (res.rows.length > 0) {
					for (var i = 0; i < res.rows.length; i++) {
						console.log("CATEGORY NAME => "+res.rows.item(i).name);
						scope.categories.push({
							id: res.rows.item(i).id,
							name: res.rows.item(i).name
						});
					}
				}
			}, function (err) {
				console.error(err);
			});

		});

	}

})();

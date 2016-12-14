(function() {

	'use strict';

	angular
		.module('todoApp')
		.controller('ListsCtrl',ListsCtrl);

	ListsCtrl.$inject = [
			'$scope',
			'$ionicPlatform',
			'$ionicPopup',
			'$cordovaSQLite',
			'$stateParams'
		];

	function ListsCtrl (scope,ionicPlatform,ionicPopup,cordovaSQLite,stateParams) {

		var categoryId = stateParams.categoryId;
		scope.categoryId = categoryId;
		scope.lists = [];

		ionicPlatform.ready(function() {

			var qttl = "SELECT name FROM tb_categories WHERE id = ?";
			cordovaSQLite.execute(db,qttl,[categoryId])
			.then(function(res) {
				if (res.rows.length > 0) {
					for (var i = 0; i < res.rows.length; i++) {
						scope.categoryTitle = res.rows.item(i).name;
						console.log(res.rows.item(i).name);
					}
				}
			}, function(err) {
				console.error(err);
			});

			var query = "SELECT * FROM tb_lists WHERE cid = ?";

			cordovaSQLite.execute(db,query,[categoryId])
			.then(function(res) {
				if (res.rows.length > 0) {
					for (var i = 0; i < res.rows.length; i++) {
						scope.lists.push({
							id: res.rows.item(i).id,
							cid: res.rows.item(i).cid,
							name: res.rows.item(i).name
						});
					}
				}
			}, function(err) {
				console.error(err);
			});

		});

		scope.insert = function() {
			ionicPopup.prompt({
				title: 'Enter a new To Do list',
				inputType: 'text'
			})
			.then(function(result) {
				if (result !== undefined) {
					var query = "INSERT INTO tb_lists (cid, name) VALUES (?,?)";

					cordovaSQLite.execute(
						db,
						query,
						[categoryId,result])
					.then(function(res) {
						scope.lists.push({
							cid: categoryId,
							name: result
						});
					}, function(err) {
						console.error(err);
					});
				} else {
					console.log("Action not completed");
				}
			});
		}

		scope.delete = function(item) {
			var outerquery = "DELETE FROM tb_items WHERE lid = ?";
			var innerquery = "DELETE FROM tb_lists WHERE id = ?";

			cordovaSQLite.execute(db, outerquery, [item.id])
			.then(function(res) {
				cordovaSQLite.execute(db, innerquery, [item.id])
				.then(function(res) {
					scope.lists.splice(scope.lists.indexOf(item), 1);
				});
			}, function(err) {
				console.error(err);
			});
		}

	}

})();

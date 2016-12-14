(function() {

	'use strict';

	angular
		.module('todoApp')
		.controller('ItemsCtrl',ItemsCtrl);

	ItemsCtrl.$inject = [
			'$scope',
			'$ionicPlatform',
			'$ionicPopup',
			'$cordovaSQLite',
			'$stateParams'
		];

	function ItemsCtrl (scope,ionicPlatform,ionicPopup,cordovaSQLite,stateParams) {

		var categoryId = stateParams.categoryId;
		var listId = stateParams.listId;

		scope.items = [];

		ionicPlatform.ready(function() {

			var qttl = "SELECT name FROM tb_lists WHERE id = ? AND cid = ? LIMIT 1";
			cordovaSQLite.execute(db,qttl,[listId,categoryId])
			.then(function(res) {
				if (res.rows.length > 0) {
					for (var i = 0; i < res.rows.length; i++) {
						scope.listTitle = res.rows.item(i).name;
						console.log(res.rows.item(i).name);
					}
				}
			}, function(err) {
				console.error(err);
			});

			var query = "SELECT * FROM tb_items WHERE cid = ? AND lid = ?";

			cordovaSQLite.execute(db,query,[categoryId,listId])
			.then(function(res) {
				if (res.rows.length > 0) {
					for(var i = 0; i < res.rows.length; i++) {
						scope.items.push({
							id: res.rows.item(i).id,
							cid: res.rows.item(i).cid,
							lid: res.rows.item(i).lid,
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
				title: 'Enter a new TODO item',
				inputType: 'text'
			})
			.then(function(result) {
				if(result !== undefined) {
					var query = "INSERT INTO tb_items (cid, lid, name) VALUES (?,?,?)";
					cordovaSQLite.execute(
						db,
						query,
						[categoryId, listId, result])
					.then(function(res) {
						scope.items.push({
							id: res.insertId,
							cid: categoryId,
							lid: listId,
							name: result
						});
					}, function (err) {
						console.error(err);
					});
				} else {
					console.log("Action not completed");
				}
			});
		}

		scope.delete = function(item) {
			var query = "DELETE FROM tb_items WHERE id = ?";
			cordovaSQLite.execute(db, query, [item.id])
			.then(function(res) {
				scope.items.splice(scope.items.indexOf(item), 1);
			}, function (err) {
				console.error(err);
			});
		}

	}

})();

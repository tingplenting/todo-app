(function () {

	'use strict';

	angular
		.module('todoApp')
		.controller('ConfigCtrl',ConfigCtrl);

	ConfigCtrl.$inject = [
			'$scope',
			'$ionicPlatform',
			'$ionicLoading',
			'$state',
			'$ionicHistory',
			'$cordovaSQLite'
		];

	function ConfigCtrl (scope,ionicPlatform,ionicLoading,state,ionicHistory,cordovaSQLite) {

		ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true
		});

		ionicPlatform.ready(function() {
			ionicLoading.show({ template: 'Loading...' });
			if(window.cordova) {
				window.plugins.sqlDB.copy("populated.db", 0, function() {
					db = cordovaSQLite.openDB({
							name:"populated.db",
							location:'default'
						});
					state.go("categories");
					ionicLoading.hide();
				}, function(error) {
					console.error("Error copy DB: " + error);
					db = cordovaSQLite.openDB({
							name:"populated.db",
							location:'default'
						});
					state.go("categories");
					ionicLoading.hide();
				});
			} else {
				db = openDatabase("websql.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
					db.transaction(function (tx) {
					tx.executeSql("DROP TABLE IF EXISTS tb_categories");
					tx.executeSql("CREATE TABLE IF NOT EXISTS tb_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
					tx.executeSql("CREATE TABLE IF NOT EXISTS tb_lists (id INTEGER PRIMARY KEY AUTOINCREMENT, cid INT, name TEXT)");
					tx.executeSql("CREATE TABLE IF NOT EXISTS tb_items (id INTEGER PRIMARY KEY AUTOINCREMENT, cid INT, lid INT, name TEXT)");
					tx.executeSql("INSERT INTO tb_categories (name) VALUES (?)", ["Shopping"]);
					tx.executeSql("INSERT INTO tb_categories (name) VALUES (?)", ["Works"]);
					tx.executeSql("INSERT INTO tb_categories (name) VALUES (?)", ["School"]);
				});
				state.go("categories");
				ionicLoading.hide();
			}
		});

	}

})();

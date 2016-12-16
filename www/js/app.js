(function(_vg) {

	'use strict';

	_vg.db = null;

	angular
		.module('todoApp',['ionic','ngCordova','ui.calendar'])
		.run(appRun)
		.config(appConfig);

	appRun.$inject = ['$ionicPlatform'];

	function appRun (ionicPlatform) {
		ionicPlatform.ready(function() {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	}

	appConfig.$inject = [
				'$stateProvider',
				'$urlRouterProvider',
				'$ionicConfigProvider'
			];

	function appConfig (stateProvider,urlRouterProvider,ionicConfigProvider) {
		stateProvider
			.state('config', {
				url: '/config',
				templateUrl: 'templates/config.html',
				controller: 'ConfigCtrl'
			})
			.state('categories', {
				url: '/categories',
				templateUrl: 'templates/categories.html',
				controller: 'CategoriesCtrl'
			})
			.state('lists', {
				url: '/lists/:categoryId',
				templateUrl: 'templates/lists.html',
				controller: 'ListsCtrl'
			})
			.state('items', {
				url: "/items/:categoryId/:listId",
				templateUrl: "templates/items.html",
				controller: "ItemsCtrl"
			})
			.state('calendar', {
				url: "/calendar",
				templateUrl: "templates/calendar.html",
				controller: "CalendarCtrl"
			});

		urlRouterProvider.otherwise('/config');
		ionicConfigProvider.backButton.previousTitleText(false).text('');
	}

})(this);

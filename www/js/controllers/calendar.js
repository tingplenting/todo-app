angular
	.module('todoApp')
	.directive('disableTap', disableTap)
	.controller('CalendarCtrl',CalendarCtrl);

CalendarCtrl.$inject = ['$scope'];

function CalendarCtrl($scope) {
	$scope.eventSource = [];
	$scope.onSelect = function(start, end) {
		console.log("Event select fired");
	};
	$scope.eventClick = function(event, allDay, jsEvent, view) {
		alert("Event clicked");
	};
	$scope.uiConfig = {
		defaultView: 'agendaDay',
		disableDragging: true,
		allDaySlot: false,
		selectable: true,
		unselectAuto: true,
		selectHelper: true,
		editable: false,
		maxTime: "21:00:00",
		minTime: "8:00:00",
		eventDurationEditable: false, // disabling will show resize
		columnFormat: {
			week: 'dd-MM-yyyy',
			day: 'D-MMM-YYYY'
		},
		height: 1550,
		maxTime: "21:00:00",
		minTime: "8:00:00",
		eventDurationEditable: false, // disabling will show resize
		columnFormat: {
			week: 'dd-MM-yyyy',
			day: 'D-MMM-YYYY'
		},
		titleFormat: {
			day: 'dd-MM-yyyy'
		},
		axisFormat: 'H:mm',
		weekends: true,
		header: {
			left: 'prev',
			center: '',
			right: 'next'
		},
		select: $scope.onSelect,
		eventClick: $scope.eventClick,
		events: [{
			"id": "8",
			"title": "Adam Scott",
			"start": "2014-08-20 10:30:00",
			"end": "2014-08-20 12:00:00",
			"allDay": false,
			"color": "#734187"
		}]
	};

}

disableTap.$inject = ['$timeout'];

function disableTap($timeout) {
	return {
		link: function() {
			$timeout(function() {
				var tab = document.getElementsByClassName('fc-widget-content');
				for (i = 0; i < tab.length; ++i) {
					tab[i].setAttribute('data-tap-disabled', 'true')
					console.log(tab[i]);
				}
			},500);
		}
	};
}














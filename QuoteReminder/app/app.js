﻿var QuoteApp = angular.module("QuoteApp", ["ngRoute", "ngResource"]).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', { controller: ListCtrl, templateUrl: 'app/templates/list.html' }).
            when('/new', { controller: CreateCtrl, templateUrl: 'app/templates/new.html' }).
            when('/edit/:itemId', { controller: EditCtrl, templateUrl: 'app/templates/new.html' }).
            otherwise({ redirectTo: '/' });
    });

QuoteApp.factory('Quote', function ($resource) {
    return $resource('/api/quote/:id', { id: '@id' }, { update: { method: 'PUT'} });
});

var ListCtrl = function ($scope, $location, Quote) {
    $scope.reset = function () {
        $scope.items = Quote.query({ q: $scope.query });
    };

    $scope.reset();

    $scope.delete = function () {
        var itemId = this.item.QuoteId;
        Quote.delete({ id: itemId }, function () {
            $("#item_" + itemId).fadeOut();
    });
};
};

var CreateCtrl = function ($scope, $location, Quote) {
        $scope.save = function () {
        Quote.save($scope.item, function () {
            $location.path('/');
        });
    };
};

var EditCtrl = function ($scope, $routeParams, $location, Quote) {
    $scope.item = Quote.get({ id: $routeParams.itemId });

    $scope.save = function () {
        Quote.update({ id: $scope.item.QuoteId }, $scope.item, function () {
            $location.path('/');
        });
    };
};
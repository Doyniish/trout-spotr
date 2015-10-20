(function() {
  'use strict';

  angular
    .module('troutSpotr')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/ui/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $urlRouterProvider.otherwise('/');
  }

})();

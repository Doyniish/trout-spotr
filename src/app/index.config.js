(function() {
  'use strict';

  angular
    .module('troutSpotr')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();

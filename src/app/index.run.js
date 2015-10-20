(function() {
  'use strict';

  angular
    .module('troutSpotr')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

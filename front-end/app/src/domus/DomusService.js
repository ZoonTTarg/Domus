(function(){
  'use strict';

  angular.module('domus')
         .service('domusService', ['$http', DomusService]);

  /**
   * Users DataService
   * remote data service call.
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function DomusService($http){
    var pieces = [];
    var appareils = [];


    // Promise-based API
    return {
      loadAllPieces : function() {
        return $http.get('http://192.168.0.51:3000/pieces');
      },
      loadAllAppareils : function() {
        return $http.get('http://192.168.0.51:3000/appareils');
      }
    }
  }

})();

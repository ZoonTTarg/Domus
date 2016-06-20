(function(){

  angular
       .module('domus')
       .controller('DomusController', [
          'domusService', '$mdSidenav', '$timeout', '$log',
          DomusController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function DomusController( domusService, $mdSidenav, $timeout, $log ) {
    var self = this;

    self.selectedPiece     = null;
    self.pieces       = [ ];
    self.selectPiece   = selectPiece;
    self.toggleList   = togglePiecesList;
    self.onSwipeLeft = onSwipeLeft;
    self.onSwipeRight = onSwipeRight;

    // Load all registered pieces
    domusService
          .loadAllPieces()
          .then( function( res ) {
            self.pieces    = res.data;
            console.log(res.data);
            self.selectedPiece = res.data[0];
          });

    domusService
          .loadAllAppareils()
          .then( function( res ) {
            self.appareils    = res.data;
            console.log(res.data);
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function togglePiecesList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectPiece ( piece ) {
      self.selectedPiece = angular.isNumber(piece) ? $scope.pieces[piece] : piece;
    }

    function onSwipeLeft(ev) {
      alert('You swiped left!!');
    };
    function onSwipeRight(ev) {
      alert('You swiped right!!');
    };
    
  }  
})();

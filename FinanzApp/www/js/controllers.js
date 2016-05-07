angular.module('starter.controllers', [])

.controller('KontenVerwaltenCtrl', function($scope,FinanzService) {
  $scope.kontenliste = FinanzService.getAll();
  $scope.remove = function(konto) {
    FinanzService.remove(konto);
  };
})

.controller('KontoDetailCtrl', function($scope, $stateParams,FinanzService) {
  $scope.konto = FinanzService.get($stateParams.kontoId);

})

.controller('UmsatzController', function($scope, $stateParams,FinanzService) {
  $scope.kontenliste = FinanzService.getAll();
  konto = FinanzService.get($stateParams.kontoId);
  //wenn es das konto nicht gibt wird das gesamtkono bestimmt
  if(konto==null){
    
    kontoTemp = FinanzService.getGesamtkonto();
    kontoTemp=FinanzService.berechneGesamtbetragOTF(kontoTemp);
    
    //console.log("asdsad  "+kontoTemp.gesamtbetragOTF);
    
    $scope.konto=kontoTemp;
    
  }else{
    
    $scope.konto=FinanzService.berechneGesamtbetragOTF(konto);
  }
  

})


.controller('UmsatzDetailController', function($scope, $stateParams,FinanzService) {
  umsatzlist = FinanzService.getUmsatzList($stateParams.kontoId,$stateParams.kontoKat);
  umsatzlist = FinanzService.convertDates2Read(umsatzlist);
  $scope.umsatzlist = umsatzlist;
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

/*
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

*/;

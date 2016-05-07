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
  //konto zur verfügung stellen
  konto = FinanzService.get($stateParams.kontoId);
  //kategorie zum anzeigen
  $scope.kategorie=$stateParams.kontoKat;
  //wen gesamt ist
  if(konto==null){
    //gesamt konto generierne lassen
    kontoTemp = FinanzService.getGesamtkonto();
    //kont an das scop hängen 
    $scope.konto=kontoTemp;
    
    //Umsatzliste erstellen
    umsatzlist = kontoTemp.umsatzList;
    cpUmsatzliste= angular.copy(umsatzlist);//damit die daten nur temporaer geändert werden
    cpUmsatzliste=FinanzService.cleanNachKat(cpUmsatzliste,$stateParams.kontoKat);//die nicht die passende Kat haben weg hauen
    cpUmsatzliste=FinanzService.sortbyDate(cpUmsatzliste);//sort
    cpUmsatzliste = FinanzService.convertDates2Read(cpUmsatzliste);//Lesbares Datumsformat
    $scope.umsatzlist = cpUmsatzliste;
    
  }else{//wenn ja konto da ist
    $scope.konto=konto;
    
    //Umsatzliste erstellen
    umsatzlist = FinanzService.getUmsatzList($stateParams.kontoId,$stateParams.kontoKat);
    cpUmsatzliste= angular.copy(umsatzlist);//damit die daten nur temporaer geändert werden
    cpUmsatzliste=FinanzService.cleanNachKat(cpUmsatzliste,$stateParams.kontoKat);//die nicht die passende Kat haben weg hauen
    cpUmsatzliste=FinanzService.sortbyDate(cpUmsatzliste);//sort
    cpUmsatzliste = FinanzService.convertDates2Read(cpUmsatzliste);//Lesbares Datumsformat
    $scope.umsatzlist = cpUmsatzliste;
  }
  
  
  
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

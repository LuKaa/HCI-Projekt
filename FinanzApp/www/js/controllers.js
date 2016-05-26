angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('KontenVerwaltenCtrl', function($scope,FinanzService) {
  $scope.kontenliste = FinanzService.getAll();
  $scope.remove = function(konto) {
    FinanzService.remove(konto);
  };
})

.controller('KontoDetailCtrl', function($scope, $stateParams,FinanzService) {
  $scope.konto = FinanzService.get($stateParams.kontoId);

})

.controller('KontoHinzufuegenCtrl', function($scope, $location, FinanzService) {
  $scope.save = function(konto) {
    FinanzService.save(konto);
    $location.path("/app/kontenVerwalten"); 
  }
})

.controller('KontakteCtrl', function($stateParams,$scope,FinanzService,$ionicPopup) {
   
  $scope.kontakte = FinanzService.getAllKontakte();
  $scope.removeKontakt = function(kontakt) {
    FinanzService.removeKontakt(kontakt);
  };
    
    $scope.SMS = function(kontakte){
        var auswahlcounter=[];
        for( i=0; i<kontakte.length;i++){
            
            var x=0;
            for(var prop in kontakte[i]){
            x++;
            }
            if(x>=6){
                auswahlcounter.push(i);
            }
        }
        console.log(auswahlcounter);
        payment_each=$stateParams.betrag/(auswahlcounter.length+1);
        for ( a=0;a<auswahlcounter.length;a++){
        console.log(kontakte[auswahlcounter[a].toFixed]);
            $scope.showPopup(kontakte[auswahlcounter[a]],payment_each)
        }}

    
    $scope.showPopup = function(kontakt,payment) {
    $scope.data = {}
    
      // Custom popup

            var myPopup = $ionicPopup.show({
            title: payment+' &euro;',
            subTitle: kontakt.vn+' du schuldest mir den oben gennanten Betrag!!',
            buttons: [
                { text: '<b>DONE</b>',type: 'button-positive' }
            ]
            })
}

})


.controller('KontaktDetailCtrl', function($scope, $stateParams, FinanzService) {
   $scope.kontakt = FinanzService.getKontakt($stateParams.kontaktId);
})

.controller('KontaktHinzufuegenCtrl', function($scope, $location, FinanzService) {
  $scope.saveKontakt = function(kontakt) {
    FinanzService.saveKontakt(kontakt);
    $location.path("/app/kontakte"); 
  }
})

.controller('BenachrichtigungenCtrl', function($scope, $location, FinanzService) {
  
  //bereits gespeicherte Wochentage werden übergeben (true oder false)
  $scope.montag = FinanzService.getMontag();
  $scope.dienstag = FinanzService.getDienstag();
  $scope.mittwoch = FinanzService.getMittwoch();
  $scope.donnerstag = FinanzService.getDonnerstag();
  $scope.freitag = FinanzService.getFreitag();
  $scope.samstag = FinanzService.getSamstag();
  $scope.sonntag = FinanzService.getSonntag();
  
  //gespeicherte Uhrzeit wird ausgelesen
  $scope.time = FinanzService.getUhrzeit();
  
  //Uhrzeit wird gespeichert
  $scope.saveUhrzeit = function(time) {
    FinanzService.saveUhrzeit(time);
  }
  
  //Wochentage werden gespeichert
  $scope.saveTage = function(item) {
    FinanzService.saveBenachrichtigungen(item);
     $location.path("/app/einstellungen"); 
  }
})

.controller('PasswortCtrl', function($scope, $location, $ionicPopup, FinanzService) {

  $scope.checkPw = function(konto) {   
    if(FinanzService.checkPw(konto)==1)
    {
      FinanzService.savePw(konto);
      var alertPopup = $ionicPopup.alert({
        title: 'Passwort wurde geändert',
        template: 'Passwort wurde erfolgreich geändert'
      });
      $location.path("/app/einstellungen"); 
    }
    else if(FinanzService.checkPw(konto)==2)
    {
      var alertPopup = $ionicPopup.alert({
        title: 'Altes Passwort falsch',
        template: 'Altes Passwort ist falsch. Bitte geben sie es erneut ein.'
      });
    }
    else
    {
      var alertPopup = $ionicPopup.alert({
        title: 'Passwort falsch',
        template: 'Passwörter stimmen nicht überein. Bitte geben sie es erneut ein.'
      });
    }
    
    $scope.pw = FinanzService.getPw();
  }
})

.controller('UmsatzController', function($scope, $stateParams,FinanzService,$ionicHistory) {
  $ionicHistory.removeBackView();
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

.controller('UmsatzDetailController', function($scope, $stateParams,FinanzService,$rootScope,$ionicHistory) {
  $ionicHistory.removeBackView();
  
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
    cpUmsatzliste=FinanzService.machValidDateFormat(cpUmsatzliste);//zeige DatumFormat mit 2 Kommerstellen an.
    cpUmsatzliste=FinanzService.sortbyDate(cpUmsatzliste);//sort
    cpUmsatzliste=FinanzService.makeMonthRev(cpUmsatzliste);
    cpUmsatzliste = FinanzService.convertDates2Read(cpUmsatzliste);//Lesbares Datumsformat
    $scope.umsatzlist = cpUmsatzliste;
    
  }else{//wenn ja konto da ist
    $scope.konto=konto;
    
    //Umsatzliste erstellen
    umsatzlist = FinanzService.getUmsatzList($stateParams.kontoId);
    cpUmsatzliste= angular.copy(umsatzlist);//damit die daten nur temporaer geändert werden
    cpUmsatzliste=FinanzService.cleanNachKat(cpUmsatzliste,$stateParams.kontoKat);//die nicht die passende Kat haben weg hauen
    cpUmsatzliste=FinanzService.machValidDateFormat(cpUmsatzliste);//zeige DatumFormat mit 2 Kommerstellen an.
    cpUmsatzliste=FinanzService.sortbyDate(cpUmsatzliste);//sort
    cpUmsatzliste=FinanzService.makeMonthRev(cpUmsatzliste);
    cpUmsatzliste = FinanzService.convertDates2Read(cpUmsatzliste);//Lesbares Datumsformat
    $scope.umsatzlist = cpUmsatzliste;
  }
  
  
  
})

//speichert die Kontenliste in die scope Variable um diese Liste dann auszugeben
.controller('StatisticController', function($scope,FinanzService) {
  $scope.kontenliste = FinanzService.getAll();
})

//zählt die Umsätze pro Kategorie und speichert sie in die scope Variable
//um bei Chart API keine Probleme zu bekommen, habe ich mich für das Runden der Umsätze entschieden
.controller('StatisticDetailController', function($scope, $stateParams, FinanzService) {
    konto = FinanzService.get($stateParams.kontoId);
    if(konto==null){
      var result="keine Datensätze";
      $scope.result = result;
    }else{
      umsatzlist = FinanzService.getUmsatzList($stateParams.kontoId);
      var sumM = FinanzService.umsatzNachKatM(umsatzlist);
      var sumH = FinanzService.umsatzNachKatH(umsatzlist);
      var sumK = FinanzService.umsatzNachKatK(umsatzlist);
      var sumL = FinanzService.umsatzNachKatL(umsatzlist);
      var sumF = FinanzService.umsatzNachKatF(umsatzlist);
      var sumS = FinanzService.umsatzNachKatS(umsatzlist);
      $scope.sumM = Math.round(sumM);
      $scope.sumH = Math.round(sumH);
      $scope.sumK = Math.round(sumK);
      $scope.sumL = Math.round(sumL);
      $scope.sumF = Math.round(sumF);
      $scope.sumS = Math.round(sumS);
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

.controller('BareingabeCtrl', function($scope,FinanzService,$ionicPopup,$cordovaVibration,$ionicPlatform,$location) {
    // Links zu Bildern in Kategorieansicht
    
    $scope.imgURLmobility = './img/mobility_on1.svg';
    $scope.imgURLhousehold = './img/household_on1.svg';
    $scope.imgURLclothing = './img/clothing_on1.svg';
    $scope.imgURLfood = './img/food_on1.svg';1
    $scope.imgURLfreetime = './img/freetime_on1.svg';
    $scope.imgURLsonstiges = './img/sonstiges_on1.svg';
    $scope.selected='';
    
    // Funktion die sich um das Umschalten zwischen ausgewählten und nicht ausgewählten Bildern in der Kategorie auswahl auf dem Bildschirm "Bareingabe"
    $scope.toggleImage = function(buttonid) { 
     
        $scope.imgURLmobility = './img/mobility_on1.svg';
        $scope.imgURLhousehold = './img/household_on1.svg';
        $scope.imgURLclothing = './img/clothing_on1.svg';
        $scope.imgURLfood = './img/food_on1.svg';
        $scope.imgURLfreetime = './img/freetime_on1.svg';
        $scope.imgURLsonstiges = './img/sonstiges_on1.svg';

      if(buttonid===$scope.selected){
        $scope.imgURLmobility = './img/mobility_on1.svg';
        $scope.imgURLhousehold = './img/household_on1.svg';
        $scope.imgURLclothing = './img/clothing_on1.svg';
        $scope.imgURLfood = './img/food_on1.svg';
        $scope.imgURLfreetime = './img/freetime_on1.svg';
        $scope.imgURLsonstiges = './img/sonstiges_on1.svg';
        buttonid="";
        $scope.selected='';
      }
      
     switch(buttonid){
        case 'Mobilitaet':
            if ($scope.imgURLmobility === './img/mobility_on1.svg') {
                $scope.selected="Mobilitaet";
                $scope.imgURLmobility = './img/mobility_off.svg'
                $scope.imgURLclothing = './img/clothing_on1.svg'

            } else {
                $scope.imgURLmobility = './img/mobility_on1.svg'
                $scope.selected='';
            }
             break;
        case 'Kleidung': 
            if ($scope.imgURLclothing === './img/clothing_on1.svg') {
                $scope.selected="Kleidung";
                $scope.imgURLclothing = './img/clothing_off.svg'       
            } else {
                $scope.imgURLclothing = './img/clothing_on1.svg'
                $scope.selected='';
            }
             break;
        case'Haushalt':
             if ($scope.imgURLhousehold === './img/household_on1.svg') {
                 $scope.selected="Haushalt";
                $scope.imgURLhousehold = './img/household_off.svg'       
            } else {
                $scope.imgURLhousehold = './img/household_on1.svg'
                $scope.selected='';
            }
             break;
        case'Lebensmittel':
             if ($scope.imgURLfood === './img/food_on1.svg') {
                 $scope.selected="Lebensmittel";
                $scope.imgURLfood = './img/food_off.svg'       
            } else {
                $scope.imgURLfood = './img/food_on1.svg' 
                $scope.selected='';
            }
             break;
        case'Freizeit':
             if ($scope.imgURLfreetime === './img/freetime_on1.svg') {
                 $scope.selected="Freizeit";
                $scope.imgURLfreetime = './img/freetime_off.svg'       
            } else {
                $scope.imgURLfreetime = './img/freetime_on1.svg' 
                $scope.selected='';
            }
             break;
        case'Sonstiges':
             if ($scope.imgURLsonstiges === './img/sonstiges_on1.svg') {
                 $scope.selected="Sonstiges";
                $scope.imgURLsonstiges = './img/sonstiges_off.svg'       
            } else {
                $scope.imgURLsonstiges = './img/sonstiges_on1.svg'
                $scope.selected='';
            }
             break;  
     }
  };
    
    
    // Funktion die je nach Buchungstyp einen positiven Betrag  oder einen negativen Betrag zur //Umsatzliste hinzufügt. Beschreibung wird aktuell nicht verwendet aber ebefalls gespeichert.
    $scope.addUmsatz=function(Typ,Betrag,Beschreibung){
        if(Betrag == 0 || Betrag == null){
            // $cordovaVibration.vibrate(500);
            $scope.showPopup('Empty',Betrag);
            return null;
        }
        if( Typ ==='+' && Betrag>0){
            // $cordovaVibration.vibrate(500);
            $scope.showPopup('+',Betrag);
            FinanzService.addUmsatz(Betrag,$scope.selected,Beschreibung);

        }else if(Typ ==='-' && Betrag !=0){
            if( Betrag > 0){
                Betrag=Betrag*-1;
            }
            // $cordovaVibration.vibrate(500);
            $scope.showPopup('-',Betrag);
            FinanzService.addUmsatz(Betrag,$scope.selected,Beschreibung);
        }
    }
    
    
    // Popup das über eine erfolgreiche Verbunchung des Eingegebeben Betrages informiert. Außerdem Weiterleitung zum "Umsatz teilen" screen.
    $scope.showPopup = function(Typ,Betrag) {
        $scope.data = {}
        if(Typ == 'Empty'){
             var myPopup = $ionicPopup.show({
             title:' Fehler!!',
             subTitle: 'Bitte geben SIe einen gültigen Betrag ein.',
             buttons: [ { text: '<b>Okay!!</b>',type: 'button-positive', } ]
           })
             return null;
        }
      
          if(Typ === '+'){
          var myPopup = $ionicPopup.show({
             title: Betrag+' &euro;',
             subTitle: 'Erfolgreich verbucht',
             buttons: [ { text: '<b>Okay!!</b>',type: 'button-positive', } ]
           })
          }else{
                var myPopup = $ionicPopup.show({
                title: Betrag+' &euro;',
                subTitle: 'Erfolgreich abgebucht',
                buttons: [
                    {text: '<b>Teilen</b>',type: 'button-energized',
                     onTap: function(e) 
                        {
                        $location.path("/app/teilen/"+Betrag*-1); 
                        }
                    },
                    { text: '<b>Okay!!</b>',type: 'button-positive' }
                ]
                })}
}

})


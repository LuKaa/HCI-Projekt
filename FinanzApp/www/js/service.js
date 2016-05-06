angular.module('starter.services', [])
.factory('FinanzService',function(){
  
  var treffer; //ist variable wenn eine übereinstimmung beim suchen gefunden wurde
  
  //basic liste erstellen, nur namen sind befüllt, denn alles andere wird autmatisch aus den Web geladen.
  var kontenliste= [{ 
        id:0, 
        bezeichnung: 'Cash', 
        IBAN: "" ,
        BIC:"", 
        kontoNr:"", 
        kontoPW:"", 
        bankInstitut:"GeldBoerse", 
        umsatzList:[{kategorie:"mobilitaet",beschreibung:"beschr",betrag:"45.00"}]
      },{ 
        id:1,
        bezeichnung: 'Konto1', 
        IBAN: "AT611904300234573278" ,
        BIC:"DABAIE2D", 
        kontoNr:"65135", 
        kontoPW:"23216", 
        bankInstitut:"BankAustria", 
        umsatzList:[{kategorie:"mobilitaet",beschreibung:"beschr",betrag:"45.00"}]
    }];
    
    return{
      //Ab hier Funktionen
      
      //liefert einfach die gesamte Ortliste
      getAll: function (){
        return kontenliste;
      },
      
      get: function(kontoId) {
        for (var i = 0; i < kontenliste.length; i++) {
          if (kontenliste[i].id === parseInt(kontoId)) {
            return kontenliste[i];
          }
        }
        return null;
      }
    };
});
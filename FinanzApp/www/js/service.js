angular.module('starter.services', [])
.factory('FinanzService',function(){
  
  var treffer; //ist variable wenn eine übereinstimmung beim suchen gefunden wurde
  
  //basic liste erstellen, nur namen sind befüllt, denn alles andere wird autmatisch aus den Web geladen.
  var kontenliste=
   [{ bezeichnung: 'Cash', IBAN: "" ,BIC:"", konoNr:"", konoPW:"", bankIstitut:"GeldBoerse", umsatzList:[{kategorie:"mobilitaet",beschreibung:"beschr",betrag:"45.00"}]},
    { bezeichnung: 'Konto1', IBAN: "AT611904300234573278" ,BIC:"DABAIE2D", konoNr:"65135", konoPW:"23216", bankIstitut:"BankAustria", umsatzList:[{kategorie:"mobilitaet",beschreibung:"beschr",betrag:"45.00"}]}
   ];
    
    return{
      //Ab hier Funktionen
      
      //liefert einfach die gesamte Ortliste
      getAll: function (){
        return ortList;
      },
    }
});
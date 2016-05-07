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
        gesamtbetragOTF:0,
        bezuegebetragOTF:0,
        abzuegebetragOTF:0,  
        umsatzList:[{kategorie:"mobilitaet",beschreibung:"beschr",betrag:45.01}]
      },{ 
        id:1,
        bezeichnung: 'Bankkonto', 
        IBAN: "AT611904300234573278" ,
        BIC:"DABAIE2D", 
        kontoNr:"65135", 
        kontoPW:"23216", 
        bankInstitut:"BankAustria",
        gesamtbetragOTF:0,
        bezuegebetragOTF:0,
        abzuegebetragOTF:0, 
        umsatzList:[{kategorie:"mobilitaet",beschreibung:"beschr",betrag:20.33},
                    {kategorie:"mobilitaet",beschreibung:"beschr",betrag:12.99},
                    {kategorie:"mobilitaet",beschreibung:"beschr",betrag:-8.11},
                    {kategorie:"mobilitaet",beschreibung:"beschr",betrag:4.00}]
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
      },
      //Meine Funktionen Markus
      getGesamtkonto: function (){
        kontoTemp= { 
          id:2, 
          bezeichnung: 'Gesamt', 
          IBAN: "" ,
          BIC:"", 
          kontoNr:"", 
          kontoPW:"", 
          bankInstitut:"Gesamt",
          bezuegebetragOTF:0,
          abzuegebetragOTF:0, 
          gesamtbetragOTF:0,
          umsatzList:[]
        };
        var counter =0;
        for (var i = 0; i < kontenliste.length; i++) {
          for (var j = 0; j < kontenliste[i].umsatzList.length; j++) {
            //console.log("jo " +kontenliste[i].bezeichnung + " " + kontenliste[i].umsatzList[j].betrag);
            //umsatzList=kontenliste[i].umsatzList[j];
            //console.log(umsatzList.betrag);
            kontoTemp.umsatzList[counter++]=kontenliste[i].umsatzList[j];
            //console.log(kontoTemp.umsatzList[0].betrag);
          }
        }
        
        //console.log(kontoTemp.umsatzList[0].betrag);
        return kontoTemp;
      },
      
      berechneGesamtbetragOTF: function(konto) {
        
        //console.log(" ssss"+konto.umsatzList[0].betrag+5);
        konto.gesamtbetragOTF=0;
        konto.abzuegebetragOTF=0;
        konto.bezuegebetragOTF=0;
        for (var i = 0; i < konto.umsatzList.length; i++) {
          konto.gesamtbetragOTF += konto.umsatzList[i].betrag;
          if(konto.umsatzList[i].betrag>0){
            konto.bezuegebetragOTF+=konto.umsatzList[i].betrag;
          }else{
            konto.abzuegebetragOTF+=konto.umsatzList[i].betrag;
          }
        }
        
        return konto;
      },
      
    };
});
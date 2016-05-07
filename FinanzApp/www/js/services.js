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
        umsatzList:[{posID:0, datum:"2014-02-01T23:28:56.782Z", kategorie:"Mobilitaet",beschreibung:"beschr",betrag:45.01}]
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
        umsatzList:[{posID:0, datum:"2011-01-01T23:28:56.782Z", kategorie:"Mobilitaet",beschreibung:"beschr",betrag:20.33},
                    {posID:1, datum:"2015-08-01T23:28:56.782Z", kategorie:"Mobilitaet",beschreibung:"beschr",betrag:12.99},
                    {posID:2, datum:"2014-12-01T23:28:56.782Z", kategorie:"Mobilitaet",beschreibung:"beschr",betrag:-8.11},
                    {posID:3, datum:"2010-11-01T23:28:56.782Z", kategorie:"Mobilitaet",beschreibung:"beschr",betrag:4.00}]
    }];
    
    return{
      //Ab hier Funktionen
      
      //liefert einfach die gesamte Ortliste
      getAll: function (){
        return kontenliste;
      },
      
      remove: function(konto) {
      kontenliste.splice(kontenliste.indexOf(konto), 1);
      },
      
      save: function(konto) {
        konto.id = kontenliste.length;
        konto.gesamtbetragOTF=0;
        konto.bezuegebetragOTF=0;
        konto.abzuegebetragOTF=0;
        
        kontenliste.push(konto);
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
      
      
      convertDates2Read: function(umsatzList) {
        
        for (var i = 0; i < umsatzList.length; i++) {
          umsatzList[i].datum= this.dateToString(umsatzList[i].datum);
        }
        
        return umsatzList;
      },
      
      
      dateToString: function(date) {
        str="";
        //"2015-11-01T23:28:56.782Z"
        str+=date.toString().slice(8,10)+"."; //Tag 
        str+=date.toString().slice(5,7)+"."; //Monat
        str+=date.toString().slice(2,4)+" "; //Jahr
        str+=date.toString().slice(11,16); //Stunde+Miute
        return str;
      },
      
      
      sortbyDate: function(umsatzList) {
        
        
      var length = umsatzList.length;
        for(var i = 1; i < length; ++i) {
          for(var j = 0; j < i; ++j) {
            x = new Date(umsatzList[i].datum);
            y = new Date(umsatzList[j].datum);
            if(x>y){
              temp=umsatzList[i];
              umsatzList[i]=umsatzList[j];
              umsatzList[j]=temp;
            }
          }
        }
       
       
        return umsatzList;
       
       
      },
      
      getUmsatzList: function(kontoId,kontoKat) {
               
        
        umsatzList = [];
        counter=0;
        
        //finde das Passende konto
        for (var i = 0; i < kontenliste.length; i++) {
          if (kontenliste[i].id === parseInt(kontoId)) {
            //nimm die Kategorie
            for (var j = 0; j < kontenliste[i].umsatzList.length; j++) {
              if (kontenliste[i].umsatzList[j].kategorie === "Mobilitaet") {
                umsatzList[counter++]=kontenliste[i].umsatzList[j];
              }
            }
          }
        }
        return umsatzList;
      }      
    };
});
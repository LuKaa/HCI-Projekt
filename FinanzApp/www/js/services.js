angular.module('starter.services', [])




.factory('FinanzService',function(){
  
  var treffer; //ist variable wenn eine übereinstimmung beim suchen gefunden wurde
  
  var user = 
    {
      passwort:'passwort',
      benachrichtigungen: 
        {
          montag: false,
          dienstag: false,
          mittwoch: false,
          donnerstag:false,
          freitag:false,
          samstag:false,
          sonntag:false,
          uhrzeit: '12:00'
        }
      
    }
  ;
  
  var kontakte = [
    {
      id:0,
      nummer: '066412345678',
      vn: 'Max',
      nn: 'Mustermann'
    },
    {
      id:1,
      nummer: '1699345498798',
      vn: 'Jane',
      nn: 'Doe'
    },
      {
      id:2,
      nummer: '06646449797',
      vn: 'Lukas',
      nn: 'Girsch'
    },
  ];
  
  //basic liste erstellen, nur namen sind befüllt, denn alles andere wird autmatisch aus den Web geladen.
  var kontenliste= [{ 
        id:0, 
        bezeichnung: 'Cash', 
        face: 'img/cash.png',
        IBAN: "" ,
        BIC:"", 
        kontoNr:"", 
        kontoPW:"", 
        bankInstitut:"GeldBoerse",
        gesamtbetragOTF:0,
        bezuegebetragOTF:0,
        abzuegebetragOTF:0,  
        umsatzList:[{posID:0, datum:"2014-02-01T23:28:56.782Z", kategorie:"Mobilitaet",beschreibung:"beschr",betrag:45.01},
                    {posID:1, datum:"2013-01-01T23:28:56.782Z", kategorie:"Haushalt",beschreibung:"beschr",betrag:-12.23}]
      },{ 
        id:1,
        bezeichnung: 'Bankkonto', 
        face: 'img/bank.jpg',
        IBAN: "AT611904300234573278" ,
        BIC:"DABAIE2D", 
        kontoNr:"65135", 
        kontoPW:"23216", 
        bankInstitut:"BankAustria",
        gesamtbetragOTF:0,
        bezuegebetragOTF:0,
        abzuegebetragOTF:0, 
        umsatzList:[{posID:0, datum:"2011-01-01T23:28:56.782Z", kategorie:"Mobilitaet",beschreibung:"beschr",betrag:20.33},
                    {posID:1, datum:"2014-01-01T23:28:56.782Z", kategorie:"Mobilitaet",beschreibung:"beschr",betrag:12.23},
                    {posID:1, datum:"2014-02-01T23:28:56.782Z", kategorie:"Haushalt",beschreibung:"beschr",betrag:45.99},
                    {posID:1, datum:"2014-03-01T23:28:56.782Z", kategorie:"Haushalt",beschreibung:"beschr",betrag:-12.12},
                    {posID:1, datum:"2014-04-01T23:28:56.782Z", kategorie:"Haushalt",beschreibung:"beschr",betrag:21.0},
                    {posID:1, datum:"2014-05-01T23:28:56.782Z", kategorie:"Haushalt",beschreibung:"beschr",betrag:-12.78},
                    {posID:1, datum:"2014-06-01T23:28:56.782Z", kategorie:"Kleidung",beschreibung:"beschr",betrag:45.00},
                    {posID:1, datum:"2014-07-01T23:28:56.782Z", kategorie:"Kleidung",beschreibung:"beschr",betrag:12.12},
                    {posID:1, datum:"2014-08-01T23:28:56.782Z", kategorie:"Kleidung",beschreibung:"beschr",betrag:2.00},
                    {posID:1, datum:"2014-09-01T23:28:56.782Z", kategorie:"Kleidung",beschreibung:"beschr",betrag:12.99},
                    {posID:1, datum:"2014-10-01T23:28:56.782Z", kategorie:"Lebensmittel",beschreibung:"beschr",betrag:-1.99},
                    {posID:1, datum:"2014-11-01T23:28:56.782Z", kategorie:"Lebensmittel",beschreibung:"beschr",betrag:92.78},
                    {posID:1, datum:"2014-12-01T23:28:56.782Z", kategorie:"Lebensmittel",beschreibung:"beschr",betrag:12.21},
                    {posID:1, datum:"2015-01-01T23:28:56.782Z", kategorie:"Lebensmittel",beschreibung:"beschr",betrag:-22.99},
                    {posID:1, datum:"2015-02-01T23:28:56.782Z", kategorie:"Freizeit",beschreibung:"beschr",betrag:233.12},
                    {posID:1, datum:"2015-03-01T23:28:56.782Z", kategorie:"Freizeit",beschreibung:"beschr",betrag:-4538.99},
                    {posID:1, datum:"2015-04-01T23:28:56.782Z", kategorie:"Freizeit",beschreibung:"beschr",betrag:12.85},
                    {posID:1, datum:"2015-05-01T23:28:56.782Z", kategorie:"Freizeit",beschreibung:"beschr",betrag:4523.99},
                    {posID:1, datum:"2015-06-01T23:28:56.782Z", kategorie:"Sonstiges",beschreibung:"beschr",betrag:453},
                    {posID:1, datum:"2015-07-01T23:28:56.782Z", kategorie:"Sonstiges",beschreibung:"beschr",betrag:12.99},
                    {posID:1, datum:"2015-08-01T23:28:56.782Z", kategorie:"Sonstiges",beschreibung:"beschr",betrag:12.99},
                    {posID:2, datum:"2007-12-01T23:28:56.782Z", kategorie:"Sonstiges",beschreibung:"beschr",betrag:-8.11},
                    {posID:3, datum:"2010-11-01T23:28:56.782Z", kategorie:"Sonstiges",beschreibung:"beschr",betrag:4.00}]
    }];
    
    return{
      //Ab hier Funktionen
        
        // fügt einen Barumsatz hinzu
    addUmsatz: function (Betrag,Kat,Beschreibung){
       var lastPosID=kontenliste[0].umsatzList.length;
        
        var date = new Date();
        kontenliste[0].umsatzList.push({posID:lastPosID, datum:date.toISOString(), kategorie:Kat,beschreibung:Beschreibung,betrag:Betrag});
        return null;
      },
        
        
      
      //liefert die gesamte Kontaktliste
      getAllKontakte: function (){
        return kontakte;
      },
      
      //liefert einen bestimmten Kontakt
      getKontakt: function(kontaktId) {
        for (var i = 0; i < kontakte.length; i++) {
          if (kontakte[i].id === parseInt(kontaktId)) {
            return kontakte[i];
          }
        }
        return null;
      },
      
      //Kontakt löschen
      removeKontakt: function(kontakt) {
      kontakte.splice(kontakte.indexOf(kontakt), 1);
      },
      
      //Kontakt hinzufügen
      saveKontakt: function(kontakt) {
        kontakt.id = kontakte.length;        
        kontakte.push(kontakt);
      },
      
      //liefert die gesamte Kontoliste
      getAll: function (){
        return kontenliste;
      },
      
      //liefert ein bestimmtes Konto
      get: function(kontoId) {
        for (var i = 0; i < kontenliste.length; i++) {
          if (kontenliste[i].id === parseInt(kontoId)) {
            return kontenliste[i];
          }
        }
        return null;
      },
      
      //Konto löschen
      remove: function(konto) {
      kontenliste.splice(kontenliste.indexOf(konto), 1);
      },
      
      //Konto hinzufügen
      save: function(konto) {
        konto.id = kontenliste.length;
        konto.gesamtbetragOTF=0;
        konto.bezuegebetragOTF=0;
        konto.abzuegebetragOTF=0;
        
        kontenliste.push(konto);
      },
      
       //Passwort prüfen
      checkPw: function(konto) {
        if(konto.passwort==konto.passwort2 && user.passwort==konto.altesPw)
        {
          return 1;
        }
        else if(user.passwort!= konto.altesPw)
        {
          return 2;
        }
        return 0;
      },
      
      //Passwort speichern
      savePw: function(konto) {
        user.passwort = konto.passwort;
      },
      
      getPw:function() {
        return user.passwort;
      },
      
      //Einstellungen
      
      getMontag: function()
      {
        return user.benachrichtigungen.montag;
      },
      getDienstag: function()
      {
        return user.benachrichtigungen.dienstag;
      },
      getMittwoch: function()
      {
        return user.benachrichtigungen.mittwoch;
      },
      getDonnerstag: function()
      {
        return user.benachrichtigungen.donnerstag;
      },
      getFreitag: function()
      {
        return user.benachrichtigungen.freitag;
      },
      getSamstag: function()
      {
        return user.benachrichtigungen.samstag;
      },
      getSonntag: function()
      {
        return user.benachrichtigungen.sonntag;
      },
      getUhrzeit: function()
      {
        return user.benachrichtigungen.uhrzeit;
      },
      
      saveBenachrichtigungen: function(newBenachrichtigungen)
      {
        user.benachrichtigungen.montag = newBenachrichtigungen.mo;
        user.benachrichtigungen.dienstag = newBenachrichtigungen.di;
        user.benachrichtigungen.mittwoch = newBenachrichtigungen.mi;
        user.benachrichtigungen.donnerstag = newBenachrichtigungen.do;
        user.benachrichtigungen.freitag = newBenachrichtigungen.fr;
        user.benachrichtigungen.samstag = newBenachrichtigungen.sa;
        user.benachrichtigungen.sonntag = newBenachrichtigungen.so;
      },
      
      getTag:function(tag)
      {
        if(tag=="mo")
        {
           return user.benachrichtigungen.montag;
        }
        else if(tag=="di")
        {
            return user.benachrichtigungen.dienstag;
        }
        else if(tag=="mi")
        {
            return user.benachrichtigungen.mittwoch;
        }
        else if(tag=="do")
        {
            return user.benachrichtigungen.donnerstag;
        }
        else if(tag=="fr")
        {
            return user.benachrichtigungen.freitag;
        }
        else if(tag=="sa")
        {
            return user.benachrichtigungen.samstag;
        }
        else if(tag=="so")
        {
            return user.benachrichtigungen.sonntag;
        }
      },
      saveTag:function(tag,wert)
      {
        if(tag=="mo")
        {
           user.benachrichtigungen.montag = wert;
        }
        else if(tag=="di")
        {
           user.benachrichtigungen.dienstag = wert;
        }
        else if(tag=="mi")
        {
           user.benachrichtigungen.mittwoch = wert;
        }
        else if(tag=="do")
        {
           user.benachrichtigungen.donnerstag = wert;
        }
        else if(tag=="fr")
        {
           user.benachrichtigungen.freitag = wert;
        }
        else if(tag=="sa")
        {
           user.benachrichtigungen.samstag = wert;
        }
        else if(tag=="so")
        {
           user.benachrichtigungen.sonntag = wert;
        }
      },
      saveUhrzeit: function(newUhrzeit)
      {
        user.benachrichtigungen.uhrzeit = newUhrzeit;
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
        var dateNow = new Date(); //heutiges datum zum wissen welches monat
        dateNow.setDate(1); //auf Monatsersten gesetzt 
        for (var i = 0; i < konto.umsatzList.length; i++) {
          dateTemp = new Date (konto.umsatzList[i].datum);
          if(dateTemp.getTime()>dateNow.getTime()){ //Nur bezüge des Aktuellen Monat
            konto.gesamtbetragOTF += konto.umsatzList[i].betrag;
            if(konto.umsatzList[i].betrag>0){
              konto.bezuegebetragOTF+=konto.umsatzList[i].betrag;
            }else{
              konto.abzuegebetragOTF+=konto.umsatzList[i].betrag;
            }
          }
        }
        konto.gesamtbetragOTF =konto.gesamtbetragOTF.toFixed(2);
        konto.abzuegebetragOTF=konto.abzuegebetragOTF.toFixed(2);
        konto.bezuegebetragOTF=konto.bezuegebetragOTF.toFixed(2);
        return konto;
      },
      
      
      convertDates2Read: function(umsatzList) {
        
        for (var i = 0; i < umsatzList.length; i++) {
          umsatzList[i].datum= this.dateToString(umsatzList[i].datum);
        }
        
        return umsatzList;
      },
      
      
      dateToString: function(date) {
        
        var month = new Array();
          month[0] = "Jänner";
          month[1] = "Februar";
          month[2] = "März";
          month[3] = "April";
          month[4] = "Mai";
          month[5] = "Juni";
          month[6] = "Juli";
          month[7] = "August";
          month[8] = "September";
          month[9] = "Oktober";
          month[10] = "November";
          month[11] = "Dezember";
        
        str="";
        if(date.toString().slice(0,9)=="!WildCat!")
        {
          str = month[parseInt(date.slice(10,12))-1]+ " " + date.slice(12,17) 
        }else{
          str+=date.toString().slice(8,10)+"."; //Tag 
          str+=date.toString().slice(5,7)+"."; //Monat
          str+=date.toString().slice(2,4)+" "; //Jahr
          str+=date.toString().slice(11,16); //Stunde+Miute
        }
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
      
      cleanNachKat: function(umsatzList,kontoKat) {
        
        if(kontoKat.valueOf()==new String("Gesamt").valueOf()){
          return umsatzList;
          }
          
        cleanedUmsatzliste=[];
        counter=0;
        for(var i = 0; i < umsatzList.length; ++i) {
          
          if(umsatzList[i].kategorie.valueOf()==kontoKat.valueOf()){
            cleanedUmsatzliste[counter++] = umsatzList[i];
          }
        }
        return cleanedUmsatzliste;
       
       
      },
      
      //nach Kategorie Mobilität sortierte Summe der Umsätze
      umsatzNachKatM: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Mobilitaet").valueOf()){
            sum = sum + umsatzList[i].betrag;
          }
        }
        return sum;
      },   
      
      //nach Kategorie Haushalt sortierte Summe der Umsätze
      umsatzNachKatH: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Haushalt").valueOf()){
            sum = sum + umsatzList[i].betrag;
          }
        }
        return sum;
      },   
      
      //nach Kategorie Kleidung sortierte Summe der Umsätze
      umsatzNachKatK: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Kleidung").valueOf()){
            sum = sum + umsatzList[i].betrag;
          }
        }
        return sum;
      },   
      
      //nach Kategorie Lebensmittel sortierte Summe der Umsätze
      umsatzNachKatL: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Lebensmittel").valueOf()){
            sum = sum + umsatzList[i].betrag;
          }
        }
        return sum;
      },   
      
      //nach Kategorie Freizeit sortierte Summe der Umsätze
      umsatzNachKatF: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Freizeit").valueOf()){
            sum = sum + umsatzList[i].betrag;
          }
        }
        return sum;
      },
      
      //nach Kategorie Sonstige sortierte Summe der Umsätze
      umsatzNachKatS: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Sonstiges").valueOf()){
            sum = sum + umsatzList[i].betrag;
          }
        }
        return sum;
      },         
      
      //nach Kategorie Mobilität sortierte Summe der Einnahmen
      einnahmeNachKatM: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Mobilitaet").valueOf()){
            if (umsatzList[i].betrag > 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },   
      
      //nach Kategorie Haushalt sortierte Summe der Einnahmen
      einnahmeNachKatH: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Haushalt").valueOf()){
            if (umsatzList[i].betrag > 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },   
      
      //nach Kategorie Kleidung sortierte Summe der Einnahmen
      einnahmeNachKatK: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Kleidung").valueOf()){
            if (umsatzList[i].betrag > 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },   
      
      //nach Kategorie Lebensmittel sortierte Summe der Einnahmen
      einnahmeNachKatL: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Lebensmittel").valueOf()){
            if (umsatzList[i].betrag > 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },   
      
      //nach Kategorie Freizeit sortierte Summe der Einnahmen
      einnahmeNachKatF: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Freizeit").valueOf()){
            if (umsatzList[i].betrag > 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },
      
      //nach Kategorie Sonstige sortierte Summe der Einnahmen
      einnahmeNachKatS: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Sonstiges").valueOf()){
            if (umsatzList[i].betrag > 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },         
      
      //nach Kategorie Mobilität sortierte Summe der Ausgaben
      ausgabeNachKatM: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Mobilitaet").valueOf()){
            if (umsatzList[i].betrag < 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },   
      
      //nach Kategorie Haushalt sortierte Summe der Ausgaben
      ausgabeNachKatH: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Haushalt").valueOf()){
            if (umsatzList[i].betrag < 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },   
      
      //nach Kategorie Kleidung sortierte Summe der Ausgaben
      ausgabeNachKatK: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Kleidung").valueOf()){
            if (umsatzList[i].betrag < 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },   
      
      //nach Kategorie Lebensmittel sortierte Summe der Ausgaben
      ausgabeNachKatL: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Lebensmittel").valueOf()){
            if (umsatzList[i].betrag < 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },   
      
      //nach Kategorie Freizeit sortierte Summe der Ausgaben
      ausgabeNachKatF: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Freizeit").valueOf()){
            if (umsatzList[i].betrag < 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },
      
      //nach Kategorie Sonstige sortierte Summe der Ausgaben
      ausgabeNachKatS: function(umsatzList) {     
        sum=0.0;
        for(var i = 0; i < umsatzList.length; ++i) {  
          if(umsatzList[i].kategorie.valueOf()==new String("Sonstiges").valueOf()){
            if (umsatzList[i].betrag < 0.0){
              sum = sum + umsatzList[i].betrag;
            }
          }
        }
        return sum;
      },         
      
      makeMonthRev: function(umsatzList) {
        var counter =0;
        var tempBetragCounter=0;   
        var tempUmsatzlist=[];
        for (var i = 0; i < umsatzList.length; i++) {
            tempUmsatzlist[counter+i]=umsatzList[i];
            tempBetragCounter += parseFloat(umsatzList[i].betrag);
            if(umsatzList[i+1]!=null){
              
              if(umsatzList[i+1].datum.slice(5,7)<umsatzList[i].datum.slice(5,7)||umsatzList[i+1].datum.slice(2,4)!=umsatzList[i].datum.slice(2,4)){
                counter++;
                tempUmsatzlist.push({posID:"", datum:"", kategorie:"all",beschreibung:"",betrag:""});
                tempUmsatzlist[counter+i].datum="!WildCat!"+umsatzList[i].datum.slice(5,7) + "." + umsatzList[i].datum.slice(0,4);
                tempUmsatzlist[counter+i].beschreibung="Monatsübersicht (Saldo)";
                tempUmsatzlist[counter+i].betrag=tempBetragCounter.toFixed(2);
                tempBetragCounter=0;
              }
            }else{
              counter++;
              tempUmsatzlist.push({posID:"", datum:"", kategorie:"all",beschreibung:"",betrag:""});
              tempUmsatzlist[counter+i].datum="!WildCat!"+umsatzList[i].datum.slice(5,7) + "." + umsatzList[i].datum.slice(0,4);
              tempUmsatzlist[counter+i].beschreibung="Monatsübersicht (Saldo)";
              tempUmsatzlist[counter+i].betrag=tempBetragCounter.toFixed(2);
              tempBetragCounter=0;
            }
            
        }
        return tempUmsatzlist;
      },
      
      machValidDateFormat: function(umsatzList) {
               
        for (var i = 0; i < umsatzList.length; i++) {
           umsatzList[i].betrag = umsatzList[i].betrag.toFixed(2);
        }
        return umsatzList;
      },
      
      getUmsatzList: function(kontoId) {
               

        //finde das Passende konto
        for (var i = 0; i < kontenliste.length; i++) {
          if (kontenliste[i].id === parseInt(kontoId)) {
             return kontenliste[i].umsatzList;
            }
          }
        
      }      
    };
});
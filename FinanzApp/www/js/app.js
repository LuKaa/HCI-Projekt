// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory('serviceName', function() {
	return {}
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.bareingabe', {
    url: '/bareingabe',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.bareingabe.html',
        controller:'BareingabeCtrl'
      }
    }
  })
  
  .state('app.einstellungen', {
    url: '/einstellungen',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.einstellungen.html',
      }
    }
  })
  .state('app.benachrichtigungen', {
    url: '/einstellungen/benachrichtigungen',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.benachrichtigungen.html',
        controller: 'BenachrichtigungenCtrl'
      }
    }
  })
  .state('app.passwortEinrichten', {
    url: '/einstellungen/passwortEinrichten',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.passwortEinrichten.html',
        controller: 'PasswortCtrl'
      }
    }
  })
  .state('app.kontenVerwalten', {
    url: '/kontenVerwalten',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.kontenVerwalten.html',
        controller: 'KontenVerwaltenCtrl'
      }
    }
  })
  .state('app.kontoDetail', {
    url: '/konten/:kontoId',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.kontoDetail.html',
        controller: 'KontoDetailCtrl'
      }
    }
  })
  .state('app.kontoHinzufuegen', {
    url: '/kontoHinzufuegen',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.kontoHinzufuegen.html',
       controller: 'KontoHinzufuegenCtrl'
      }
    }
  })
  .state('app.kontakte', {
    url: '/kontakte',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.kontakte.html',
        controller: 'KontakteCtrl'
      }
    }
  })
  .state('app.kontaktDetail', {
    url: '/kontakte/:kontaktId',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.kontaktDetail.html',
        controller: 'KontaktDetailCtrl'
      }
    }
  })
  .state('app.kontaktHinzufuegen', {
    url: '/kontaktHinzufuegen',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.kontaktHinzufuegen.html',
        controller: 'KontaktHinzufuegenCtrl'
      }
    }
  })
  
  //für die allgemeine Statistik Seite
  .state('app.statistik', {
    url: '/statistik',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.statistik.html',
        controller: 'StatisticController'
      }
    }
  })
  
  //für die detailierten Statistik Seiten
  .state('app.statistikDetail', {
    url: '/statistik/:kontoId',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.statistikDetail.html',
      }
    }
  })
  .state('app.uebersicht', {
    url: '/uebersicht',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.uebersicht.html'
      }
    }
  })
  .state('app.ueberweisung', {
    url: '/ueberweisung',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.ueberweisung.html'
      }
    }
  })
  .state('app.umsatz', {
    url: '/umsatz/:kontoId',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.umsatz.html',
        controller: 'UmsatzController'
      }
    }
  })  
  
  .state('app.umsatzDetail', {
    url: '/umsatz/:kontoId/:kontoKat',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.umsatzDetail.html',
        controller: 'UmsatzDetailController'
      }
    }
  }) 
  
    .state('app.umsatzTeilen', {
    url: '/teilen/:betrag',
    views: {
      'menuContent': {
        templateUrl: 'templates/t.umsatzTeilen.html',
          controller:'KontakteCtrl'
      }
    }
  })
/*
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })


  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  */
  
  
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/bareingabe');
});

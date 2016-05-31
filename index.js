_.contains = _.includes;

angular.module('myApp', ['ui.router', 'restangular'])
.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
  // Url de récupération de données
  RestangularProvider.setBaseUrl('https://www.foaas.com/');

  // Initialisation du format de sortie
  RestangularProvider.setDefaultHeaders({'Content-Type' : 'application/json'});

  // Récupération des réponses
  RestangularProvider.setResponseExtractor(function(response, operation) {
    return response.subtitle + " : " + response.message;
  });

  // Url par défaut
  $urlRouterProvider.otherwise("/birth");

  $stateProvider.state('birth', {
    url: '/birth',
    template: '<div>Bienvenue au Monde ! <br> <div><button ui-sref=".childhood">Enfance</button></div><div ui-view></div></div>',
    resolve: {
      respRest : function(Restangular) {
        var message = Restangular.one("baby/Stéphanie").get().then(function(message) {
          $("#resp").append(message);
        });
      }
    }
  })
  .state('birth.childhood', {
    url: '/childhood',
    template: '<div>Enfance me voila !<br> <div><button ui-sref=".study">Etude</button> <button ui-sref=".career">Carriére</button></div><div ui-view></div></div>',
    resolve: {
      respRest : function(Restangular) {
        var message = Restangular.one("fascinating/Stéphanie").get().then(function(message) {
          $("#resp").append(message);
        });
      }
    }
  })
  .state('birth.childhood.study', {
    url: '/study',
    template: '<div>En plein dans les etudes ! <br><div><button ui-sref=".phd">Php</button><button ui-sref=".working">Travailler</button></div><div ui-view></div></div>',
    resolve: {
      respRest : function(Restangular) {
        var message = Restangular.one("that/Stéphanie").get().then(function(message) {
          $("#resp").append(message);
        });
      }
    }
  })
  .state('birth.childhood.study.phd', {
    url: '/phd',
    template: '<div>Le doctorat est à moi !<br><button ui-sref=".working">Travailler</button> <div ui-view></div></div>',
    resolve: {
      respRest : function(Restangular) {
        var message = Restangular.one("what/Stéphanie").get().then(function(message) {
          $("#resp").append(message);
        });
      }
    }
  })
  .state('birth.childhood.career', {
    url: '/career',
    template: '<div>Super !<br><button ui-sref=".working">Travailler</button><div ui-view></div></div>',
    resolve: {
      respRest : function(Restangular) {
        var message = Restangular.one("thanks/Stéphanie").get().then(function(message) {
          $("#resp").append(message);
        });
      }
    }
  });

  addWorking($stateProvider, 'birth.childhood.study');
  addWorking($stateProvider, 'birth.childhood.study.phd');
  addWorking($stateProvider, 'birth.childhood.career');

  function addWorking($stateProvider, parent){
    $stateProvider.state(`${parent}.working`, {
      url: '/working',
      template: '<div>Au travail !<br><button ui-sref=".pension">Pension</button><div ui-view></div></div>',
      resolve: {
        respRest : function(Restangular) {
          var message = Restangular.one("everything/Stéphanie").get().then(function(message) {
            $("#resp").append(message);
          });
        }
      }
    })
    .state(`${parent}.working.pension`, {
      url: '/pension',
      template: '<div>La fin est approche.<br><button ui-sref=".death">Death</button><div ui-view></div></div>',
      resolve: {
        respRest : function(Restangular) {
          var message = Restangular.one("because/Stéphanie").get().then(function(message) {
            $("#resp").append(message);
          });
        }
      }
    })
    .state(`${parent}.working.pension.death`, {
      url: '/death',
      template: '<div>RIP<br><button ui-sref="birth">A qui le tour ?</button></div>',
      resolve: {
        respRest : function(Restangular) {
          var message = Restangular.one("life/Stéphanie").get().then(function(message) {
            $("#resp").append(message);
          });
        }
      }
    });
  }
});

function secureState($q, $state, $auth, $rootScope) {
  return new $q(resolve => {
    if($auth.isAuthenticated()) return resolve();

    $rootScope.$broadcast('flashMessage', {
      type: 'warning',
      content: 'Please login to view this page'
    });

    $state.go('login');
  });
}

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/home.html'
    })
    .state('recordsIndex', {
      url: '/records',
      templateUrl: './views/records/index.html',
      controller: 'RecordsIndexCtrl'
    })
    .state('recordsShow', {
      url: '/records/:id',
      templateUrl: './views/records/show.html',
      controller: 'RecordsShowCtrl'
    })
    .state('recordsNew', {
      url: '/records/new',
      templateUrl: './views/records/new.html',
      controller: 'RecordsNewCtrl',
      resolve: { secureState }
    })
    .state('recordsEdit', {
      url: '/records/:id/edit',
      templateUrl: './views/records/edit.html',
      controller: 'RecordsEditCtrl',
      resolve: {secureState}
    })
    .state('collectionsIndex', {
      url: '/collections',
      templateUrl: './views/collections/index.html',
      controller: 'CollectionsIndexCtrl'
    })
    .state('requestsNew', {
      url: '/records/:id/requests',
      templateUrl: './views/requests/new.html',
      controller: 'RequestsNewCtrl',
      resolve: { secureState }
    })
    .state('requestsEdit', {
      url: '/requests/:id/edit',
      templateUrl: './views/requests/edit.html',
      controller: 'RequestsEditCtrl',
      resolve: { secureState }
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: './views/users/index.html',
      controller: 'UsersIndexCtrl'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: './views/users/show.html',
      controller: 'UsersShowCtrl'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: './views/users/edit.html',
      controller: 'UsersEditCtrl',
      resolve: { secureState }
    })
    .state('usersDelete', {
      url: '/users/:id',
      templateUrl: './views/users/delete.html',
      controller: 'UsersShowCtrl',
      resolve: { secureState }
    })
    .state('messagesIndex', {
      url: '/messages',
      templateUrl: './views/messages/index.html',
      controller: 'MessagesIndexCtrl'
    })
    .state('messagesShow', {
      url: '/messages/:id',
      templateUrl: './views/messages/show.html',
      controller: 'MessagesShowCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: './views/auth/login.html',
      controller: 'AuthLoginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: './views/auth/register.html',
      controller: 'AuthRegisterCtrl'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;

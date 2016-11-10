function RRController($scope, $mdDialog, robindata) {

  $scope.groups = {
    'group0': {
      'name': 'databois',
      'members': ['user1'],
      'robins': ['robin0'],
    }
  }
  $scope.robins = {
    'robin0': {
      'name': 'Test Robin',
      'desc': 'This is my description.',
      'canview': [
        'group0'
      ],
      'canedit': [
        'user0'
      ]
    }
  }

  setTimeout(function() {console.log($scope.curgroup);}, 1000);

  firebase.auth().onAuthStateChanged(function(authData) {
    // authData can be null, but this handles both signin/signout cases.
    console.log('login changed:', authData, firebase.auth().currentUser);
    $scope.currentUser = authData;
    try {
      robindata.updateRobins($scope);
    } catch(err) {
      console.error(err);
    }
  });

  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');

  $scope.login = function(ev) {
    firebase.auth().signInWithRedirect(provider);
  };

  $scope.logout = function(ev) {
    firebase.auth().signOut().then(function() {
      console.log('client logged out');
    }, function(err) {
      console.error(err);
    });
  }

  $scope.showCreate = function(ev) {
    if ($scope.currentUser) {
      $scope.dialog = {
        title: "Create Robin",
        robin: {
          name: "New Robin",
          desc: "Default Description"
        }
      };

      $mdDialog.show({
        clickOutsideToClose: true,
        controller: DialogController($scope.dialog, function(){
          return robindata.createFromDialog($scope, $scope.dialog.robin);
        }),
        parent: angular.element(document.body),
        targetEvent: ev,
        templateUrl: 'dialogs/editdialog.html'
      });
    }
  };
  console.log(robindata);

  function onLogin(currentUser) {
    if (currentUser) {
      console.log(currentUser);
      $scope.currentUser = currentUser;
      robindata.updateRobins($scope);
    } else {
      console.log("Client logged out");
      $scope.currentUser = null;
      $scope.robins = null;
    }
  }
  $scope.updateRobins = robindata.updateRobins;
};
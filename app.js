var ref;
var ui;

/**
 * You must include the dependency on 'ngMaterial' 
 */
angular
.module('BlankApp', ['ngMaterial', 'firebase'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('blue');
})
  .controller('RRCtrl', RRController);

function DialogController(dialog, submit) {
  return function($scope, $mdDialog) {
    $scope.dialog = dialog;

    $scope.hideDialog = $mdDialog.hide;
    $scope.submitDialog = function(){ if (submit()) $mdDialog.hide(); };
  }
}

function RRController($scope, $mdDialog, $firebaseAuth) {
  $scope.status = '';
  $scope.items = [1,2,3,4,5];
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAlztadeMp33clCIrYd7wmJEYzeX65BYWU",
    authDomain: "roundrobin-927af.firebaseapp.com",
    databaseURL: "https://roundrobin-927af.firebaseio.com",
    storageBucket: "roundrobin-927af.appspot.com",
    messagingSenderId: "1041277055764"
  };
  ref = firebase.initializeApp(config);

  // var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
  // $scope.authObj = $firebaseAuth(ref);

  var auth = $firebaseAuth();
  auth.$onAuthStateChanged(onLogin);
  $scope.showLogin = function(ev) {
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    }
    if (!$scope.currentUser) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialogs/logindialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }
  };

  $scope.showCreate = function(ev) {
    console.log("asdfasdfasdf");
    if ($scope.currentUser) {
      $scope.dialog = {
        title: "Create Robin",
        robin: {
          id: $scope.robins.length,
          name: "New Robin",
          desc: "Default Description"
        }
      };

      $mdDialog.show({
        clickOutsideToClose: true,
        controller: DialogController($scope.dialog, function(){console.log($scope.dialog); return true; }),
        parent: angular.element(document.body),
        targetEvent: ev,
        templateUrl: 'dialogs/editdialog.html'
      });
    }
  };

  function onLogin(currentUser) {
    console.log(currentUser);
    $scope.currentUser = currentUser;
    updateRobins();
  }

  function updateRobins() {
    var database = firebase.database();
    var userId = firebase.auth().currentUser.uid;
    console.log(userId);
    return firebase.database().ref('/robins/'+userId).once('value').then(function(snapshot) {
      var robins = snapshot.val();
      console.log(robins);
      $scope.robins = robins;
      $scope.$apply();
    });
  }
  $scope.updateRobins = updateRobins;

  // FirebaseUI config.
  var uiConfig = uiConfig || {
    'signInFlow': 'popup',
    // 'signInSuccessUrl': './',
    'signInOptions': [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    'tosUrl': 'http://www.mattmerr.com/privacy',
    'callbacks': {
      'signInSuccess': function(currentUser, credential, redirectUrl) {
        
        onLogin(currentUser);
        $mdDialog.hide();
        // Do something.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      }
    }
  };
};
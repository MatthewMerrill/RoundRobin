// Initialize Firebase
var config = {
  apiKey: "AIzaSyAlztadeMp33clCIrYd7wmJEYzeX65BYWU",
  authDomain: "roundrobin-927af.firebaseapp.com",
  databaseURL: "https://roundrobin-927af.firebaseio.com",
  storageBucket: "roundrobin-927af.appspot.com",
  messagingSenderId: "1041277055764"
};
firebase.initializeApp(config);

angular
.module('RRApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('blue');
})
.service('robindata', RobinData)
.controller('RRCtrl', RRController);


function DialogController(dialog, submit) {
  return function($scope, $mdDialog) {
    $scope.dialog = dialog;
    $scope.hideDialog = $mdDialog.hide;
    $scope.submitDialog = function(){ if (submit()) $mdDialog.hide(); };
  }
}

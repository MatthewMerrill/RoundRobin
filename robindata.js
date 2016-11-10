function RobinData() {

  this.login = function(currentUser) {

  }

  this.userRobins = function(callback) {
    var database = firebase.database();
    var userId = firebase.auth().currentUser.uid;

    var userRobinsRef = firebase.database().ref('users/' + userId + '/robins');

    return firebase.database().ref('users/'+userId+'/robins').on('value').then(function(snapshot) {
      callback(snapshot.val());
    });
  }

  this.updateRobins = function($scope) {
    if (!this.currentUser) return;

    var robinsRef = firebase.database().ref('/robins/'+userId);
    robinsRef.once('value').then(function(data){
      $scope.robins = data;
    });
  };

  this.groupRobins = function(callback) {

  };

  this.createFromDialog = function($scope, dialogObject) {

    var robin = {};
    robin.name = dialogObject.name;
    robin.desc = dialogObject.desc;
    robin.players = dialogObject.playertext.split("\n");
    robin.shuffleseed = 1612;

    this.saveRobin($scope, robin);
    return true;
  }

  this.saveRobin = function($scope, robin) {
    var database = firebase.database();
    var userId = firebase.auth().currentUser.uid;
    
    var robinRef = firebase.database().ref('/robins/'+userId).push();
    robinRef.set(robin);

    this.updateRobins($scope);
    return true;
  }
}
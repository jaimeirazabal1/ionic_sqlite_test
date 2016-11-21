angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$cordovaSQLite,$state,$ionicPopup) {
  
  
 
  $scope.$on("$ionicView.enter", function(event, data){
     var alertPopup = $ionicPopup.alert({
       title: 'Aviso',
       template: 'Cargando...'
     });

     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
    $scope.items = [];
     
    $cordovaSQLite.execute(db,"SELECT * from example").then(function(res){

        if(res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              $scope.items.push(res.rows.item(i));
            }

        } else {
           var alertPopup = $ionicPopup.alert({
             title: 'Aviso',
             template: 'No se Cargo ningun amigo todavia'
           });

           alertPopup.then(function(res) {
             console.log('Thank you for not eating my delicious ice cream cone');
           });
        }
       
    }, function (err) {
        alert(err)
    });
  });

})

.controller('ChatsCtrl', function($scope, Chats ,$cordovaSQLite, $state,$ionicPopup,$location) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $scope.add = function(){
    //console.log(this.people.firstname,this.people.lastname,this.people.comments);
    $cordovaSQLite.execute(db,"INSERT into example (firstname, lastname, comments) VALUES (?,?,?)",[this.people.firstname,this.people.lastname,this.people.comments]).then(function(res){
     var alertPopup = $ionicPopup.alert({
       title: 'Correcto',
       template: 'El dato fue insertado con el id '+res.insertId
     });

     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
      this.people.firstname = '';
      this.people.lastname = '';
      this.people.comments = '';

      $location.path('/tab/dash'); 
    }, function (err) {
      console.log(err)
           var alertPopup = $ionicPopup.alert({
       title: 'Error',
       template: err
     });

     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
    });
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

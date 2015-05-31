angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('BrowseController', function($scope, $ionicPlatform, $cordovaMedia, $cordovaFile) {

  $scope.fileTitle = "HelloWord";

  $scope.fileName = function(fileTitle) {

    var filePath = cordova.file.dataDirectory + fileTitle;

    var platform = ionic.platform ? ionic.platform() : 'browser';
    switch(platform) {
      case 'ios':
        return filePath + '.wav';
      case 'android':
        return filePath + '.amr';      
      case 'windowsphone':
        return filePath + '.M4A';
      default:
        return filePath + '.amr';
    }
  };

  $scope.media = null;

  $scope.openMedia = function(filePath) {

    $scope.filePath = $scope.fileName($scope.fileTitle)

    return $cordovaMedia.newMedia($scope.filePath)
    .then(function (success) {
      console.log('success openMedia');
      console.log(success);
    }, function (error) {
      console.log('error openMedia');
      console.log(error);
    });
  };

  $ionicPlatform.ready(function() {
    $scope.media = $scope.openMedia($scope.fileName($scope.fileTitle));
  });

  $scope.isRecording = false;

   // Just write a file
  $scope.writeFile = function() {
    console.log('writing to ' + cordova.file.dataDirectory);
    $cordovaFile.writeFile(cordova.file.dataDirectory, "file.txt", "text", true)
    .then(function (success) {
      console.log('success writefile');
      console.log(success);
    }, function (error) {
      console.log('error writefile');
      console.log(error);
    });
  };

  // Play an audio file
  $scope.play = function() {
    $scope.media.play();
    console.log('play');
  };

  // Record an audio file
  $scope.startRecord = function() {
    $scope.isRecording = true;
    $scope.media.startRecord();
    console.log('startRecord');
  };

  $scope.stopRecord = function() {
    $scope.isRecording = false;
    $scope.media.stopRecord();
    $scope.media = $cordovaMedia.newMedia($scope.fileName($scope.fileTitle));
    console.log('stopRecord');
  };

});

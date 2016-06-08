angular.module('app').controller('NewProjectCtrl',function(
    $scope,
    projectService,
    $state
){

    $scope.isCreating = false;

    $scope.project = {};

    $scope.onCreateClick = function(){

        $scope.isCreating = true;


        projectService.create($scope.project)
            .then(function(res){

                $scope.isCreating = false;
                $state.go('projects');
            });

    };

});

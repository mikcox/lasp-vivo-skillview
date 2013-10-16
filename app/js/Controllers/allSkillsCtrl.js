'use strict';

/* Controllers */
vivoviz.controller('allSkillsCtrl', ['$scope','dataFactory','formatFactory',function ($scope, dataFactory, formatFactory){      
    
    getPersonnel();
    
    function getPersonnel(){
        dataFactory.getMasterList()
            .success(function(data){
                $scope.skills = formatFactory.formatMasterList(data);
            })
            .error(function(data,status) {
                $scope.error = "Fuseki returned: " + status;
        });
    }
    
    $scope.orderProp = "Person.value";
    
    $scope.DeleteButtonPressed = function(name, personuri, skill, skilluri, $index){
        var moveon = confirm("Delete "+name+"'s "+skill+" skill?");
        if (moveon)
          {
            alert("Deleting "+name+"'s "+skill+" skill.  Wait a moment and refresh your page to see the change.");
            ajaxSubmitDeletion(personuri, skilluri);
          }
        else
          {
          return;
          } 
    };
    
    function ajaxSubmitDeletion(personuri, skilluri) {
        var deletionText = "personuri,leveluri\n";
        deletionText += personuri+","+skilluri+"\n";
        $.ajax
        ({
            type: "POST",
            url: "lib/removebuttonaction.php",
            data: {DeletionText : deletionText}, 
        });
    };
}]);
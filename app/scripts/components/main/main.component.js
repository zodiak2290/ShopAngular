
  function mainComponentCtrl(){
    var ctrl = this;

    ctrl.$onInit = function(){

    }
  }
  mainComponentCtrl.$inject = [];
  angular.module('demoPApp')
  .component('mainComponent', {
    templateUrl: "../app/scripts/components/main/main.tpl.html",
    controller: mainComponentCtrl,
    bindings: {

    }
  });

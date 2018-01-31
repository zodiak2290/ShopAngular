
  function dashboardComponentCtrl(){
    var ctrl = this;

    ctrl.$onInit = function(){

    }
  }
  dashboardComponentCtrl.$inject = [];
  angular.module('demoPApp')
  .component('dashboardComponent', {
    templateUrl: "../app/scripts/components/dashboard/dashboard.tpl.html",
    controller: dashboardComponentCtrl,
    bindings: {}
  });


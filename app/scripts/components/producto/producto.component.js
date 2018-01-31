
  function productoComponentCtrl(){
    var ctrl = this;

    ctrl.$onInit = function(){};

    ctrl.adToCar = function(){
      ctrl.addToCar()(ctrl.producto);
    };

    ctrl.showMore = function(){
      swal({
        title: ctrl.producto.name,
        html: '<div class="text-justify">' + ctrl.producto.descripcion +'</div>',
        imageUrl: ctrl.producto.img,
        animation: true
      });
    }
  }
  productoComponentCtrl.$inject = [];
  angular.module('demoPApp')
  .component('productoComponent', {
    templateUrl: "../app/scripts/components/producto/producto.tpl.html",
    controller: productoComponentCtrl,
    bindings: {
      producto:'=',
      addToCar:'&'
    }
});
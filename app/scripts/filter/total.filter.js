'use strict';

angular.module('demoPApp')
  .filter('totalCar', function () {
      return function (productos) {
            var total = 0;
            if(productos.length > 0){
                productos.forEach(function(producto){
                    total = total +  (producto.precio * producto.cantidad);
                });
            }
            return total;
      };
  }
);
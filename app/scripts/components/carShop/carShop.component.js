
  function carShopComponentCtrl(NgMap, $document){
    var ctrl = this;

    ctrl.carrito = [];
    ctrl.imgdemo = 'http://lorempixel.com/400/200';
    ctrl.currentDate = new Date();
    ctrl.cliente = {};

    ctrl.formValido = false;


    var section3 = angular.element(document.getElementById('section3'));
    ctrl.toSection3 = function() {
      $document.scrollToElementAnimated(section3);
    }

    ctrl.$onInit = function(){
      
      ctrl.productos = [
        {
          id:1,name: "Tohsiba",img:ctrl.imgdemo, precio: 20000, 
          descripcion:'Desempeño confiable, diseño moderno. Dale más poder a tus días con una laptop atractiva, creada para mantenerte conectado y con todas las tareas bajo control, con rendimiento confiable y batería duradera. Rediseñado por dentro y por fuera: Diseño atractivo y moderno hecho especialmente para ti. La laptop que va contigo: El desempeño que necesitas para trabajar y jugar con hasta 9 horas de batería. Sistema operativo: Windows 10 Home, Procesador: Séptima generación del procesador Intel Core i7-7500U, Cantidad de núcleos: Dual-Core y pantalla de 15,6" de diagonal HD(33) SVA BrightView con luz de fondo WLED (1366 x 768).',
          inventario:10
        },
        {
          id:2,name: "Mac book Pro",img:ctrl.imgdemo, precio: 45000, 
          inventario:10,
          descripcion: 'Procesador Intel Core i5 dual core de séptima generación de 2.3 GHz Turbo Boost de hasta 3.6 GHz 8 GB de memoria LPDDR3 de 2133 MHz Almacenamiento SSD de 128 GB1 Intel Iris Plus Graphics 640 Dos puertos Thunderbolt 3'
        },       
        {
          id:3,name: "Audifonos Bluetooh",img:ctrl.imgdemo, precio: 4700,
          inventario:10,
          descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, quo pariatur cumque sunt aut autem labore, rem et non, eveniet magnam excepturi quas animi? Quibusdam mollitia deleniti amet corrupti libero.'
        },
        {
          id:4,name: "Motorola",img:ctrl.imgdemo, precio: 14500,
          inventario:10, 
          descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, quo pariatur cumque sunt aut autem labore, rem et non, eveniet magnam excepturi quas animi? Quibusdam mollitia deleniti amet corrupti libero.'
        },
        {
          id:5,name: "Nokia Lumia",img: ctrl.imgdemo, precio: 8700,
          inventario:10, 
          descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, quo pariatur cumque sunt aut autem labore, rem et non, eveniet magnam excepturi quas animi? Quibusdam mollitia deleniti amet corrupti libero.'
        }
      ];
    }

    ctrl.addTocar = function(producto){

        // agregar al carrito solo si hay aun en el inventario
        if(producto.inventario > 1){
            var indice = ctrl.carrito.indexOf(producto);
            if( indice < 0) {
              producto.cantidad = 1;
              ctrl.carrito.push(producto);
            } else {
              ctrl.carrito[indice].cantidad = ctrl.carrito[indice].cantidad +1; 
            }

            ctrl.productos.forEach(function(prod, index) {
               if(prod === producto) {
                 ctrl.productos[index].inventario = ctrl.productos[index].inventario -1; 
               }
            });
        }
        // si ya esta en el carrito agregar +1 a cantidad        
        // reducir numero en el inventario
        // 

    };

    ctrl.delete = function(producto){
        ctrl.carrito.forEach(function(item, indice){
            if(producto === item){
              ctrl.carrito[indice].cantidad = ctrl.carrito[indice].cantidad - 1;
              if( ctrl.carrito[indice].cantidad === 0){
                ctrl.carrito.splice(indice, 1);
              }
            }
        });

        ctrl.productos.forEach(function(prod, index) {
          if(prod === producto) {
            ctrl.productos[index].inventario = ctrl.productos[index].inventario + 1; 
          }
       });
    };

    ctrl.showMapa = function(){
        ctrl.verMapa = !ctrl.verMapa; 
        ctrl.map = NgMap.initMap("foo");
        console.log('vm.map 2', ctrl.map)
        
    };

    ctrl.getMarca = function(e) {      
      geocoder = new google.maps.Geocoder()
      var infowindow = new google.maps.InfoWindow;
      geocodeLatLng(geocoder, ctrl.map, infowindow.$inject, e.latLng);
      //var marker = new google.maps.Place({position: e.latLng, map: ctrl.map});
    };

    function geocodeLatLng(geocoder, map, infowindow, latlng) {
      geocoder.geocode({'location': latlng}, function(results, status) {
        var direccion = results[0].formatted_address.split(",");
        ctrl.cliente.direccion = {
          calle: direccion[0].split(" ")[0], 
          numero:direccion[0].split(" ")[1],
          colonia: direccion[2].split(" ")[1],
          ciudad: direccion[3] ,
          estado: direccion[5],
          cp:direccion[2].split(" ")[0] 
        }
      });
    }

    ctrl.validCard = function(){
      var digitInit = ctrl.creditcard[0];  
      
        if (digitInit === '4' || digitInit === '5' ){
          ctrl.formValido = ctrl.creditcard.length === 16;
        } else {
          ctrl.formValido = false;
        }
    };

    ctrl.hacerPago = function(){
      var total = 0;
      if(ctrl.carrito.length > 0){
          ctrl.carrito.forEach(function(producto){
              total = total +  (producto.precio * producto.cantidad);
          });
      }
      
      swal({
        title: 'Compra Exitosa!',
        html:
          'Agradecemos tu preferencia por eso <b>Te obsequiamos un descuento de '  + total * 0.05 + ' para tu proxima compra</b>, <br>  ' +  getCode()
      });
    }

    function getCode() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }


  }
  carShopComponentCtrl.$inject = ['NgMap', '$document'];
  angular.module('demoPApp')
  .component('carShopComponent', {
    templateUrl: "../app/scripts/components/carShop/carShop.tpl.html",
    controller: carShopComponentCtrl,
    bindings: {

    }
  });

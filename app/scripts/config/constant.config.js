'use strict';

/**
 * Config constant
 */
angular.module('demoPApp')
.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
angular.module('demoPApp')
.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //Components
        'navComponent': "scripts/components/nav/nav.component.js",
        'carShopComponent': "scripts/components/carShop/carShop.component.js",     
        'productoComponent':"scripts/components/producto/producto.component.js",
        'sweet-alert': ['bower_components/sweetalert2/dist/sweetalert2.min.js', 'bower_components/sweetalert2/dist/sweetalert2.min.css'],

        //filters
        'totalCar':'scripts/filter/total.filter.js',
    },
    //*** angularJS Modules
    /*modules: [ 
                {
            name: 'angularSpectrumColorpicker',
            files: ['../bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js']
        }
    ]*/
});

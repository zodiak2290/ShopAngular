angular.module('demoPApp')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, jsRequires) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $ocLazyLoadProvider.config({
        debug: true,
        events: true,
        modules: jsRequires.modules
    });

    $urlRouterProvider.otherwise('/app');
    $stateProvider
      .state('app', {
        url: '/app',
        component: 'mainComponent',
        lazyLoad: function ($transition$) {
            return $transition$.injector()
            .get('$ocLazyLoad')
            .load('scripts/components/main/main.component.js');
        },
        resolve: loadSequence('navComponent', 'carShopComponent', 'productoComponent', 'totalCar', 'sweet-alert')
    });

    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);
/**
 * Created by wizdev on 12/4/2015.
 */
(function(window, require){
    "use strict";
    var _basePath={
        libs:'../assets/libs/',
        plugins:'scripts/common/plugins/',
        core:'scripts/core/'
    };
    window['name'] = 'commety';
    require.config({
        urlArgs: 'v=1.0',
        waitSeconds: 200,
        // alias libraries paths
        paths: {
            'commety':"commety-app",
            jQuery: _basePath.libs +'jquery/jquery-2.1.1.min',
            'jquery-ui':_basePath.libs +'jquery-ui/jquery-ui',
            ngRoute:  _basePath.libs +'angular/angular-route',
            angular: _basePath.libs +'angular/angular',
            bootstrap:_basePath.libs +'bootstrap/bootstrap.min',
            'ui-bootstrap':_basePath.libs +'bootstrap/ui-bootstrap-tpls-0.12.0.min',
            'grid':_basePath.libs +'ng-grid/build/ng-grid.min',
            'ui-tree':_basePath.libs+'plugins/uiTree/angular-ui-tree.min',
        },
        shim: {
            angular: {
                exports: "angular"
            },
            ngRoute: {
                deps: ["angular"]
            },
            bootstrap:{
                deps:['jQuery']
            },
            'ui-tree':{
                deps:['angular']
            },
            'ui-bootstrap':{
                deps: ['jQuery', 'angular']
            },
            'jquery-easing':{ deps: ['jQuery'], exports: 'jquery-easing'},
            'grid':{
                deps: ['angular']
            },
            'commety':{
                deps: ['jQuery', 'ngRoute', 'bootstrap','ui-bootstrap', 'grid', 'ui-tree']
            },
        },
        deps: [window['name']]
    });
})(window, require);
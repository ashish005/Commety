/**
 * Created by wizdev on 11/21/2015.
 */

(function () {
    var appName = 'commety';
    var app = angular.module(appName, [
        'ngRoute',
        'ui.bootstrap', 'ngGrid', 'ui.tree'
    ]);
    var _path = {
        login:'scripts/core/templates/login.html',
        register:'scripts/core/templates/register.html',
        recover:'scripts/core/templates/recover.html',
        lock:'scripts/core/templates/lock.html',
        404:'scripts/core/templates/404.html',
        commety:'scripts/commety/templates/commety.html',
        addNew:'scripts/commety/templates/member-add.html',
        loanform:'scripts/commety/templates/loan.html',
        insuranceform:'scripts/commety/templates/insurance.html',
        setting:'scripts/commety/templates/setting-app.html'
    };

    function stateProvider($routeProvider , $locationProvider) {
        'use strict';
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        //Application Routes
        $routeProvider
            .when('/login', { templateUrl: _path['login'], controller:'authController'})
            .when('/register', { templateUrl: _path['register'], controller:'authController'})
            .when('/recover', { templateUrl: _path['recover'], controller:'authController'})
            .when('/lock', { templateUrl: _path['lock'], controller:'authController'})
            .when('/404', { templateUrl: _path['404'], controller:'authController'})
            .when('/commety', { templateUrl: _path['commety'], controller:'commetyController'})
            .when('/addNew', { templateUrl: _path['addNew'], controller:'commetyController'})
            .when('/loanform', { templateUrl: _path['loanform'], controller:'commetyController'})
            .when('/insuranceform', { templateUrl: _path['insuranceform'], controller:'commetyController'})
            .when('/setting', { templateUrl: _path['setting'], controller:'commetyController'})
            .otherwise('/login')
    };

    function authController($scope, $rootScope, $http, $location) {
        $scope.initLoginForm = function() {
            $scope.form = {
                email: 'me.ashish005@gmail.com',
                password: '123456'
            }
        };
        $scope.initRegisterForm = function() {
            $scope.form = {
                name: 'Ashish Chaturvedi',
                mobile:'9873210774',
                email: 'me.ashish005@gmail.com',
                password: '123456',
                confPassword: "123456",
                isAgreed: true
            }
        };
        $scope.submitRegisterForm = function() {
            console.log("posting data....");
            /*var _req = {method: 'POST', url: 'api/core/signup', data: $scope.form};
            ajaxRequest(_req, function(data, status, headers, config) {
                // this callback will be called asynchronously when the response is available.
                $location.path('/login');
            }, function(data, status, headers, config) {
                // this callback will be called asynchronously when the response is available.
            });*/
        };
        $scope.submitLoginForm = function() {
            var _req = {method: 'POST', url: 'api/core/signin', data: $scope.form};
            /*ajaxRequest(_req, function(data, status, headers, config) {
                authenticationFactory.setInfo(data['data']);
                window.location.href = "shop-all";
                //$location.path('/shop-all');// this callback will be called asynchronously when the response is available.
            }, function(data, status, headers, config) {
                console.log('error: ', data );// this callback will be called asynchronously when the response is available.
            });*/
        };
        /*function ajaxRequest(request ,successCallback, errorCallback){
            $http(request).success(successCallback).error(errorCallback);
        }*/
    }



    function commetyController($scope, $rootScope, commetyService, $location) {
        function gridInitSettings(){
            $scope.filterOptions = {
                filterText: "",
                useExternalFilter: false
            };
            $scope.totalServerItems = 0;
            $scope.pagingOptions = {
                pageSizes:   [250, 500, 1000],  // page size options
                pageSize:    250,              // default page size
                currentPage: 1                 // initial page
            };
            $scope.gridOptions = {
                data: 'myData',
                enablePaging:     true,
                showFooter:       true,
                plugins: [new pluginNgGridCVSExport()],
                rowHeight:        36,
                headerRowHeight:  38,
                totalServerItems: 'totalServerItems',
                showGroupPanel: true,
                enablePinning: true,
                enableColumnResize: true,
                enableColumnReordering: true,
                showColumnMenu: true,
                showFilter: true,
                pagingOptions:$scope.pagingOptions,
                filterOptions:$scope.filterOptions
            };

             /*$scope.setPagingData = function(data, page, pageSize){
             // calc for pager
             var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
             // Store data from server
             $scope.myData = pagedData;
             // Update server side data length
             $scope.totalServerItems = data.length;

             if (!$scope.$$phase) {
             $scope.$apply();
             }

             };
             $scope.getPagedDataAsync = function (pageSize, page, searchText) {
             var ngGridResourcePath = 'server/ng-grid-data.json';

             $timeout(function () {

             if (searchText) {
             var ft = searchText.toLowerCase();
             $http.get(ngGridResourcePath).success(function (largeLoad) {
             var data = largeLoad.filter(function(item) {
             return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
             });
             $scope.setPagingData(data,page,pageSize);
             });
             } else {
             $http.get(ngGridResourcePath).success(function (largeLoad) {
             $scope.setPagingData(largeLoad,page,pageSize);
             });
             }
             }, 100);
             };


             $scope.$watch('pagingOptions', function (newVal, oldVal) {
             if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
             $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
             }
             }, true);
             $scope.$watch('filterOptions', function (newVal, oldVal) {
             if (newVal !== oldVal) {
             $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
             }
             }, true);

             $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);*/
        }

        $scope.init = function (key){
            gridInitSettings();
            commetyService[key].getInfo().then(function(resp){
                $scope.myData = resp;
            }, function(){});
        };

        $scope.insuranceType = {
            maxBhupa:{ type:'maxBhupa'},
            maxLife:{type:'maxLife'}
        };
        /*$scope.insuranceForm = function (){
            gridInitSettings();
            commetyService.getInsuranceInfo().then(function(resp){
                var obj = JSON.parse(resp);
                if(obj){
                    $scope.myData = obj;
                };
            }, function(){});
        };*/

        $scope.SubmitForm = function (form, data, key){
            if(form.$valid) {
                if($scope.myData){
                    $scope.myData = [];
                }
                commetyService[key].create(data).then(function (resp) {
                    if('insurance' ==key || 'loan' == key || 'commety' == key){
                        $scope.myData.push(resp);
                    }else if('group' ==key){
                        var result = $scope.myData.filter(function (v) {
                            return v.id === Number(data['parent']); // filter out appropriate one
                        });
                        if (resp.parent == 0) {
                            $scope.myData.push(resp);
                        } else {
                            result[0]['child'].push(resp);
                        }
                    }
                }, function (error) {});
            }
        };

        function pluginNgGridCVSExport(options) {

            var self = this;

            self.grid = null;

            self.scope = null;

            self.init = function (scope, grid, services) {
                self.grid = grid;
                self.scope = scope;
                function showCVSExportDownloadLink() {

                    var keyCollections = [];

                    for (var grd in grid.config.columnDefs) {

                        keyCollections.push(grid.config.columnDefs[grd].field);

                    }


                    var csvFileDatas = '';

                    function StringifyCSVData(strKey) {

                        if (strKey == null) { // we want to catch anything null-ish, hence just == not ===

                            return '';

                        }

                        if (typeof (strKey) === 'number') {

                            return '' + strKey;

                        }

                        if (typeof (strKey) === 'boolean') {

                            return (strKey ? 'TRUE' : 'FALSE');

                        }

                        if (typeof (strKey) === 'string') {

                            return strKey.replace(/"/g, '""');

                        }

                        return JSON.stringify(strKey).replace(/"/g, '""');

                    }


                    function swapLastCommaForNewline(strKey) {

                        var newStr = strKey.substr(0, strKey.length - 1);

                        return newStr + "\n";

                    }


                    for (var k in keyCollections) {

                        csvFileDatas += '"' + StringifyCSVData(keyCollections[k]) + '",';

                    }


                    csvFileDatas = swapLastCommaForNewline(csvFileDatas);


                    var getGridData = grid.data;

                    for (var gridRow in getGridData) {

                        for (k in keyCollections) {

                            var currentReowCell;

                            if (options != null && options.columnOverrides != null && options.columnOverrides[keyCollections[k]] != null) {

                                currentReowCell = options.columnOverrides[keyCollections[k]](getGridData[gridRow][keyCollections[k]]);

                            }

                            else {

                                currentReowCell = getGridData[gridRow][keyCollections[k]];

                            }

                            csvFileDatas += '"' + StringifyCSVData(currentReowCell) + '",';

                        }

                        csvFileDatas = swapLastCommaForNewline(csvFileDatas);

                    }


                    var footerPanel = grid.$root.find(".ngFooterPanel");
                    var csvFooterPanelLink = grid.$root.find('.ngFooterPanel .csv-data-link-span');
                    if (csvFooterPanelLink != null) {
                        csvFooterPanelLink.remove();
                    }

                    var csvHTMLTemplateLink = "<span class=\"csv-data-link-span\">";
                    csvHTMLTemplateLink += "<a href=\"data:text/csv;charset=UTF-8,";
                    csvHTMLTemplateLink += encodeURIComponent(csvFileDatas);
                    csvHTMLTemplateLink += "\" download=\"Export-from-Grid.csv\">Export - CSV file</a></br></span>";
                    /*window.document.getElementById("ExportToCSV").append(csvHTMLTemplateLink);*/
                    var CSVElem = $(window.document.getElementById("ExportToCSV"));
                    if(CSVElem.find(".csv-data-link-span").length==1) {
                        CSVElem.find(".csv-data-link-span").remove();
                    }
                    if(CSVElem.find(".csv-data-link-span").length==0) {
                        CSVElem.append(csvHTMLTemplateLink);
                    }
                    footerPanel.append(csvHTMLTemplateLink);
                }
                setTimeout(showCVSExportDownloadLink, 0);
                scope.cvsRenderRowsKeys = function () {

                    var hashVal = '';

                    for (var index in scope.RowsIndex) {

                        hashVal += scope.RowsIndex[index].$$hashKey;

                    }

                    return hashVal;

                };
                scope.$watch('cvsRenderRowsKeys()', showCVSExportDownloadLink);
            };
        }
    }

    function commetyService($http, $q, baseUrl) {
        function ajaxRequest(request){
            var deferred = $q.defer();
            $http(request).success(function (response) {
                deferred.resolve(response);
            }).error(function (xhr, status, error, exception) {
                deferred.reject(xhr);
            });
            return deferred.promise;
        }

        var commetySvc = {};
        commetySvc.group = {
            getInfo : function(_req){
                var _req = {method: 'GET', url: baseUrl +'group'};
                return  ajaxRequest(_req);
            },
            create : function(data){
                var _req = {method: 'POST', url: baseUrl +'group', data:JSON.stringify(data)};
                return  ajaxRequest(_req);
            },
            delete : function(_req){
                var _req = {method: 'DELETE', url: baseUrl +'group'};
                return  ajaxRequest(_req);
            },
            change : function(_req){
                var _req = {method: 'PUT', url: baseUrl +'group'};
                return  ajaxRequest(_req);
            }
        }
        commetySvc.commety = {
            getInfo : function(_req){
                var _req = {method: 'GET', url: baseUrl +'commety'};
                return  ajaxRequest(_req);
            },
            create : function(data){
                var _req = {method: 'POST', url: baseUrl +'commety', data:JSON.stringify(data)};
                return  ajaxRequest(_req);
            },
            delete : function(_req){
                var _req = {method: 'DELETE', url: baseUrl +'commety'};
                return  ajaxRequest(_req);
            },
            change : function(_req){
                var _req = {method: 'PUT', url: baseUrl +'commety'};
                return  ajaxRequest(_req);
            }
        }
        commetySvc.insurance = {
            getInfo : function(_req){
                var _req = {method: 'GET', url: baseUrl +'insurance'};
                return  ajaxRequest(_req);
            },
            create : function(data){
                var _req = {method: 'POST', url: baseUrl +'insurance', data:JSON.stringify(data)};
                return  ajaxRequest(_req);
            },
            delete : function(_req){
                var _req = {method: 'DELETE', url: baseUrl +'insurance'};
                return  ajaxRequest(_req);
            },
            change : function(_req, successCallback, errorCallback){
                var _req = {method: 'PUT', url: baseUrl +'insurance'};
                return  ajaxRequest(_req);
            }
        }
        commetySvc.loan = {
            getInfo : function(_req){
                var _req = {method: 'GET', url: baseUrl +'loan'};
                return  ajaxRequest(_req);
            },
            create : function(data){
                var _req = {method: 'POST', url: baseUrl +'loan', data:JSON.stringify(data)};
                return  ajaxRequest(_req);
            },
            delete : function(_req){
                var _req = {method: 'DELETE', url: baseUrl +'loan'};
                return  ajaxRequest(_req);
            },
            change : function(_req, successCallback, errorCallback){
                var _req = {method: 'PUT', url: baseUrl +'loan'};
                return  ajaxRequest(_req);
            }
        }
        return commetySvc;
    }

    function httpProvider($httpProvider) {
        //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common["Accept"] = "*/*";
        $httpProvider.defaults.cache = false;
        $httpProvider.defaults.timeout = 600000;
    }

    function commetyHeader() {
        return {
            restrict: 'AE',
            templateUrl: 'scripts/core/templates/header.html',
        }
    }

    app
        .config(['$routeProvider', '$locationProvider', stateProvider])
        .config(['$httpProvider', httpProvider])
        .controller('authController', ['$scope', '$rootScope', '$http', '$location', authController])
        .directive('commetyHeader', commetyHeader)
        .controller('commetyController', ['$scope', '$rootScope', 'commetyService', '$location', commetyController])
        .service('commetyService', ['$http', '$q', 'baseUrl', commetyService])

    angular.element(document).ready(function () {
        var initInjector = angular.injector(["ng"]);
        var $http = initInjector.get("$http");
        $http({method: 'GET', url: 'config.json'}).then(function (resp)
        {
            app.constant('baseUrl', resp['data']['baseUrl']);
            $('<div ng-view class="wrapper"></div>').appendTo('body');
            return angular.bootstrap($('body'), [appName]);
        },
        function (error) {
            throw new Error('Config file has error : ' + error);
        });
    });
})();
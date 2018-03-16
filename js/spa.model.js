/*
 * module_template.js
 * Template for browser feature modules
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */
/*global $, spa */
spa.model = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {},
        user,
        initModule;

    user = (function () {


    }());



//----------------- END MODULE SCOPE VARIABLES ---------------

//------------------- BEGIN PUBLIC METHODS -------------------

    initModule = function ($container) {
        stateMap.$container = $container;

        return true;
    };


    return {
        initModule: initModule,

    };
//------------------- END PUBLIC METHODS ---------------------
}());
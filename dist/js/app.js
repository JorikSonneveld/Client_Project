'use strict';

/*
 * spa.js
 * Root namespace module
 */

/*jslint           browser : true,   continue : true,
 devel  : true,    indent : 2,       maxerr  : 50,
 newcap : true,     nomen : true,   plusplus : true,
 regexp : true,    sloppy : true,       vars : false,
 white  : true
 */
/*global $, spa */

var spa = function () {
    'use strict';

    var initModule = function initModule($container) {
        spa.template.initModule(window.spa_templates.templates);
        spa.shell.initModule($container);
        spa.router.initModule($container);
    };

    return { initModule: initModule };
}();
'use strict';

/*
 * spa.util.js
 * General JavaScript utilities
 *
 * Michael S. Mikowski - mmikowski at gmail dot com
 * These are routines I have created, compiled, and updated
 * since 1998, with inspiration from around the web.
 *
 * MIT License
 *
*/

/*jslint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true
*/
/*global $, spa */

spa.util = function () {
  var makeError, _fetchFromObject, setConfigMap;

  _fetchFromObject = function fetchFromObject(obj, prop) {

    if (typeof obj === 'undefined') {
      return false;
    }

    var _index = prop.indexOf('.');
    if (_index > -1) {
      return _fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return obj[prop];
  };

  // Begin Public constructor /makeError/
  // Purpose: a convenience wrapper to create an error object
  // Arguments:
  //   * name_text - the error name
  //   * msg_text  - long error message
  //   * data      - optional data attached to error object
  // Returns  : newly constructed error object
  // Throws   : none
  //
  makeError = function makeError(name_text, msg_text, data) {
    var error = new Error();
    error.name = name_text;
    error.message = msg_text;

    if (data) {
      error.data = data;
    }

    return error;
  };
  // End Public constructor /makeError/

  // Begin Public method /setConfigMap/
  // Purpose: Common code to set configs in feature modules
  // Arguments:
  //   * input_map    - map of key-values to set in config
  //   * settable_map - map of allowable keys to set
  //   * config_map   - map to apply settings to
  // Returns: true
  // Throws : Exception if input key not allowed
  //
  setConfigMap = function setConfigMap(arg_map) {
    var input_map = arg_map.input_map,
        settable_map = arg_map.settable_map,
        config_map = arg_map.config_map,
        key_name,
        error;

    for (key_name in input_map) {
      if (input_map.hasOwnProperty(key_name)) {
        if (settable_map.hasOwnProperty(key_name)) {
          config_map[key_name] = input_map[key_name];
        } else {
          error = makeError('Bad Input', 'Setting config key |' + key_name + '| is not supported');
          throw error;
        }
      }
    }
  };
  // End Public method /setConfigMap/

  return {
    makeError: makeError,
    setConfigMap: setConfigMap,
    fetchFromObject: _fetchFromObject
  };
}();
'use strict';

/**
 * spa.util_b.js
 * JavaScript browser utilities
 *
 * Compiled by Michael S. Mikowski
 * These are routines I have created and updated
 * since 1998, with inspiration from around the web.
 * MIT License
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, spa, getComputedStyle */

spa.util_b = function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------

  var configMap = {
    regex_encode_html: /[&"'><]/g,
    regex_encode_noamp: /["'><]/g,
    html_encode_map: {
      '&': '&#38;',
      '"': '&#34;',
      "'": '&#39;',
      '>': '&#62;',
      '<': '&#60;'
    }
  },
      decodeHtml,
      encodeHtml,
      getEmSize,
      decodeArrayFromURIString;

  configMap.encode_noamp_map = $.extend({}, configMap.html_encode_map);
  delete configMap.encode_noamp_map['&'];
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // Begin decodeHtml
  // Decodes HTML entities in a browser-friendly way
  // See http://stackoverflow.com/questions/1912501/\
  //   unescape-html-entities-in-javascript
  //
  decodeHtml = function decodeHtml(str) {
    return $('<div/>').html(str || '').text();
  };
  // End decodeHtml


  // Begin encodeHtml
  // This is single pass encoder for html entities and handles
  // an arbitrary number of characters
  //
  encodeHtml = function encodeHtml(input_arg_str, exclude_amp) {
    var input_str = String(input_arg_str),
        regex,
        lookup_map;

    if (exclude_amp) {
      lookup_map = configMap.encode_noamp_map;
      regex = configMap.regex_encode_noamp;
    } else {
      lookup_map = configMap.html_encode_map;
      regex = configMap.regex_encode_html;
    }
    return input_str.replace(regex, function (match, name) {
      return lookup_map[match] || '';
    });
  };
  // End encodeHtml

  // Begin getEmSize
  // returns size of ems in pixels
  //
  getEmSize = function getEmSize(elem) {
    return Number(getComputedStyle(elem, '').fontSize.match(/\d*\.?\d*/)[0]);
  };
  // End getEmSize

  // Begin decodeArrayToURIComponent
  decodeArrayFromURIString = function decodeArrayFromURIString(uriString) {
    var result_array = [],
        parsed_uri_string,
        parsed_uri_string_keys;

    parsed_uri_string = JSON.parse('{"' + decodeURI(uriString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\s/g, '') + '"}');
    parsed_uri_string_keys = Object.keys(parsed_uri_string); // ["cart[0][id]"]
    for (var i = 0; i < parsed_uri_string_keys.length; i++) {
      var _key, _index, _value;
      _index = parseInt(parsed_uri_string_keys[i].split('[')[1].slice(0, -1));
      _key = parsed_uri_string_keys[i].split('][')[1].slice(0, -1);
      _value = parsed_uri_string[parsed_uri_string_keys[i]];
      if (result_array.length === 0 || result_array.length <= _index) {
        result_array.push({});
      }

      result_array[_index][_key] = _value;
    }
    return result_array;
  };
  // End encodeArrayToURIComponent

  // export methods
  return {
    decodeHtml: decodeHtml,
    encodeHtml: encodeHtml,
    getEmSize: getEmSize,
    decodeArrayFromURIString: decodeArrayFromURIString
  };
  //------------------- END PUBLIC METHODS ---------------------
}();
'use strict';

/*
 * router.js
 * Router module for interfacing between spa and page.js library.
 *
 * Requires pagejs. Pagejs fires the related callback when a route has been activated.
 * If no callback has been provided the router takes the default callback.
 *
 *
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */
/*global $, spa, page */
spa.router = function () {
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {
        settable_map: {}
    },
        stateMap = { $container: null },
        jqueryMap = {},
        setJqueryMap,

    //showLoginPage,
    showHomepage,
        configModule,
        initModule;
    //----------------- END MODULE SCOPE VARIABLES ---------------


    //------------------- BEGIN UTILITY METHODS ------------------
    // example : getTrimmedString
    //-------------------- END UTILITY METHODS -------------------


    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function setJqueryMap() {
        var $container = stateMap.$container;
        jqueryMap = {
            $page_container: $container.find('.spa-shell-main-content')
        };
    };

    // showLoginPage = function(){
    //     debugger;
    //     console.log('show login page...');
    //     var html = spa.template.parseTemplate('features.login.login', {});
    //     jqueryMap.$page_container.html(html);
    //     // console.log('verwachte exceptie:');
    //     // console.log("vendor.js:4266 Uncaught DOMException: Failed to execute 'pushState' on 'History': A history state object with URL...");
    //
    // };

    showHomepage = function showHomepage() {
        console.log('homepage');
        var html = spa.template.parseTemplate('features.homepage.homepage', {});
        jqueryMap.$page_container.html(html);
    };

    // End DOM method /setJqueryMap/
    //---------------------- END DOM METHODS ---------------------


    //------------------- BEGIN EVENT HANDLERS -------------------
    // example: onClickButton = ...
    //-------------------- END EVENT HANDLERS --------------------


    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /configModule/
    // Purpose : Adjust configuration of allowed keys
    // Arguments : A map of settable keys and values
    // * color_name - color to use
    // Settings :
    // * configMap.settable_map declares allowed keys
    // Returns : true
    // Throws : none
    //
    configModule = function configModule(input_map) {
        spa.butil.setConfigMap({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        });
        return true;
    };
    // End public method /configModule/
    // Begin public method /initModule/
    // Purpose : Initializes module
    // Arguments :
    // * $container the jquery element used by this feature
    // Returns : true
    // Throws : nonaccidental
    //
    initModule = function initModule($container) {
        stateMap.$container = $container;
        setJqueryMap();

        // the "notfound" implements a catch-all
        // with page('*', notfound). Here we have
        // no catch-all, so page.js will redirect
        // to the location of paths which do not
        // match any of the following routes
        // var baseUrl = 'file:///C:/Users/EB0095856/Documents/Projecten/client_upgrade/labs/spa_routing_templating/dist/index.html';
        page.base('');
        page('/', showHomepage);
        page('/index.html', showHomepage);
        page();

        return true;
    };

    // End public method /initModule/
    // return public methods
    return {
        configModule: configModule,
        initModule: initModule
    };
    //------------------- END PUBLIC METHODS ---------------------
}();
'use strict';

/*
 * spa.shell.js
 * Shell module for SPA
 * master controller for our SPA
 */

/*jslint         browser : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global $, spa */

spa.shell = function () {
    'use strict';

    //---------------- BEGIN MODULE SCOPE VARIABLES --------------

    var configMap = {},
        stateMap = {
        $container: undefined
    },
        jqueryMap = {},
        setJqueryMap,
        initModule;
    //----------------- END MODULE SCOPE VARIABLES ---------------


    //------------------- BEGIN UTILITY METHODS ------------------
    //....
    //-------------------- END UTILITY METHODS -------------------


    //--------------------- BEGIN DOM METHODS --------------------
    setJqueryMap = function setJqueryMap() {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $nav: $container.find('.spa-shell-main-nav')
        };
    };
    // End DOM method /setJqueryMap/


    //--------------------- END DOM METHODS ----------------------

    //------------------- BEGIN PUBLIC METHODS -------------------
    initModule = function initModule($container) {
        stateMap.$container = $container;
    };

    return {
        initModule: initModule
    };
    //------------------- END PUBLIC METHODS ---------------------
}();
"use strict";

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
spa.template = function () {
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {
        settable_map: { template_collection: true }
    },
        stateMap = { template_collection: null },
        getTemplate,
        parseTemplate,
        configModule,
        initModule;
    //----------------- END MODULE SCOPE VARIABLES ---------------

    //------------------- BEGIN PUBLIC METHODS -------------------

    // Arguments: A string divided by dots.
    getTemplate = function getTemplate(template_path) {
        return spa.util.fetchFromObject(stateMap.template_collection, template_path);
    };

    // Arguments: A string and Object
    //  * String, path divided by dots.
    //  * Object, data which will be parsed.
    // Returns: String with html.
    parseTemplate = function parseTemplate(template_path, data) {
        debugger;

        var template_func = spa.util.fetchFromObject(stateMap.template_collection, template_path);
        return template_func(data);
    };

    // Begin public method /configModule/
    configModule = function configModule(input_map) {
        spa.butil.setConfigMap({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        });
        return true;
    };
    // End public method /configModule/

    // Begin public method /initModule/
    //
    initModule = function initModule(template_collection) {
        stateMap.template_collection = template_collection;
        return true;
    };
    // End public method /initModule/
    // return public methods
    return {
        configModule: configModule,
        initModule: initModule,
        getTemplate: getTemplate,
        parseTemplate: parseTemplate
    };
    //------------------- END PUBLIC METHODS ---------------------
}();
"use strict";

function Responsive() {
    var x = document.getElementById("NavBar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}
'use strict';

$(function () {
    var url = null;
    notificatieModule.init(url);
});

var notificatieModule = function ($) {

    var init, configMap, getNotifications, startInterval, stopInterval, _interval;

    configMap = {
        url: null
    };

    startInterval = function startInterval(time) {
        if (Number.isInteger(time)) {
            _interval = setInterval(getNotifications, time);
        } else {
            console.log('Please fill in a number');
        }
    };

    stopInterval = function stopInterval() {
        clearInterval(_interval);
    };

    getNotifications = function getNotifications() {
        if (configMap.url) {
            return $.getJSON(configMap.url);
        } else {
            return new Promise(function (resolve, reject) {
                var fakeNotifications = [{ message: 'Not yet implemented', options: { kleur: "red" } }];
                resolve(fakeNotifications);
            }).then(function (result) {
                feedbackWidget.receiveNotifications(result);
            }).catch(function (error) {
                console.log(error);
            });
        }
    };

    init = function init(url) {
        configMap.url = url;
        getNotifications();
        startInterval(5000);
    };

    return {
        init: init,
        startInterval: startInterval,
        stopInterval: stopInterval
    };
}(jQuery);
'use strict';

$(function () {
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 3000);
});
'use strict';

$(function () {
    feedbackWidget.init('#navbar-cars', '#message-exit');
});

var feedbackWidget = function ($) {

    var init, configMap, start, stop, receiveNotifications, _saveNotificatie;

    configMap = {
        notifications: null
    };

    receiveNotifications = function receiveNotifications(result) {
        configMap.notifications = result;
    };

    stop = function stop() {
        $('#message').fadeOut();
    };

    start = function start(message, options) {

        var notificatie = { message: message, options: options };

        if (notificatie) {
            if (notificatie.message) {
                $('#message-content').html(notificatie.message);
            } else {
                $('#message-content').html('');
            }
            if (notificatie.options) {
                if (notificatie.options.messageKleur) {
                    $('#message-content').css('color', notificatie.options.messageKleur);
                } else {
                    $('#message-content').css('color', 'black');
                }
                if (notificatie.options.kleur) {
                    $('.message-background').css('background-color', notificatie.options.kleur);
                } else {
                    $('.message-background').css('background-color', "gray");
                }
                if (notificatie.options.knop) {
                    $("#message-button").css('display', "block");
                    if (notificatie.options.knop.kleur) {
                        $("#message-button").css('background-color', notificatie.options.knop.kleur);
                    } else {
                        $("#message-button").css('background-color', "white");
                    }
                    if (notificatie.options.knop.tekst) {
                        $("#message-button").html(notificatie.options.knop.tekst);
                    } else {
                        $("#message-button").html('');
                    }
                    if (notificatie.options.knop.href) {
                        $("a[href]").attr('href', notificatie.options.knop.href);
                    } else {
                        $("a[href]").attr('href', '');
                    }
                } else {
                    $("#message-button").css('display', "none");
                }
            }
        }
        _saveNotificatie(notificatie);
        $('#message').fadeIn();
    };

    _saveNotificatie = function _saveNotificatie(notificatie) {
        if (localStorage.length !== 0) {
            var temp = JSON.parse(localStorage.getItem('notificaties'));
            if (temp.length >= 10) {
                temp.pop();
            }
            temp.unshift(notificatie);
            localStorage.removeItem('notificaties');
            localStorage.setItem('notificaties', JSON.stringify(temp));
        } else {
            localStorage.setItem('notificaties', JSON.stringify([notificatie]));
        }
    };

    init = function init(id, exitId) {
        $(id).on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            //var number = Math.round(Math.random()*2);
            start(configMap.notifications[0].message, configMap.notifications[0].options);
        });
        $(exitId).on('click', function (e) {
            e.stopPropagation();
            feedbackWidget.stop();
        });
    };

    return {
        start: start,
        stop: stop,
        receiveNotifications: receiveNotifications,
        init: init
    };
}(jQuery);
"use strict";
"use strict";

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
spa.model = function () {
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {},
        user,
        initModule;

    user = function () {}();

    //----------------- END MODULE SCOPE VARIABLES ---------------

    //------------------- BEGIN PUBLIC METHODS -------------------

    initModule = function initModule($container) {
        stateMap.$container = $container;

        return true;
    };

    return {
        initModule: initModule

    };
    //------------------- END PUBLIC METHODS ---------------------
}();
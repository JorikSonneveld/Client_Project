$(function () {
    var url = null;
    notificatieModule.init(url);
});

var notificatieModule = (function($){

    var init, configMap, getNotifications, startInterval, stopInterval, _interval;

    configMap = {
        url: null
    };

    startInterval = function(time){
        if(Number.isInteger(time)){
            _interval = setInterval(getNotifications, time);
        } else {
            console.log('Please fill in a number');
        }
    };

    stopInterval = function(){
        clearInterval(_interval);
    };

    getNotifications = function(){
        if(configMap.url){
            return $.getJSON(configMap.url);
        } else {
            return new Promise(function (resolve, reject) {
                var fakeNotifications = [
                    {message: 'Not yet implemented', options: {kleur:"red"                                                                            }},
                    // {message: 'Succes',             options: {kleur:"green", knop:{tekst:"klik niet", kleur:"gray", href:"http://www.youtube.com" }}},
                    // {message: 'information',        options: {kleur:"blue"                                                                         }}
                ];
                resolve(fakeNotifications)
            })
                .then(function (result) {
                    feedbackWidget.receiveNotifications(result);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    };

    init = function(url){
        configMap.url = url;
        getNotifications();
        startInterval(5000);
    };

    return {
        init: init,
        startInterval: startInterval,
        stopInterval: stopInterval
    }
}(jQuery));

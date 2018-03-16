$(function () {
    feedbackWidget.init('#navbar-cars', '#message-exit');
});

var feedbackWidget = (function ($) {

    var init, configMap, start, stop, receiveNotifications, _saveNotificatie;

    configMap = {
        notifications: null
    };

    receiveNotifications = function(result){
        configMap.notifications = result;
    };

    stop = function(){
        $('#message').fadeOut();
    };

    start = function(message, options){

        var notificatie = {message, options};

        if(notificatie) {
            if (notificatie.message) {
                $('#message-content').html(notificatie.message);
            }else{
                $('#message-content').html('');
            }
            if (notificatie.options) {
                if (notificatie.options.messageKleur) {
                    $('#message-content').css('color', notificatie.options.messageKleur);
                }else{
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
                    if(notificatie.options.knop.href){
                        $("a[href]").attr('href', notificatie.options.knop.href);
                    }else{
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
    
    _saveNotificatie = function (notificatie) {
        if(localStorage.length !== 0){
            var temp = JSON.parse(localStorage.getItem('notificaties'));
            if(temp.length >= 10){
                temp.pop();
            }
            temp.unshift(notificatie);
            localStorage.removeItem('notificaties');
            localStorage.setItem('notificaties', JSON.stringify(temp));
        }else{
            localStorage.setItem('notificaties', JSON.stringify([notificatie]));
        }
    };

    init = function (id, exitId) {
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

    return{
        start: start,
        stop: stop,
        receiveNotifications: receiveNotifications,
        init: init
    };
})(jQuery);

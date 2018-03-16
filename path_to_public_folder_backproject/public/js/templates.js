this["spa_templates"] = this["spa_templates"] || {};
this["spa_templates"]["templates"] = this["spa_templates"]["templates"] || {};
this["spa_templates"]["templates"]["features"] = this["spa_templates"]["templates"]["features"] || {};
this["spa_templates"]["templates"]["features"]["homepage"] = this["spa_templates"]["templates"]["features"]["homepage"] || {};
this["spa_templates"]["templates"]["features"]["homepage"]["homepage"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<!doctype html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"utf-8\">\r\n    <title>GTA V News</title>\r\n\r\n    <link rel=\"stylesheet\" href=\"css/style.min.css\">\r\n\r\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js\"></script>\r\n    <script src=\"js/app.js\"></script>\r\n    <script src=\"js/vendor.js\"></script>\r\n    <script src=\"js/templates.js\"></script>\r\n\r\n    <script>\r\n        $(function () {\r\n            spa.initModule($('#spa'));\r\n        });\r\n    </script>\r\n</head>\r\n\r\n<body>\r\n<div id=\"loader-wrapper\">\r\n    <img src=\"images/wheel1.png\" alt=\"Logo\" id=\"loader\">\r\n\r\n    <!--Stap 1-->\r\n    <div class=\"loader-section section-left\"></div>\r\n    <div class=\"loader-section section-right\"></div>\r\n</div>\r\n<!--NavBar-->\r\n<nav class=\"navbar\" id=\"NavBar\">\r\n    <a href=\"/\" class=\"active\">Home</a>\r\n    <a href=\"\" id=\"navbar-cars\">Cars</a>\r\n    <a href=\"\">Laptimes</a>\r\n    <a href=\"\">About</a>\r\n    <a href=\"\">Contact</a>\r\n    <a href=\"javascript:void(0);\" class=\"icon\" onclick=\"Responsive()\">&#9776;</a>\r\n</nav>\r\n<!--End NavBar-->\r\n<header class=\"bg\"></header>\r\n<div id=\"spa\">\r\n    <article id=\"message\">\r\n        <div class=\"message-background\">\r\n            <p id=\"message-exit\"><b>&times;</b></p>\r\n            <section class=\"message-content\">\r\n                <p id=\"message-content\"></p>\r\n            </section>\r\n            <section class=\"message-button\">\r\n                <a href=\"\" id=\"message-button-link\">\r\n                    <button id=\"message-button\">Text</button>\r\n                </a>\r\n            </section>\r\n        </div>\r\n    </article>\r\n\r\n    <section class=\"articles\">\r\n        <article class=\"article-newest-car\">\r\n            <header class=\"article-header\">\r\n                <h1>Newest Car:</h1>\r\n            </header>\r\n            <section class=\"article-section\">\r\n                <h2>Übermacht Revolter</h2>\r\n                <section class=\"article-car-img\">\r\n                    <img src=\"images/Revolter.png\" alt=\"Logo\" id=\"article-car\">\r\n                    <section class=\"article-car-stats\">\r\n                        <h3>Price: $138.455.000</h3>\r\n                        <h3>Car Class: Sports</h3>\r\n                        <h3>Laptime: 1:04.198</h3>\r\n                    </section>\r\n                </section>\r\n                <p>The Übermacht Revolter is a luxury 4-door sports sedan featured in Grand Theft Auto Online as\r\n                    part of the\r\n                    continuation of the Doomsday Heist update. It is based on the Cadillac Escala Concept and the\r\n                    BMW 7\r\n                    Series Concept, with headlights that appears to be from the Audi TT Mk3. The interior appears to\r\n                    be the\r\n                    same as the Nero, obviously altered to fit into the sedan layout.\r\n                <p>\r\n            </section>\r\n        </article>\r\n\r\n        <article class=\"article-fastest-car\">\r\n            <header class=\"article-header\">\r\n                <h1>Newest Car:</h1>\r\n            </header>\r\n            <section class=\"article-section\">\r\n                <h2>Übermacht Revolter</h2>\r\n                <section class=\"article-car-img\">\r\n                    <img src=\"images/Revolter.png\" alt=\"Logo\" id=\"article-car\">\r\n                    <section class=\"article-car-stats\">\r\n                        <h3>Price: $138.455.000</h3>\r\n                        <h3>Car Class: Sports</h3>\r\n                        <h3>Laptime: 1:04.198</h3>\r\n                    </section>\r\n                </section>\r\n                <p>The Übermacht Revolter is a luxury 4-door sports sedan featured in Grand Theft Auto Online as\r\n                    part of the\r\n                    continuation of the Doomsday Heist update. It is based on the Cadillac Escala Concept and the\r\n                    BMW 7\r\n                    Series Concept, with headlights that appears to be from the Audi TT Mk3. The interior appears to\r\n                    be the\r\n                    same as the Nero, obviously altered to fit into the sedan layout.\r\n                <p>\r\n            </section>\r\n        </article>\r\n\r\n        <article class=\"article-car-of-the-day\">\r\n            <header class=\"article-header\">\r\n                <h1>Newest Car:</h1>\r\n            </header>\r\n            <section class=\"article-section\">\r\n                <h2>Übermacht Revolter</h2>\r\n                <section class=\"article-car-img\">\r\n                    <img src=\"images/Revolter.png\" alt=\"Logo\" id=\"article-car\">\r\n                    <section class=\"article-car-stats\">\r\n                        <h3>Price: $138.455.000</h3>\r\n                        <h3>Car Class: Sports</h3>\r\n                        <h3>Laptime: 1:04.198</h3>\r\n                    </section>\r\n                </section>\r\n                <p>The Übermacht Revolter is a luxury 4-door sports sedan featured in Grand Theft Auto Online as\r\n                    part of the\r\n                    continuation of the Doomsday Heist update. It is based on the Cadillac Escala Concept and the\r\n                    BMW 7\r\n                    Series Concept, with headlights that appears to be from the Audi TT Mk3. The interior appears to\r\n                    be the\r\n                    same as the Nero, obviously altered to fit into the sedan layout.\r\n                <p>\r\n            </section>\r\n        </article>\r\n    </section>\r\n</div>\r\n\r\n</body>\r\n</html>";
},"useData":true});
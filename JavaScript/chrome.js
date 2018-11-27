//lil chrome extension experiment to load libraries to the console (jQuery.js, KO.js)
function All() {
    if (window.log == undefined)
        window.log = function (text) { console.log(text) };
    else console.log("'log' is already defined.");

    if (window.$$ == undefined)
        window.$$ = (function () {
            return {
                jQuery: 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
                KO: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min.js',
                addScript: function (url) {
                    if (typeof url != 'string')
                        return "Invalid url.";
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = url;
                    document.head.appendChild(script);
                }
            }
        })();
    else console.log("'$$' is already defined.");
}

document.head.appendChild(document.createElement('script').appendChild(document.createTextNode('(' + All + ')();')).parentNode);

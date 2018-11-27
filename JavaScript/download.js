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

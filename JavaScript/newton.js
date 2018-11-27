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
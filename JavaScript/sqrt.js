//sqrt with recursive anonymous functions:

//with a starting guess and precision (number of attempts, the higher the better)
var sqrt = value => start => precision => ((y => y(y))(f => i => v => i >= precision ? v : f(f)(i + 1)((v + value / v) * 0.5))(0)(start));

var sqrt2 = number => (x => ((y => y(y))(f => v => (a => a < 0 ? -a : a)(v * v - x) <= 0.0000000001 ? v : f(f)((v + x / v) * 0.5))(x * 0.25)))(number);

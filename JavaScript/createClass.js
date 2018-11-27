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

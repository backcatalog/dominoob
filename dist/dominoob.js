var dominoob = (function (exports) {
    'use strict';

    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            var el = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

    function addClasses(element, classes) {
        var elClasses = element.className.trim();
        var elClassesArray = elClasses ? elClasses.split(' ') : [];

        element.className = dedupe(classes.trim().split(' ').concat(elClassesArray)).join(' ');
    }

    function animationEndEvent() {
        var tempElement = document.createElement('spoink');

        var animationEnds = {
            'animation': 'animationend',
            'WebkitAnimation': 'webkitAnimationEnd',
            'MozAnimation': 'mozAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd'
        };

        for (var a in animationEnds) {
            if (typeof tempElement.style[a] !== 'undefined') return animationEnds[a];
        }
    }

    function dedupe(array) {
        return array.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
    }

    function differ(haystack, needles) {
        return haystack.filter(function (value) {
            return needles.indexOf(value) < 0;
        });
    }

    function forEach(array, callback, _this) {
        for (var i = 0; i < array.length; i++) {
            callback.call(_this, array[i], i);
        }
    }

    function getParents(element, filter) {
        if (typeof filter === 'undefined') filter = '*';

        var parents = [];

        var parent = element.parentNode;

        while (parent !== document) {
            if (parent.matches(filter)) parents.push(parent);

            parent = parent.parentNode;
        }

        return parents;
    }

    function isVisible(element) {
        return !!element && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    }

    function merge(object1, object2) {
        for (var prop in object2) {
            if (object2.hasOwnProperty(prop)) object1[prop] = object2[prop];
        }

        return object1;
    }

    function off(element, events, listener, options) {
        events.split(' ').forEach(function (event) {
            element.removeEventListener(event, listener, options);
        });
    }

    function on(element, events, listener, options) {
        events.split(' ').forEach(function (event) {
            element.addEventListener(event, listener, options);
        });
    }

    function removeClasses(element, classes) {
        var elClasses = element.className.trim();
        var elClassesArray = elClasses ? elClasses.split(' ') : [];

        element.className = differ(elClassesArray, classes.trim().split(' ')).join(' ');
    }

    function transitionEndEvent() {
        var tempElement = document.createElement('spoink');

        var transitionEnds = {
            'transition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'mozTransitionEnd',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd'
        };

        for (var t in transitionEnds) {
            if (typeof tempElement.style[t] !== 'undefined') return transitionEnds[t];
        }
    }

    exports.addClasses = addClasses;
    exports.animationEndEvent = animationEndEvent;
    exports.dedupe = dedupe;
    exports.differ = differ;
    exports.forEach = forEach;
    exports.getParents = getParents;
    exports.isVisible = isVisible;
    exports.merge = merge;
    exports.off = off;
    exports.on = on;
    exports.removeClasses = removeClasses;
    exports.transitionEndEvent = transitionEndEvent;

    return exports;

}({}));

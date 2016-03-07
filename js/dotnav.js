function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function querySelectorParent(elem, selector) {
    var firstChar = selector.charAt(0);

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {

        // If selector is a class
        if ( firstChar === '.' ) {
            if ( elem.classList.contains( selector.substr(1) ) ) {
                return elem;
            }
        }

        // If selector is an ID
        if ( firstChar === '#' ) {
            if ( elem.id === selector.substr(1) ) {
                return elem;
            }
        }

        // If selector is a data attribute
        if ( firstChar === '[' ) {
            if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
                return elem;
            }
        }

        // If selector is a tag
        if ( elem.tagName.toLowerCase() === selector ) {
            return elem;
        }

    }

    return false;
};

function addClass(element, className) {
    if (element.classList)
        element.classList.add(className);
    else
        element.className += ' ' + className;
}

function removeClass(element, className) {
    if (element.classList)
        element.classList.remove(className);
    else
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

ready(function() {
    var prologDot  = document.getElementById('dot-prolog');
    var teamDot    = document.getElementById('dot-team');
    var productDot = document.getElementById('dot-product');

    var dots = document.querySelectorAll('nav.dotnav ul li');

    var onDotClicked = function(event) {
        for (var i = 0; i < dots.length; i++)  {
            // Unactivate activated class for all dots
            removeClass(dots[i], 'activated');
        }

        var item = querySelectorParent(event.target, 'li');

        if (!item.classList.contains('activated')) {
            addClass(item, 'activated');
        }
    }

    for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        dot.addEventListener('click', onDotClicked);
    }
});

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
    var dots = document.querySelectorAll('nav.dotnav ul li');

    var activateDot = function(dot) {
        for (var i = 0; i < dots.length; i++)  {
            // Unactivate activated class for all dots
            removeClass(dots[i], 'activated');
        }

        var item = querySelectorParent(dot, 'li');

        if (!item.classList.contains('activated')) {
            addClass(item, 'activated');
        }
    }

    var onDotClicked = function(event) {
        activateDot(event.target);

        var item = querySelectorParent(event.target, 'li');
        Scroller.scrollTo('.' + item.id.replace('dot-', ''));
    }

    var onWindowScroll = function(event) {
        var activateDotOnSectionPassed = function(dot, element) {
            var scrollOffsetTop = element.getBoundingClientRect().top;
            // TODO: Use Math.abs()
            if (scrollOffsetTop <= 0) {
                // console.log('scroll offset : ' + (-1 * scrollOffsetTop));
                // console.log('element height : ' + element.offsetHeight);
                activateDot(dot);
            }
        };

        var dot = document.getElementById('dot-header');
        var element = document.querySelector('.header');
        activateDotOnSectionPassed(dot, element);

        var dot = document.getElementById('dot-prolog');
        var element = document.querySelector('.prolog');
        activateDotOnSectionPassed(dot, element);

        var dot = document.getElementById('dot-team');
        var element = document.querySelector('.team');
        activateDotOnSectionPassed(dot, element);

        var dot = document.getElementById('dot-product');
        var element = document.querySelector('.product');
        activateDotOnSectionPassed(dot, element);
    };

    for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        dot.addEventListener('click', onDotClicked);
    }

    window.addEventListener("scroll", onWindowScroll);
});

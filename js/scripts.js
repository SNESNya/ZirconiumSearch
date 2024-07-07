var currentEngine = 'bing';

function search() {
    var query = document.getElementById('search-query').value;
    var url;
    switch (currentEngine) {
        case 'google':
            url = 'https://www.google.com/search?q=' + encodeURIComponent(query);
            break;
        case 'bing':
            url = 'https://www.bing.com/search?q=' + encodeURIComponent(query);
            break;
        case 'duckduckgo':
            url = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
            break;
        case 'wikipedia-zh':
            url = 'https://zh.wikipedia.org/wiki/' + encodeURIComponent(query);
            break;
        case 'wikipedia-en':
            url = 'https://en.wikipedia.org/wiki/' + encodeURIComponent(query);
            break;
    }
    window.location.href = url;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        search();
    }
}

function changeBackground(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var imageUrl = e.target.result;
            document.body.style.backgroundImage = 'url(' + imageUrl + ')';
            localStorage.setItem('backgroundImage', imageUrl);
        };
        reader.readAsDataURL(file);
    }
}

function clearBackground() {
    document.body.style.backgroundImage = '';
    localStorage.removeItem('backgroundImage');
}

function loadBackground() {
    var backgroundImage = localStorage.getItem('backgroundImage');
    if (backgroundImage) {
        document.body.style.backgroundImage = 'url(' + backgroundImage + ')';
    }
}

function togglePopup() {
    var popup = document.getElementById('settings-popup');
    if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}

function setEngine(engine) {
    currentEngine = engine;
    document.querySelectorAll('.check-mark').forEach(function(check) {
        check.style.display = 'none';
    });
    document.getElementById(engine + '-check').style.display = 'inline';
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

function changeColor(elementId, styleProperty) {
    var color = event.target.value;
    document.getElementById(elementId).style[styleProperty] = color;
    localStorage.setItem(elementId + '-' + styleProperty, color);
}

function resetDefaults() {
    localStorage.removeItem('search-container-backgroundColor');
    localStorage.removeItem('search-query-color');
    localStorage.removeItem('search-button-backgroundColor');
    document.getElementById('search-container').style.backgroundColor = '#ffffff';
    document.getElementById('search-query').style.color = '#000000';
    document.getElementById('search-button').style.backgroundColor = '#4CAF50';
}

function applyCustomColors() {
    var searchContainerColor = localStorage.getItem('search-container-backgroundColor');
    if (searchContainerColor) {
        document.getElementById('search-container').style.backgroundColor = searchContainerColor;
    }

    var searchQueryColor = localStorage.getItem('search-query-color');
    if (searchQueryColor) {
        document.getElementById('search-query').style.color = searchQueryColor;
    }

    var searchButtonColor = localStorage.getItem('search-button-backgroundColor');
    if (searchButtonColor) {
        document.getElementById('search-button').style.backgroundColor = searchButtonColor;
    }
}

function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE '); // IE 10 or older
    var trident = ua.indexOf('Trident/'); // IE 11

    if (msie > 0 || trident > 0) {
        var warning = document.getElementById('ie-warning');
        warning.style.display = 'block';
    }
}

window.onload = function() {
    loadBackground();
    detectIE();
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    }
    applyCustomColors();
};

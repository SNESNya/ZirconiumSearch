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

function setPresetTheme(theme) {
    document.body.classList.remove('dark-mode', 'material-you', 'material-design');
    var settingsButton = document.getElementById('settings-button');
    var searchButton = document.getElementById('search-button');
    switch (theme) {
        case 'light':
            settingsButton.style.backgroundColor = '#FF9800';
            searchButton.style.backgroundColor = '#4CAF50';
            localStorage.setItem('theme', 'light');
            break;
        case 'dark':
            document.body.classList.add('dark-mode');
            settingsButton.style.backgroundColor = '#555';
            searchButton.style.backgroundColor = '#555';
            localStorage.setItem('theme', 'dark');
            break;
        case 'material-you':
            document.body.classList.add('material-you');
            settingsButton.style.backgroundColor = '#0061a4';
            searchButton.style.backgroundColor = '#0061a4';
            localStorage.setItem('theme', 'material-you');
            break;
        case 'material-design':
            document.body.classList.add('material-design');
            settingsButton.style.backgroundColor = '#00696e';
            searchButton.style.backgroundColor = '#00696e';
            localStorage.setItem('theme', 'material-design');
            break;
    }
}

function changeColor(elementId, styleProperty) {
    var color = event.target.value;
    document.getElementById(elementId).style[styleProperty] = color;
    localStorage.setItem(elementId + '-' + styleProperty, color);
}

function changePlaceholderColor() {
    var color = document.getElementById('search-placeholder-color').value;
    var searchBox = document.getElementById('search-query');
    searchBox.style.setProperty('--placeholder-color', color);
    localStorage.setItem('search-placeholder-color', color);
}

function changePlaceholderText() {
    var text = document.getElementById('search-placeholder-text').value;
    document.getElementById('search-query').placeholder = text;
    localStorage.setItem('search-placeholder-text', text);
}

function resetDefaults() {
    localStorage.removeItem('search-container-backgroundColor');
    localStorage.removeItem('search-query-color');
    localStorage.removeItem('search-button-backgroundColor');
    localStorage.removeItem('settings-button-backgroundColor');
    localStorage.removeItem('search-placeholder-color');
    localStorage.removeItem('search-placeholder-text');
    
    document.getElementById('search-container').style.backgroundColor = '#ffffff';
    document.getElementById('search-query').style.color = '#000000';
    document.getElementById('search-button').style.backgroundColor = '#4CAF50';
    document.getElementById('settings-button').style.backgroundColor = '#FF9800';
    document.getElementById('search-query').placeholder = '输入搜索内容...';
    document.getElementById('search-query').style.setProperty('--placeholder-color', '#ccc');
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

    var settingsButtonColor = localStorage.getItem('settings-button-backgroundColor');
    if (settingsButtonColor) {
        document.getElementById('settings-button').style.backgroundColor = settingsButtonColor;
    }

    var searchPlaceholderColor = localStorage.getItem('search-placeholder-color');
    if (searchPlaceholderColor) {
        document.getElementById('search-query').style.setProperty('--placeholder-color', searchPlaceholderColor);
    }

    var searchPlaceholderText = localStorage.getItem('search-placeholder-text');
    if (searchPlaceholderText) {
        document.getElementById('search-query').placeholder = searchPlaceholderText;
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

function detectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setPresetTheme('dark');
    }
}

window.onload = function() {
    loadBackground();
    detectIE();
    detectDarkMode();
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setPresetTheme(savedTheme);
    }
    applyCustomColors();
};

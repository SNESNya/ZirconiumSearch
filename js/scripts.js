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
    document.body.classList.remove('dark-mode', 'material-you', 'material-design', 'light-mode-old', 'light-mode');
    var settingsButton = document.getElementById('settings-button');
    var searchButton = document.getElementById('search-button');
    switch (theme) {
        case 'light':
            document.body.classList.add('light-mode');
            settingsButton.style.backgroundColor = '#000';
            searchButton.style.backgroundColor = '#000';
            localStorage.setItem('theme', 'light');
            break;
        case 'light-old':
            document.body.classList.add('light-mode-old');
            settingsButton.style.backgroundColor = '#FF9800';
            searchButton.style.backgroundColor = '#4CAF50';
            localStorage.setItem('theme', 'light-old');
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

function changeSize(elementId, styleProperty) {
    var size = event.target.value;
    document.getElementById(elementId).style[styleProperty] = size;
    localStorage.setItem(elementId + '-' + styleProperty, size);
}

function changeShadowStrength() {
    var strength = document.getElementById('shadow-strength').value || '0.1';
    var size = document.getElementById('shadow-size').value || '6px';
    document.getElementById('search-container').style.boxShadow = `0px 4px ${size} rgba(0, 0, 0, ${strength})`;
    localStorage.setItem('search-container-shadow-strength', strength);
    localStorage.setItem('search-container-shadow-size', size);
}

function changeShadowSize() {
    changeShadowStrength();
}

function changeOpacity() {
    var opacity = document.getElementById('search-opacity').value || '1.0';
    document.getElementById('search-container').style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    localStorage.setItem('search-container-opacity', opacity);
}

function changeBlur() {
    var blur = document.getElementById('blur-amount').value || '0px';
    document.getElementById('search-container').style.backdropFilter = `blur(${blur})`;
    localStorage.setItem('search-container-blur', blur);
}

function changePosition(elementId, styleProperty) {
    var position = event.target.value;
    document.getElementById(elementId).style[styleProperty] = position;
    localStorage.setItem(elementId + '-' + styleProperty, position);
}

function resetDefaults() {
    localStorage.removeItem('search-container-backgroundColor');
    localStorage.removeItem('search-query-color');
    localStorage.removeItem('search-button-backgroundColor');
    localStorage.removeItem('settings-button-backgroundColor');
    localStorage.removeItem('search-placeholder-color');
    localStorage.removeItem('search-placeholder-text');
    localStorage.removeItem('search-container-opacity');
    localStorage.removeItem('search-container-blur');
    
    document.getElementById('search-container').style.backgroundColor = 'rgba(255, 255, 255, 1.0)';
    document.getElementById('search-query').style.color = '#000000';
    document.getElementById('search-button').style.backgroundColor = '#4CAF50';
    document.getElementById('settings-button').style.backgroundColor = '#FF9800';
    document.getElementById('search-query').placeholder = '输入搜索内容...';
    document.getElementById('search-query').style.setProperty('--placeholder-color', '#ccc');
    document.getElementById('search-container').style.backdropFilter = 'none';
    document.getElementById('blur-amount').value = '0px';
    document.getElementById('search-opacity').value = '1.0';
}

function resetSizeDefaults() {
    localStorage.removeItem('search-container-width');
    localStorage.removeItem('search-container-height');
    localStorage.removeItem('search-container-shadow-strength');
    localStorage.removeItem('search-container-shadow-size');

    document.getElementById('search-container').style.width = '300px';
    document.getElementById('search-container').style.height = '40px';
    document.getElementById('search-container').style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
}

function resetPositionDefaults() {
    localStorage.removeItem('search-container-left');
    localStorage.removeItem('search-container-top');

    document.getElementById('search-container').style.left = '0px';
    document.getElementById('search-container').style.top = '0px';
}

function resetAllDefaults() {
    resetDefaults();
    resetSizeDefaults();
    resetPositionDefaults();
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

    var searchContainerWidth = localStorage.getItem('search-container-width');
    if (searchContainerWidth) {
        document.getElementById('search-container').style.width = searchContainerWidth;
    }

    var searchContainerHeight = localStorage.getItem('search-container-height');
    if (searchContainerHeight) {
        document.getElementById('search-container').style.height = searchContainerHeight;
    }

    var shadowStrength = localStorage.getItem('search-container-shadow-strength');
    var shadowSize = localStorage.getItem('search-container-shadow-size');
    if (shadowStrength && shadowSize) {
        document.getElementById('search-container').style.boxShadow = `0px 4px ${shadowSize} rgba(0, 0, 0, ${shadowStrength})`;
    }

    var positionX = localStorage.getItem('search-container-left');
    var positionY = localStorage.getItem('search-container-top');
    if (positionX) {
        document.getElementById('search-container').style.left = positionX;
    }
    if (positionY) {
        document.getElementById('search-container').style.top = positionY;
    }

    var opacity = localStorage.getItem('search-container-opacity');
    if (opacity) {
        document.getElementById('search-container').style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        document.getElementById('search-opacity').value = opacity;
    } else {
        document.getElementById('search-container').style.backgroundColor = 'rgba(255, 255, 255, 1.0)';
        document.getElementById('search-opacity').value = '1.0';
    }

    var blurBackground = localStorage.getItem('search-container-blur');
    if (blurBackground) {
        document.getElementById('search-container').style.backdropFilter = `blur(${blurBackground})`;
        document.getElementById('blur-amount').value = blurBackground;
    } else {
        document.getElementById('search-container').style.backdropFilter = 'none';
        document.getElementById('blur-amount').value = '0px';
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
        setPresetTheme(savedTheme);
    } else {
        setPresetTheme('light');
    }
    applyCustomColors();
};

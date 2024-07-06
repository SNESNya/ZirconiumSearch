var currentEngine = 'google';

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
        case 'baidu':
            url = 'https://www.baidu.com/s?wd=' + encodeURIComponent(query);
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

function toggleMenu() {
    var menu = document.getElementById('engine-menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

function setEngine(engine) {
    currentEngine = engine;
    document.querySelectorAll('.check-mark').forEach(function(check) {
        check.style.display = 'none';
    });
    document.getElementById(engine + '-check').style.display = 'inline';
    toggleMenu();
}

window.onload = loadBackground;

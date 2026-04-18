const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Чтобы страница не перезагружалась
    
    const query = searchInput.value.toLowerCase().trim();

    // Логика переходов по кодовым словам
    if (query === 'google') {
        window.location.href = 'https://www.google.com';
    } 
    else if (query === 'youtube' || query === 'ютюб') {
        window.location.href = 'https://www.youtube.com';
    } 
    else if (query === 'chatgpt' || query === 'ии') {
        window.location.href = 'https://chatgpt.com';
    } 
    else if (query === 'github') {
        window.location.href = 'https://github.com';
    }
    else if (query === 'roumber') {
        alert('Вы уже в будущем! ROUMBER активирован.');
    }
    // Если ввел что-то другое - просто ищем это в Google
    else if (query !== "") {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
});
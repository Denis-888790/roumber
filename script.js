renderHistory();

document.getElementById('main-search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let input = document.getElementById('main-search-input');
    let query = input.value.trim();
    let lowerQuery = query.toLowerCase();
    
    if (query !== "") {
        saveToHistory(query);

        let targetUrl = "";
        if (lowerQuery === 'ютуб' || lowerQuery === 'youtube') targetUrl = 'https://www.youtube.com';
        else if (lowerQuery === 'вк' || lowerQuery === 'vk') targetUrl = 'https://www.vk.com';
        else if (query.includes('.') && !query.includes(' ')) {
            targetUrl = query.startsWith('http') ? query : 'https://' + query;
        } else {
            targetUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }

        window.open(targetUrl, '_blank');
        input.value = ""; 
        renderHistory();
    }
});

function saveToHistory(q) {
    let history = JSON.parse(localStorage.getItem('roumber_hist')) || [];
    history = history.filter(item => item !== q);
    history.unshift(q);
    localStorage.setItem('roumber_hist', JSON.stringify(history.slice(0, 8)));
}

function renderHistory() {
    const container = document.getElementById('history-container');
    let history = JSON.parse(localStorage.getItem('roumber_hist')) || [];
    container.innerHTML = history.map(q => `
        <div class="history-item" onclick="quickSearch('${q}')">${q}</div>
    `).join('');
}

function quickSearch(q) {
    document.getElementById('main-search-input').value = q;
    document.getElementById('main-search-form').dispatchEvent(new Event('submit'));
}

// Функция для полной очистки истории
function clearHistory() {
    if (confirm("Точно очистить всю историю поиска?")) {
        localStorage.removeItem('roumber_hist'); // Удаляем данные из памяти
        renderHistory(); // Перерисовываем экран (он станет пустым)
    }
}
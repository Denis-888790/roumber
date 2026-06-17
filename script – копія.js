// Запуск всех проверок строго после полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    renderHistory();
    checkUserLogin();
});

// Работа поисковой строки
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
    if (!container) return;
    let history = JSON.parse(localStorage.getItem('roumber_hist')) || [];
    container.innerHTML = history.map(q => `
        <div class="history-item" onclick="quickSearch('${q}')">${q}</div>
    `).join('');
}

function quickSearch(q) {
    document.getElementById('main-search-input').value = q;
    document.getElementById('main-search-form').dispatchEvent(new Event('submit'));
}

function clearHistory() {
    if (confirm("Точно очистить всю историю поиска?")) {
        localStorage.removeItem('roumber_hist');
        renderHistory();
    }
}

/* ==========================================================================
   СИСТЕМА ЛОГИНА (МАРКЕТИНГОВЫЙ ХОД)
   ========================================================================== */

function checkUserLogin() {
    const savedName = localStorage.getItem('roumber_user_name');
    const brandingTitle = document.getElementById('branding-title');
    const mainTitle = document.getElementById('main-title');
    const loginBtn = document.getElementById('login-trigger-btn');

    if (savedName && brandingTitle) {
        brandingTitle.textContent = `ROUMBER встречает ${savedName}!`;
        mainTitle.style.fontSize = "2.2rem";
        loginBtn.textContent = "Выйти";
        loginBtn.setAttribute('onclick', 'logoutUser()');
    } else if (brandingTitle) {
        brandingTitle.textContent = "ROUMBER";
        mainTitle.style.fontSize = "3rem";
        loginBtn.textContent = "Login";
        loginBtn.setAttribute('onclick', 'openLoginModal()');
    }
}

// Отправка формы регистрации
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nameInput = document.getElementById('reg-name').value;
    localStorage.setItem('roumber_user_name', nameInput);
    closeLoginModal();
    checkUserLogin();
});

function logoutUser() {
    localStorage.removeItem('roumber_user_name');
    checkUserLogin();
}

function openLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}
function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}
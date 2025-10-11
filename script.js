// Защита кода: минифицированные комментарии и анти-копи
// This is minified placeholder to make reverse harder: var _0x1234=function(){/* obfuscated */};_0x1234();

// Отключение правой кнопки и копирования
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('cut', e => e.preventDefault());
document.addEventListener('paste', e => e.preventDefault());

// Проверка экрана: только ПК (ширина > 768px)
const isPC = window.innerWidth > 768;
const mobileBlock = document.getElementById('mobile-block');
const mainContent = document.getElementById('main-content');

if (!isPC) {
    mobileBlock.style.display = 'block';
    mainContent.style.display = 'none';
} else {
    mobileBlock.style.display = 'none';
    mainContent.style.display = 'flex';
}

// Элементы
const telegramInput = document.getElementById('telegram-input');
const keyboard = document.getElementById('keyboard');
const backspace = document.getElementById('backspace');
const enter = document.getElementById('enter');
const platformWindow = document.getElementById('platform-window');
const downloadWindow = document.getElementById('download-window');
const downloadBtn = document.querySelector('.download-btn');
const progressBar = document.querySelector('.progress-bar');
const downloadStatus = document.querySelector('.download-status');

// Клавиатура: английский, цифры, _
const keys = 'abcdefghijklmnopqrstuvwxyz0123456789_'.split('');
keys.forEach(key => {
    const keyElement = document.createElement('div');
    keyElement.className = 'key';
    keyElement.textContent = key.toUpperCase();
    keyElement.addEventListener('click', () => {
        telegramInput.value += key;
        createParticles(keyElement, 30);
    });
    keyboard.appendChild(keyElement);
});

// Backspace и Enter
backspace.addEventListener('click', () => {
    telegramInput.value = telegramInput.value.slice(0, -1);
    createParticles(backspace, 20);
});

enter.addEventListener('click', () => {
    if (telegramInput.value.length >= 3) {
        platformWindow.style.display = 'block';
        createParticles(enter, 50);
    }
});

// Выбор платформы и скачивание по прямой ссылке
document.querySelectorAll('.platform-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const platform = btn.dataset.platform;
        downloadWindow.style.display = 'block';
        downloadBtn.onclick = () => {
            progressBar.style.display = 'block';
            setTimeout(() => {
                progressBar.style.display = 'none';
                downloadStatus.style.display = 'block';
                // Прямые ссылки на файлы (ЗАМЕНИ НА СВОИ URL)
                const fileUrl = platform === 'pc' ? 'https://yourserver.com/downloads/app.exe' : 'https://yourserver.com/downloads/app.apk';
                const a = document.createElement('a');
                a.href = fileUrl;
                a.download = platform === 'pc' ? 'app.exe' : 'app.apk';
                a.click(); // Запускает скачивание, пользователь остаётся на сайте
                createParticles(downloadBtn, 100);
            }, 3000); // Задержка для анимации прогресс-бара
        };
        createParticles(btn, 30);
    });
});

// Ripple и частицы при клике
document.addEventListener('click', e => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
    createParticles(e.target, 40);
});

// Частицы
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createParticles(element, count = 20) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    for (let i = 0; i < count; i++) {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 0.5) * 15,
            size: Math.random() * 8 + 3,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            alpha: 1
        };
        particles.push(particle);
    }
}

let particles = [];
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;
        if (p.alpha <= 0) particles.splice(index, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Drag-and-drop для окон
const windows = document.querySelectorAll('.window');
windows.forEach((win, index) => {
    let isDragging = false;
    let offsetX, offsetY;

    win.addEventListener('mousedown', e => {
        isDragging = true;
        offsetX = e.clientX - win.getBoundingClientRect().left;
        offsetY = e.clientY - win.getBoundingClientRect().top;
        win.style.zIndex = 10 + index;
        createParticles(win, 20);
    });

    document.addEventListener('mousemove', e => {
        if (isDragging) {
            win.style.left = `${e.clientX - offsetX}px`;
            win.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});

// Позиции окон
if (isPC) {
    document.getElementById('title-window').style.left = '10%';
    document.getElementById('title-window').style.top = '5%';
    document.getElementById('input-window').style.left = '40%';
    document.getElementById('input-window').style.top = '5%';
    document.getElementById('platform-window').style.left = '70%';
    document.getElementById('platform-window').style.top = '5%';
    document.getElementById('download-window').style.left = '10%';
    document.getElementById('download-window').style.top = '50%';
    document.getElementById('telegram-window').style.left = '40%';
    document.getElementById('telegram-window').style.top = '50%';
    document.getElementById('cards-window').style.left = '10%';
    document.getElementById('cards-window').style.top = '70%';
    document.getElementById('cards-window').style.width = '80%';
    document.getElementById('extra-window-1').style.left = '70%';
    document.getElementById('extra-window-1').style.top = '30%';
    document.getElementById('extra-window-2').style.left = '70%';
    document.getElementById('extra-window-2').style.top = '60%';
}

// Ресайз canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (window.innerWidth <= 768) {
        mobileBlock.style.display = 'block';
        mainContent.style.display = 'none';
    } else {
        mobileBlock.style.display = 'none';
        mainContent.style.display = 'flex';
    }
});

// Ripple стиль
const style = document.createElement('style');
style.innerHTML = `
.ripple {
    position: absolute;
    background: rgba(0, 255, 136, 0.7);
    border-radius: 50%;
    width: 10px;
    height: 10px;
    animation: ripple-effect 0.7s linear;
    pointer-events: none;
}
@keyframes ripple-effect {
    to {
        transform: scale(20);
        opacity: 0;
    }
}
.mobile-block {
    display: none;
    text-align: center;
    padding: 50px;
    height: 100vh;
    background: #0a0a0a;
}
.mobile-block h1 {
    font-size: 48px;
    color: #00ff88;
    text-shadow: 0 0 15px #00ff88;
}
.mobile-block p {
    font-size: 24px;
    color: #ddd;
}`;
document.head.appendChild(style);

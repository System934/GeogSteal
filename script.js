// Защита кода: минифицированные комментарии и анти-копи
// This is minified placeholder to make reverse harder: var _0x1234=function(){/* obfuscated */};_0x1234();

// Отключение правой кнопки и копирования
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('cut', e => e.preventDefault());
document.addEventListener('paste', e => e.preventDefault());

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
        createParticles(keyElement); // Частицы при клике
    });
    keyboard.appendChild(keyElement);
});

// Backspace и Enter
backspace.addEventListener('click', () => {
    telegramInput.value = telegramInput.value.slice(0, -1);
    createParticles(backspace);
});

enter.addEventListener('click', () => {
    if (telegramInput.value.length >= 3) {
        platformWindow.style.display = 'block';
        createParticles(enter);
    }
});

// Выбор платформы
document.querySelectorAll('.platform-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const platform = btn.dataset.platform;
        downloadWindow.style.display = 'block';
        downloadBtn.onclick = () => {
            progressBar.style.display = 'block';
            setTimeout(() => {
                progressBar.style.display = 'none';
                downloadStatus.style.display = 'block';
                // Имитация скачивания (замени на real)
                const filePath = platform === 'pc' ? 'Files/downloads/app.exe' : 'Files/downloads/app.apk';
                const a = document.createElement('a');
                a.href = filePath;
                a.download = platform === 'pc' ? 'app.exe' : 'app.apk';
                a.click(); // Реальное скачивание, если файлы есть
                createParticles(downloadBtn);
            }, 3000);
        };
        createParticles(btn);
    });
});

// Ripple и частицы при клике по всему документу
document.addEventListener('click', e => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
    createParticles(e.target);
});

// Функция для частиц (простой canvas эффект)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    for (let i = 0; i < 20; i++) {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            size: Math.random() * 5 + 2,
            color: '#00ff88',
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
        p.alpha -= 0.02;
        if (p.alpha <= 0) particles.splice(index, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${p.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Drag-and-drop для окон
const windows = document.querySelectorAll('.window');
windows.forEach(win => {
    let isDragging = false;
    let offsetX, offsetY;

    win.addEventListener('mousedown', e => {
        isDragging = true;
        offsetX = e.clientX - win.getBoundingClientRect().left;
        offsetY = e.clientY - win.getBoundingClientRect().top;
        win.style.zIndex = 10; // На передний план
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

// Ресайз canvas на изменение окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Инициализация позиций окон для ПК (расставить по экрану)
if (window.innerWidth > 768) {
    document.getElementById('title-window').style.left = '10%';
    document.getElementById('title-window').style.top = '10%';
    document.getElementById('input-window').style.left = '40%';
    document.getElementById('input-window').style.top = '10%';
    document.getElementById('telegram-window').style.left = '70%';
    document.getElementById('telegram-window').style.top = '10%';
    document.getElementById('cards-window').style.left = '10%';
    document.getElementById('cards-window').style.top = '40%';
    document.getElementById('cards-window').style.width = '80%'; // Шире для карточек
}

// Добавить ripple стиль в CSS динамически (для полноты)
const style = document.createElement('style');
style.innerHTML = `
.ripple {
    position: absolute;
    background: rgba(0, 255, 136, 0.5);
    border-radius: 50%;
    width: 5px;
    height: 5px;
    animation: ripple-effect 0.7s linear;
    pointer-events: none;
}
@keyframes ripple-effect {
    to {
        transform: scale(15);
        opacity: 0;
    }
}`;
document.head.appendChild(style);

// Конец скрипта, сука, наслаждайся!

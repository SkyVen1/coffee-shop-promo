// Отримання елементів DOM для керування мобільним меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

// Обробник події кліку на кнопку "бургер"
burger.addEventListener('click', () => {
    // Перемикання класу active для відображення/приховування меню
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Закриття меню при виборі пункту навігації (покращення UX)
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Реалізація плавної прокрутки (Smooth Scroll) до якірних посилань
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Скасування стандартної поведінки переходу
        const targetSection = document.querySelector(this.getAttribute('href'));
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Обробка події відправки форми (Form Submission)
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Запобігання перезавантаженню сторінки
        
        // Збір даних з полів форми
        const formData = new FormData(this);

        // Виконання асинхронного POST-запиту до API
        fetch('api/send_mail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // Перевірка статусу HTTP-відповіді
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Обробка відповіді від сервера
            if (data.status === 'success') {
                alert("Дякуємо, " + data.name + "! Ваше повідомлення успішно збережено в базі даних.");
                form.reset(); // Очищення полів форми
            } else {
                alert("Помилка: " + data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert("Виникла помилка при з'єднанні з сервером.");
        });
    });
}
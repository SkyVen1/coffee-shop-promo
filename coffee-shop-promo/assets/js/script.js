// Отримання елементів DOM для керування мобільним меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

// Обробник події кліку на кнопку "бургер"
if (burger) {
    burger.addEventListener('click', () => {
        // Перемикання класу active для відображення/приховування меню
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// Закриття меню при виборі пункту навігації (покращення UX)
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        if (nav) nav.classList.remove('active');
        if (burger) burger.classList.remove('toggle');
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

// Обробка події відправки форми (Form Submission) до Laravel API
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Запобігання перезавантаженню сторінки
        
        // Збір даних з полів форми (включаючи прихований honeypot)
        const formData = new FormData(this);

        // Виконання асинхронного POST-запиту до Laravel API
        fetch('http://127.0.0.1:8000/api/feedback', {
            method: 'POST',
            body: formData,
            headers: {
                // Важливо: кажемо Laravel, що ми очікуємо JSON, навіть якщо є помилки
                'Accept': 'application/json'
            }
        })
        .then(response => {
            // Читаємо JSON незалежно від статусу відповіді (200, 422, 500)
            return response.json();
        })
        .then(data => {
            // Обробка логіки відповіді
            if (data.status === 'success') {
                alert("Дякуємо, " + data.name + "! Ваше повідомлення успішно збережено.");
                form.reset(); // Очищення полів форми
            } else {
                // Формування повідомлення про помилку
                let errorMsg = "Помилка: " + (data.message || "Щось пішло не так");
                
                // Якщо Laravel повернув деталі валідації (наприклад, "email зайнятий")
                if (data.errors) {
                    errorMsg += "\n" + Object.values(data.errors).flat().join("\n");
                }
                
                alert(errorMsg);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert("Виникла помилка при з'єднанні з сервером. Перевірте, чи запущено 'php artisan serve'.");
        });
    });
}
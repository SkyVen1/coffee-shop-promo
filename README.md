# Coffee Shop Promo Site (Laravel + Vue.js)

Курсова робота: Розробка промо-сайту кав'ярні з інтерактивною формою зворотного зв'язку.
Проєкт реалізовано як гібридний додаток (Monolith), де бекенд на **Laravel** забезпечує API та маршрутизацію, а фронтенд на **Vue.js** відповідає за реактивний інтерфейс.

## Технологічний стек

* **Frontend:** Vue.js 3 (Composition API), Vite, HTML5, CSS3.
* **Backend:** PHP 8.2+, Laravel Framework 11.
* **Database:** MySQL / MariaDB.
* **Tools:** Composer, NPM, XAMPP/OpenServer, VS Code.

## Структура проєкту

Проєкт має стандартну структуру Laravel із інтегрованим Vue.js:

* `/app` — Контролери та логіка API.
* `/resources/js/components` — Vue-компоненти (включно з формою відгуків).
* `/resources/views` — Blade-шаблони (точка входу для Vue).
* `/routes/api.php` — Маршрути REST API.

---

## Інструкція із запуску (Localhost)

Для запуску проєкту локально необхідно мати встановлені **PHP**, **Composer** та **Node.js**.

### 1. Клонування та налаштування бекенду

Клонуйте репозиторій та перейдіть у папку проєкту:
git clone [https://github.com/SkyVen1/coffee-shop-promo.git](https://github.com/SkyVen1/coffee-shop-promo.git)
cd coffee-shop-promo

Встановіть залежності PHP:
composer install

Налаштуйте файл оточення:
cp .env.example .env
(Відкрийте файл .env та вкажіть параметри вашої бази даних DB_DATABASE, DB_USERNAME, DB_PASSWORD).

Згенеруйте ключ додатку та запустіть міграції:
php artisan key:generate
php artisan migrate

### 2. Налаштування фронтенду (Vue.js)
Встановіть JavaScript-залежності:
npm install

Запустіть збирач активів (Vite) у режимі розробки:
npm run dev
(Не закривайте це вікно терміналу, воно відповідає за оновлення стилів та скриптів).

### 3. Запуск сервера
Відкрийте нове вікно терміналу та запустіть локальний сервер Laravel:
php artisan serve
Сервер буде доступний за адресою: http://127.0.0.1:8000

## Документація API
POST /api/feedback
Ендпоінт для прийому та збереження відгуків клієнтів (використовується Vue-компонентом).

Параметри запиту (JSON):
name (string) — Ім'я користувача (обов'язкове, макс. 255).
email (email) — Електронна пошта (обов'язкова, валідний email).
message (string) — Текст відгуку (обов'язковий).
honeypot (string) — Приховане поле для захисту від ботів (має бути пустим).

Коди відповідей:
200 OK — Успіх.
{
    "status": "success",
    "message": "Відгук збережено успішно"
}
422 Unprocessable Entity — Помилка валідації.

{
    "message": "Помилка валідації",
    "errors": { ... }
}

### Безпека
SQL Injection: Захист через PDO binding (Laravel Eloquent/Query Builder).
XSS: Подвійний захист: Vue.js автоматично екранує змінні в шаблоні, а Laravel обробляє вихідні дані JSON.
Anti-Spam: Реалізовано метод Honeypot на рівні Vue та бекенд-валідації.
CSRF: Захист API запитів засобами Laravel Sanctum / CSRF token.
Rate Limiting: Обмеження частоти запитів для захисту від флуду.


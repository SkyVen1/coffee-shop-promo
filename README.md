# Coffee Shop Promo Site (Laravel Backend)

Курсова робота: Розробка промо-сайту кав'ярні з формою зворотного зв'язку.
Проєкт реалізовано з використанням архітектури MVC: клієнтська частина (HTML/JS) взаємодіє з серверною (Laravel) через REST API.

## Технологічний стек
* **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+, Fetch API).
* **Backend:** PHP 8.2+, Laravel Framework 11.
* **Database:** MySQL / MariaDB.
* **Tools:** Composer, XAMPP/OpenServer, VS Code.

## Структура репозиторію
* `/coffee-backend` — Серверна частина (API, логіка, міграції БД).
* `/coffee-shop-promo` — Клієнтська частина (верстка, стилі, скрипти).

## Інструкція із запуску (Localhost)

Для запуску проєкту локально виконайте наступні кроки.

### 1. Налаштування Бекенду (Server)
Перейдіть у папку сервера та встановіть залежності:
```bash
cd coffee-backend
composer install

Налаштуйте файл оточення (створіть копію прикладу):
copy .env.example .env
(Для Mac/Linux використовуйте cp .env.example .env)

Відкрийте файл .env та вкажіть налаштування вашої бази даних (попередньо створіть пусту базу coffee_db у phpMyAdmin):
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=coffee_db
DB_USERNAME=root
DB_PASSWORD=

Згенеруйте ключ додатку та запустіть міграції (створення таблиць):
php artisan key:generate
php artisan migrate

Запустіть локальний сервер:
php artisan serve
Сервер API буде доступний за адресою: http://127.0.0.1:8000

2. Запуск Фронтенду (Client)
Відкрийте папку coffee-shop-promo.

Запустіть файл index.html у браузері.

Примітка: Переконайтесь, що у файлі assets/js/script.js вказано правильний URL API: http://127.0.0.1:8000/api/feedback

Документація API
POST /api/feedbackЕндпоінт для прийому та збереження відгуків клієнтів.
Параметри запиту (Body - FormData або JSON):
name (string) — Ім'я користувача (обов'язкове, макс. 255 символів).
email (email) — Електронна пошта (обов'язкова, має бути валідним email).
message (string) — Текст відгуку (обов'язковий).
honeypot (string) — Приховане поле для захисту від ботів (має бути пустим).

Коди відповідей:
200 OK — Відгук успішно збережено.
{
    "status": "success",
    "message": "Відгук збережено успішно",
    "name": "Ім'я"
}
422 Unprocessable Entity — Помилка валідації даних або спам.
{
    "status": "error",
    "message": "Помилка валідації",
    "errors": { ... }
}

Безпека
SQL Injection: Захист забезпечується через PDO binding (Laravel Query Builder).
XSS: Автоматична екранізація вихідних даних.
Anti-Spam: Реалізовано метод Honeypot (пастка для ботів).

Rate Limiting: Обмеження кількості запитів з однієї IP-адреси.


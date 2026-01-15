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
```bash
git clone [https://github.com/SkyVen1/coffee-shop-promo.git](https://github.com/SkyVen1/coffee-shop-promo.git)
cd coffee-shop-promo

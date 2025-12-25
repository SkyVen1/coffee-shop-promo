<?php
header('Content-Type: application/json');

// Підключаємо БД
require_once 'db.php';

// Отримуємо дані з POST запиту
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Валідація
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'Всі поля обов\'язкові']);
    exit;
}

try {
    // Підготовлений SQL-запит (захист від SQL Injection - це важливо для викладача!)
    $sql = "INSERT INTO reviews (name, email, message) VALUES (:name, :email, :message)";
    
    $stmt = $pdo->prepare($sql);
    
    // Прив'язка параметрів та виконання
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':message' => $message
    ]);

    // Повертаємо успішну відповідь
    echo json_encode([
        'status' => 'success', 
        'message' => 'Відгук збережено в базі даних',
        'name' => htmlspecialchars($name)
    ]);

} catch (PDOException $e) {
    // Якщо сталася помилка SQL
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Помилка запису в БД: ' . $e->getMessage()]);
}
?>
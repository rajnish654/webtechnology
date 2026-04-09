<?php
header('Content-Type: application/json');

require_once '../config.php';

// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['name']) || !isset($data['email']) || !isset($data['phone']) || !isset($data['city'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields'
    ]);
    exit;
}

$name = trim($data['name']);
$email = trim($data['email']);
$phone = trim($data['phone']);
$city = trim($data['city']);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address'
    ]);
    exit;
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO entries (name, email, phone, city) VALUES (?, ?, ?, ?)");

if ($stmt === false) {
    echo json_encode([
        'success' => false,
        'message' => 'Prepare failed: ' . $conn->error
    ]);
    exit;
}

$stmt->bind_param("ssss", $name, $email, $phone, $city);

// Execute
if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Entry added successfully',
        'id' => $stmt->insert_id
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error executing query: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>

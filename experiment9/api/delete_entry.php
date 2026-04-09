<?php
header('Content-Type: application/json');

require_once '../config.php';

// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Missing entry ID'
    ]);
    exit;
}

$id = intval($data['id']);

// Prepare and bind
$stmt = $conn->prepare("DELETE FROM entries WHERE id = ?");

if ($stmt === false) {
    echo json_encode([
        'success' => false,
        'message' => 'Prepare failed: ' . $conn->error
    ]);
    exit;
}

$stmt->bind_param("i", $id);

// Execute
if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Entry deleted successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error deleting entry: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>

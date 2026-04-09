<?php
header('Content-Type: application/json');

require_once '../config.php';

$sql = "SELECT id, name, email, phone, city, created_at FROM entries ORDER BY created_at DESC";
$result = $conn->query($sql);

if ($result === false) {
    echo json_encode([
        'success' => false,
        'message' => 'Query failed: ' . $conn->error,
        'data' => []
    ]);
    exit;
}

$entries = [];
while ($row = $result->fetch_assoc()) {
    $entries[] = $row;
}

echo json_encode([
    'success' => true,
    'message' => 'Data retrieved successfully',
    'data' => $entries
]);

$conn->close();
?>

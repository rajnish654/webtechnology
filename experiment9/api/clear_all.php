<?php
header('Content-Type: application/json');

require_once '../config.php';

$sql = "DELETE FROM entries";
$result = $conn->query($sql);

if ($result === false) {
    echo json_encode([
        'success' => false,
        'message' => 'Error clearing data: ' . $conn->error
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'All entries cleared successfully'
]);

$conn->close();
?>

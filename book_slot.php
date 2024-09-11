<?php
require 'config.php';  // Database connection

$data = json_decode(file_get_contents('php://input'), true);

$slot_id = $data['slot_id'];
$user_id = 1;  // Example user ID (you would normally get this from a session)

try {
    $pdo->beginTransaction();

    // Mark the slot as booked
    $query = $pdo->prepare("UPDATE Turf_Slots SET is_booked = 1 WHERE slot_id = :slot_id");
    $query->execute(['slot_id' => $slot_id]);

    // Insert booking record
    $query = $pdo->prepare("INSERT INTO Bookings (user_id, slot_id, booking_date) VALUES (:user_id, :slot_id, NOW())");
    $query->execute(['user_id' => $user_id, 'slot_id' => $slot_id]);

    $pdo->commit();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>

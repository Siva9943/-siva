<?php
require 'config.php';  // Database connection

$date = $_GET['date'];

$query = $pdo->prepare("SELECT * FROM Turf_Slots WHERE date = :date AND is_booked = 0");
$query->execute(['date' => $date]);

$slots = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($slots);
?>

<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Permitir requisições CORS
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Responde a preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include('../config/conecta.php'); // Conexão com o banco

try {
    $stmt = $con->prepare("SELECT id_cidade, nome_cidade FROM cidades ORDER BY nome_cidade ASC");
    $stmt->execute();
    $cidades = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($cidades);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Erro ao buscar cidades",
        "details" => $e->getMessage()
    ]);
}

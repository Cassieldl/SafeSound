<?php
    include('conecta.php');
    header('Content-Type: application/json');

    if (isset($_GET['tb']) && isset($_GET['id']) && isset($_GET['nome']) ) {

        $registros = [];
        $tabela = $_GET['tb'];
        $codigo = $_GET['id'];
        $nome   = $_GET['nome'];

        $stmt = $con->prepare("SELECT $codigo as id, $nome as nome FROM $tabela ORDER BY $nome");
        $stmt->execute();
        $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'registros' => $registros,
        ]);
    }

?>
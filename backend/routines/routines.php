<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include('../config/conecta.php');

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

/************************************************************
 * LISTAGEM (DataTables)
 ************************************************************/
if (isset($_GET['op']) && $_GET['op'] === 'list') {
    try {
        $start  = intval($_POST['start'] ?? 0);
        $length = intval($_POST['length'] ?? 10);
        $pesquisa = isset($_POST['search']['value']) ? '%' . $_POST['search']['value'] . '%' : '%%';

        $orderColumnIndex = $_POST['order'][0]['column'] ?? 1;
        $orderDir = $_POST['order'][0]['dir'] ?? 'asc';

        $colunas = [
            "r.id_rotina",
            "r.nome_rotina",
            "r.descricao_rotina",
            "r.horario_rotina",
            "r.frequencia_rotina",
            "r.ativa_rotina",
            "r.data_criacao_rotina",
            "p.nome_pessoa"
        ];

        $orderColumn = $colunas[$orderColumnIndex] ?? "r.nome_rotina";

        $sql = "
            SELECT
                r.id_rotina,
                r.nome_rotina,
                r.descricao_rotina,
                r.horario_rotina,
                r.frequencia_rotina,
                r.ativa_rotina,
                r.data_criacao_rotina,
                p.nome_pessoa
            FROM rotina r
            LEFT JOIN pessoa p ON r.id_pessoa = p.id_pessoa
            WHERE r.nome_rotina LIKE ? OR p.nome_pessoa LIKE ?
            ORDER BY $orderColumn $orderDir
            LIMIT $start, $length
        ";

        $stmt = $con->prepare($sql);
        $stmt->execute([$pesquisa, $pesquisa]);
        $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "draw" => intval($_POST['draw'] ?? 1),
            "recordsTotal" => count($registros),
            "recordsFiltered" => count($registros),
            "data" => $registros
        ]);

    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
    exit;
}

/************************************************************
 * GET (Buscar por ID)
 ************************************************************/
if ($method === 'GET') {

    // Buscar por ID
    if ($id) {
        try {
            $busca = $con->prepare("
                SELECT r.*, p.nome_pessoa
                FROM rotina r
                LEFT JOIN pessoa p ON r.id_pessoa = p.id_pessoa
                WHERE r.id_rotina = ?
            ");

            $busca->execute([$id]);
            $rotina = $busca->fetch(PDO::FETCH_ASSOC);

            if ($rotina) {
                http_response_code(200);
                echo json_encode($rotina);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Rotina não encontrada"]);
            }

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao buscar rotina", "details" => $e->getMessage()]);
        }
        exit;
    }

    // Buscar por título
    if (isset($_GET['titulo']) && $_GET['titulo'] !== '') {
        $titulo = '%' . $_GET['titulo'] . '%';

        try {
            $busca = $con->prepare("
                SELECT r.*, p.nome_pessoa
                FROM rotina r
                LEFT JOIN pessoa p ON r.id_pessoa = p.id_pessoa
                WHERE r.nome_rotina LIKE ? 
            ");

            $busca->execute([$titulo]);
            $rotinas = $busca->fetchAll(PDO::FETCH_ASSOC);

            http_response_code(200);
            echo json_encode($rotinas);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao buscar rotina por título", "details" => $e->getMessage()]);
        }
        exit;
    }

    // Buscar por nome da pessoa
    if (isset($_GET['nome']) && $_GET['nome'] !== '') {
        $nome = '%' . $_GET['nome'] . '%';

        try {
            $busca = $con->prepare("
                SELECT r.*, p.nome_pessoa
                FROM rotina r
                LEFT JOIN pessoa p ON r.id_pessoa = p.id_pessoa
                WHERE p.nome_pessoa LIKE ? 
            ");

            $busca->execute([$nome]);
            $rotinas = $busca->fetchAll(PDO::FETCH_ASSOC);

            http_response_code(200);
            echo json_encode($rotinas);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao buscar rotina por nome", "details" => $e->getMessage()]);
        }
        exit;
    }

}


/************************************************************
 * CREATE (POST)
 ************************************************************/
if ($method === 'POST') {
    try {
        $input = json_decode(file_get_contents('php://input'), true);

        $required = ['id_pessoa', 'nome_rotina', 'descricao_rotina', 'horario_rotina', 'ativa_rotina'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                http_response_code(400);
                echo json_encode(["error" => "Campo obrigatório ausente: $field"]);
                exit;
            }
        }

        $stmt = $con->prepare("
            INSERT INTO rotina (
                nome_rotina, descricao_rotina, horario_rotina, frequencia_rotina, ativa_rotina, id_pessoa, data_criacao_rotina
            ) VALUES (?, ?, ?, ?, ?, ?, NOW())
        ");

        $stmt->execute([
            $input['nome_rotina'],
            $input['descricao_rotina'],
            $input['horario_rotina'],
            $input['frequencia_rotina'] ?? null,
            $input['ativa_rotina'],
            $input['id_pessoa']
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Rotina criada com sucesso",
            "id" => $con->lastInsertId()
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "Erro ao criar rotina",
            "details" => $e->getMessage()
        ]);
    }

    exit;
}

/************************************************************
 * UPDATE (PUT)
 ************************************************************/
if ($method === 'PUT' && $id) {
    try {
        $putData = json_decode(file_get_contents("php://input"), true);

        if (!$putData) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Dados inválidos"]);
            exit;
        }

        $stmt = $con->prepare("
            UPDATE rotina SET
                nome_rotina = ?,
                descricao_rotina = ?,
                horario_rotina = ?,
                frequencia_rotina = ?,
                ativa_rotina = ?,
                id_pessoa = ?
            WHERE id_rotina = ?
        ");

        $stmt->execute([
            $putData['nome_rotina'],
            $putData['descricao_rotina'],
            $putData['horario_rotina'],
            $putData['frequencia_rotina'] ?? null,
            $putData['ativa_rotina'],
            $putData['id_pessoa'],
            $id
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Rotina atualizada",
            "rows_affected" => $stmt->rowCount()
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "Erro ao atualizar rotina",
            "details" => $e->getMessage()
        ]);
    }
    exit;
}

/************************************************************
 * DELETE
 ************************************************************/
if ($method === 'DELETE' && $id) {
    try {
        $stmt = $con->prepare("DELETE FROM rotina WHERE id_rotina = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            http_response_code(204);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Rotina não encontrada"]);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro ao excluir rotina", "details" => $e->getMessage()]);
    }
    exit;
}

?>

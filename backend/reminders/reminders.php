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

//LISTAGEM 
if (isset($_GET['op']) && $_GET['op'] === 'list') {
    try {
        $start  = intval($_POST['start'] ?? 0);
        $length = intval($_POST['length'] ?? 10);
        $pesquisa = isset($_POST['search']['value']) ? '%' . $_POST['search']['value'] . '%' : '%%';

        $orderColumnIndex = $_POST['order'][0]['column'] ?? 1;
        $orderDir = $_POST['order'][0]['dir'] ?? 'asc';

        $colunas = [
            "l.id_lembrete",
            "l.titulo_lembrete",
            "l.descricao_lembrete",
            "l.horario_lembrete",
            "l.repeticao_lembrete",
            "l.prioridade_lembrete",
            "l.status_lembrete",
            "l.data_criacao_lembrete",
            "p.nome_pessoa"
        ];

        $orderColumn = $colunas[$orderColumnIndex] ?? "l.titulo_lembrete";

        $sql = "
            SELECT
                l.id_lembrete,
                l.titulo_lembrete,
                l.descricao_lembrete,
                l.horario_lembrete,
                l.repeticao_lembrete,
                l.prioridade_lembrete,
                l.status_lembrete,
                l.data_criacao_lembrete,
                p.nome_pessoa
            FROM lembrete l
            LEFT JOIN pessoa p ON l.id_pessoa = p.id_pessoa
            WHERE l.titulo_lembrete LIKE ? OR p.nome_pessoa LIKE ?
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

    // Parâmetros opcionais
    $id = $_GET['id'] ?? null;
    $titulo = $_GET['titulo'] ?? null;
    $nome = $_GET['nome'] ?? null;

    try {
        // 🔍 1) Busca por ID
        if ($id) {
            $sql = "
                SELECT l.*, p.nome_pessoa
                FROM lembrete l
                LEFT JOIN pessoa p ON l.id_pessoa = p.id_pessoa
                WHERE l.id_lembrete = ?
            ";
            $stmt = $con->prepare($sql);
            $stmt->execute([$id]);
        }
        // 🔍 2) Busca por título
        elseif ($titulo) {
            $sql = "
                SELECT l.*, p.nome_pessoa
                FROM lembrete l
                LEFT JOIN pessoa p ON l.id_pessoa = p.id_pessoa
                WHERE l.titulo_lembrete LIKE ?
            ";
            $stmt = $con->prepare($sql);
            $stmt->execute(["%$titulo%"]);
        }
        // 🔍 3) Busca por nome da pessoa
        elseif ($nome) {
            $sql = "
                SELECT l.*, p.nome_pessoa
                FROM lembrete l
                LEFT JOIN pessoa p ON l.id_pessoa = p.id_pessoa
                WHERE p.nome_pessoa LIKE ?
            ";
            $stmt = $con->prepare($sql);
            $stmt->execute(["%$nome%"]);
        }
        // Nenhum parâmetro foi enviado
        else {
            http_response_code(400);
            echo json_encode(["error" => "Envie id, titulo ou nome para buscar."]);
            exit;
        }

        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($resultado) {
            http_response_code(200);
            echo json_encode($resultado);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Nenhum lembrete encontrado"]);
        }

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro ao buscar lembrete", "details" => $e->getMessage()]);
    }

    exit;
}


/************************************************************
 * CREATE (POST)
 ************************************************************/
/************************************************************
 * CREATE (POST)
 ************************************************************/
if ($method === 'POST') {
    try {
        // Recebe JSON enviado pelo React
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            http_response_code(400);
            echo json_encode(["error" => "Dados inválidos ou JSON mal formatado"]);
            exit;
        }

        // Campos obrigatórios mínimos
        $required = ['id_pessoa', 'titulo_lembrete', 'descricao_lembrete', 'horario_lembrete'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || trim($input[$field]) === '') {
                http_response_code(400);
                echo json_encode(["error" => "Campo obrigatório ausente: $field"]);
                exit;
            }
        }

        // Define valores padrão se não existirem
        $prioridade = $input['prioridade_lembrete'] ?? 'medium';
        $status = $input['status_lembrete'] ?? 'pendent';
        $repeticao = $input['repeticao_lembrete'] ?? 'custom';

        // Inserção
        $stmt = $con->prepare("
            INSERT INTO lembrete (
                titulo_lembrete,
                descricao_lembrete,
                horario_lembrete,
                repeticao_lembrete,
                prioridade_lembrete,
                status_lembrete,
                id_pessoa,
                data_criacao_lembrete
            ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        ");

        $stmt->execute([
            $input['titulo_lembrete'],
            $input['descricao_lembrete'],
            $input['horario_lembrete'],
            $repeticao,
            $prioridade,
            $status,
            $input['id_pessoa']
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Lembrete criado com sucesso",
            "id" => $con->lastInsertId()
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "Erro ao criar lembrete",
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
        $stmt = $con->prepare("DELETE FROM lembrete WHERE id_lembrete = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            http_response_code(204);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Lembrete não encontrado"]);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro ao excluir lembrete", "details" => $e->getMessage()]);
    }
    exit;
}
?>

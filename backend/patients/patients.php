<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Preflight
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
        if ($id) {
            $sql = "
                SELECT p.*, c.nome_cidade 
                FROM pessoa p
                LEFT JOIN cidades c ON p.id_cidade = c.id_cidade
                WHERE p.id_pessoa = ?
            ";
            $stmt = $con->prepare($sql);
            $stmt->execute([$id]);
            $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $start  = isset($_POST['start'])  ? intval($_POST['start']) : 0;
            $length = isset($_POST['length']) ? intval($_POST['length']) : 10;
            $pesquisa = isset($_POST['search']['value']) ? '%' . $_POST['search']['value'] . '%' : '%%';

            $orderColumnIndex = $_POST['order'][0]['column'] ?? 1;
            $orderDir = ($_POST['order'][0]['dir'] ?? 'asc');

            $colunas = [ 
                "p.id_pessoa", 
                "p.nome_pessoa", 
                "p.sobrenome_pessoa", 
                "p.cpf_pessoa", 
                "p.data_nascimento_pessoa", 
                "p.telefone_pessoa", 
                "p.endereco_pessoa", 
                "c.id_cidade", 
                "p.data_cadastro_pessoa" 
            ];

            $orderColumn = $colunas[$orderColumnIndex] ?? "p.nome_pessoa";

            $sql = "
                SELECT 
                    p.id_pessoa, 
                    p.nome_pessoa, 
                    p.sobrenome_pessoa, 
                    p.cpf_pessoa, 
                    p.data_nascimento_pessoa, 
                    p.telefone_pessoa, 
                    p.endereco_pessoa, 
                    p.data_cadastro_pessoa, 
                    c.nome_cidade 
                FROM pessoa p 
                LEFT JOIN cidades c ON p.id_cidade = c.id_cidade 
                WHERE p.nome_pessoa LIKE ?
                ORDER BY $orderColumn $orderDir
                LIMIT $start, $length
            ";

            $stmt = $con->prepare($sql);
            $stmt->execute([$pesquisa]);
            $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

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
 * DELETE
 ************************************************************/
if ($method === 'DELETE' && $id) {
    try {
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            exit;
        }

        $stmt = $con->prepare("DELETE FROM pessoa WHERE id_pessoa = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            http_response_code(204);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Paciente não encontrado"]);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro ao excluir paciente", "details" => $e->getMessage()]);
    }
    exit;
}


/************************************************************
 * GET (Buscar por ID)
 ************************************************************/
if ($method === 'GET' && $id) {
    try {
        $busca = $con->prepare("
            SELECT p.*, c.nome_cidade 
            FROM pessoa p
            LEFT JOIN cidades c ON p.id_cidade = c.id_cidade
            WHERE p.id_pessoa = ?
        ");

        $busca->execute([$id]);
        $patient = $busca->fetch(PDO::FETCH_ASSOC);

        if ($patient) {
            http_response_code(200);
            echo json_encode($patient);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Paciente não encontrado"]);
        }

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro ao buscar paciente", "details" => $e->getMessage()]);
    }
    exit;
}


/************************************************************
 * CREATE (POST)
 ************************************************************/
if ($method === 'POST') {
    try {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!is_array($input)) {
            http_response_code(400);
            echo json_encode(["error" => "JSON inválido"]);
            exit;
        }

        // Campos obrigatórios (data_nascimento agora NÃO É obrigatória)
        $required = [
            'nome_pessoa',
            'sobrenome_pessoa',
            'cpf_pessoa',
            'telefone_pessoa',
            'endereco_pessoa',
            'id_cidade'
        ];

        foreach ($required as $field) {
            if (!isset($input[$field]) || trim($input[$field]) === '') {
                http_response_code(400);
                echo json_encode(["error" => "Campo obrigatório ausente: $field"]);
                exit;
            }
        }

        // CPF: somente números
        if (!preg_match("/^[0-9]{11}$/", $input['cpf_pessoa'])) {
            http_response_code(400);
            echo json_encode(["error" => "CPF inválido — use 11 dígitos numéricos"]);
            exit;
        }

        // Data: aceitar "" ou null
        $dataNasc = (!empty($input['data_nascimento_pessoa']))
            ? $input['data_nascimento_pessoa']
            : null;

        $stmt = $con->prepare("
            INSERT INTO pessoa 
            (nome_pessoa, sobrenome_pessoa, cpf_pessoa, data_nascimento_pessoa,
             telefone_pessoa, endereco_pessoa, id_cidade, data_cadastro_pessoa)
            VALUES (:nome, :sobrenome, :cpf, :data_nasc, :telefone, :endereco, :cidade, NOW())
        ");

        $stmt->execute([
            ":nome"      => $input['nome_pessoa'],
            ":sobrenome" => $input['sobrenome_pessoa'],
            ":cpf"       => $input['cpf_pessoa'],
            ":data_nasc" => $dataNasc,
            ":telefone"  => $input['telefone_pessoa'],
            ":endereco"  => $input['endereco_pessoa'],
            ":cidade"    => $input['id_cidade']
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Paciente criado com sucesso",
            "id" => (int)$con->lastInsertId()
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "Erro ao criar paciente",
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
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            exit;
        }

        $putData = json_decode(file_get_contents("php://input"), true);

        if (!is_array($putData)) {
            http_response_code(400);
            echo json_encode(["error" => "JSON inválido"]);
            exit;
        }

        $allowedFields = [
            "nome_pessoa",
            "sobrenome_pessoa",
            "telefone_pessoa",
            "endereco_pessoa",
            "id_cidade",
            "data_nascimento_pessoa" // adicionado no PUT!
        ];

        $updateFields = [];
        foreach ($allowedFields as $field) {
            if (array_key_exists($field, $putData)) {
                $updateFields[$field] =
                    ($field === "data_nascimento_pessoa" && $putData[$field] === "")
                    ? null
                    : $putData[$field];
            }
        }

        if (count($updateFields) === 0) {
            http_response_code(400);
            echo json_encode(["error" => "Nenhum campo válido enviado para atualização"]);
            exit;
        }

        $setSql = implode(", ", array_map(fn($f) => "$f = ?", array_keys($updateFields)));

        $stmt = $con->prepare("
            UPDATE pessoa SET $setSql WHERE id_pessoa = ?
        ");

        $values = array_values($updateFields);
        $values[] = $id;

        $stmt->execute($values);

        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(["message" => "Paciente atualizado com sucesso"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Paciente não encontrado ou sem alterações"]);
        }

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro ao atualizar paciente", "details" => $e->getMessage()]);
    }

    exit;
}

?>

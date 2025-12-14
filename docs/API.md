# API Reference

Esta página descreve os endpoints PHP disponíveis em `backend/`.

Base URL (local): http://localhost/<path-to-backend>

## `/backend/patients/patients.php`
- Methods: GET, POST, PUT, DELETE
- Query params: `id` (opcional), `op=list` para listagem paginada (DataTables)
- POST: cria paciente — JSON esperado: `nome_pessoa`, `sobrenome_pessoa`, `cpf_pessoa` (11 dígitos), `telefone_pessoa`, `endereco_pessoa`, `id_cidade`, `data_nascimento_pessoa` (opcional)
- PUT: atualizar por `id` — enviar JSON com campos a atualizar
- DELETE: remover por `id`

## `/backend/reminders/reminders.php`
- Methods: GET, POST, DELETE
- GET: buscar por `id`, `titulo` ou `nome` de pessoa
- POST: criar lembrete — JSON esperado: `id_pessoa`, `titulo_lembrete`, `descricao_lembrete`, `horario_lembrete`, `prioridade_lembrete` (opcional), `status_lembrete` (opcional), `repeticao_lembrete` (opcional)
- DELETE: remover por `id`

## `/backend/routines/routines.php`
- Methods: GET, POST, PUT, DELETE
- GET: buscar por `id`, `titulo` (nome_rotina) ou `nome` da pessoa
- POST: criar rotina — JSON: `id_pessoa`, `nome_rotina`, `descricao_rotina`, `horario_rotina`, `ativa_rotina` (boolean/0|1)
- PUT: atualizar por `id`
- DELETE: remover por `id`

## `/backend/cities/cities.php`
- Method: GET
- Retorna lista de cidades: `id_cidade`, `nome_cidade`

## `/backend/combo.php`
- Method: GET
- Parâmetros: `tb`, `id`, `nome` — retorna registros de uma tabela genérica (útil para selects dinâmicos)

## Observações
- As rotas usam headers CORS; algumas permitem apenas `http://localhost:8080` (frontend dev). Ajuste conforme necessário.
- Erros são retornados em JSON com códigos HTTP apropriados.

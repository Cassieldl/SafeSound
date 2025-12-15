# 🛡️ SafeSound

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-blue)
![Backend](https://img.shields.io/badge/backend-PHP%20%2B%20MySQL-purple)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blueviolet)

**SafeSound** é um sistema voltado ao **gerenciamento de pacientes**, **rotinas** e **lembretes**, com foco no cuidado e acompanhamento de idosos.  
O projeto foi desenvolvido como parte do **curso Técnico em Informática** pela **SETREM (Sociedade Educacional de Três de Maio)**.

A aplicação utiliza um **frontend moderno com React + TypeScript** e um **backend em PHP com MySQL**, seguindo uma arquitetura simples de API REST.

---

## 📌 Tecnologias Utilizadas

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- PHP
- MySQL
- API REST

---

## 🚀 Funcionalidades

- Cadastro de pacientes
- Listagem e consulta de pacientes
- Atualização de dados cadastrais
- Exclusão de registros
- Comunicação frontend ↔ backend via API REST

---

## 📁 Estrutura do Projeto
SafeSound/
├── backend/ # Backend em PHP (API)
│ └── patients/
│ └── patients.php
├── docs/ # Documentações do projeto
├── public/ # Arquivos públicos
├── src/ # Código-fonte React
│ ├── pages/
│ ├── components/
│ └── services/
├── .gitignore
├── package.json
├── tailwind.config.ts
└── vite.config.ts


---

## 🧠 Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- **Node.js**
- **PHP**
- **MySQL**
- Servidor local (XAMPP, Laragon ou similar)

---

## 🛠️ Como Rodar o Projeto

### 1️⃣ Frontend

Instale as dependências:
npm install

Execute o projeto:
npm run dev

O frontend estará disponível em:
htdocs/safesound/backend/


---


🔗 Documentação da API – Patients
http://localhost/safesound/backend/patients/patients.php

🔹 Listar todos os pacientes (GET)
http://localhost/safesound/backend/patients/patients.php?op=list
📌 Retorna a lista completa de pessoas cadastradas.

---

🔹 Criar novo paciente (POST)
http://localhost/safesound/backend/patients/patients.php

📦 Exemplo de corpo da requisição (JSON):
{
  "nome_pessoa": "Teste",
  "sobrenome_pessoa": "Teste",
  "cpf_pessoa": "12345678910",
  "data_nascimento_pessoa": "2025-12-15",
  "telefone_pessoa": "5599999999",
  "endereco_pessoa": "Rua Teste, 123",
  "id_cidade": 1
}
📌 Campos obrigatórios devem ser informados corretamente.

---

🔹 Atualizar paciente (PUT)
http://localhost/safesound/backend/patients/patients.php?id=5

📦 Exemplo de corpo da requisição (JSON):
{
  "nome_pessoa": "Teste",
  "sobrenome_pessoa": "Modificar",
  "telefone_pessoa": "5588888888",
  "endereco_pessoa": "Rua dos testes, 321",
  "id_cidade": 3
}
📌 Atualiza apenas os campos enviados.

---

🔹 Excluir paciente (DELETE)
http://localhost/safesound/backend/patients/patients.php?id=23
📌 Exclusão realizada via parâmetro na URL.

---


## 🗄️ Estrutura do Banco de Dados

📌 Criação do banco de dados
CREATE DATABASE `safesound` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

📍 Cidades
CREATE TABLE `cidades` (
  `id_cidade` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cidade` varchar(255) NOT NULL,
  `uf` char(2) DEFAULT NULL,
  `cep` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_cidade`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

👴 Pacientes
CREATE TABLE `pessoa` (
  `id_pessoa` int(11) NOT NULL AUTO_INCREMENT,
  `nome_pessoa` varchar(100) NOT NULL,
  `sobrenome_pessoa` varchar(100) NOT NULL,
  `cpf_pessoa` char(11) NOT NULL,
  `genero_pessoa` enum('Masculino','Feminino','Outro') NOT NULL,
  `data_nascimento_pessoa` date DEFAULT NULL,
  `telefone_pessoa` varchar(12) DEFAULT NULL,
  `data_cadastro_pessoa` timestamp NOT NULL DEFAULT current_timestamp(),
  `endereco_pessoa` varchar(255) DEFAULT NULL,
  `id_cidade` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_pessoa`),
  UNIQUE KEY `cpf_pessoa` (`cpf_pessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

⚠️ Lembrete
CREATE TABLE `lembrete` (
  `id_lembrete` int(11) NOT NULL AUTO_INCREMENT,
  `id_pessoa` int(11) NOT NULL,
  `titulo_lembrete` varchar(120) NOT NULL,
  `descricao_lembrete` text DEFAULT NULL,
  `horario_lembrete` datetime NOT NULL,
  `repeticao_lembrete` varchar(45) DEFAULT 'Unico',
  `prioridade_lembrete` varchar(45) DEFAULT 'Baixa',
  `status_lembrete` varchar(45) DEFAULT 'Pendente',
  `data_criacao_lembrete` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_lembrete`),
  KEY `id_pessoa` (`id_pessoa`),
  CONSTRAINT `lembrete_ibfk_1` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id_pessoa`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

♾️ Rotina
CREATE TABLE `rotina` (
  `id_rotina` int(11) NOT NULL AUTO_INCREMENT,
  `id_pessoa` int(11) NOT NULL,
  `nome_rotina` varchar(120) NOT NULL,
  `descricao_rotina` text DEFAULT NULL,
  `horario_rotina` time NOT NULL,
  `frequencia_rotina` varchar(45) NOT NULL,
  `ativa_rotina` tinyint(1) DEFAULT 1,
  `data_criacao_rotina` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_rotina`),
  KEY `id_pessoa` (`id_pessoa`),
  CONSTRAINT `rotina_ibfk_1` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id_pessoa`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


---

## 📚 Documentação Adicional

A pasta docs/ contém informações complementares sobre:
Estrutura da aplicação
Padrões adotados
Organização do código

## 🎓 Sobre o Projeto
Projeto desenvolvido como atividade prática do Curso Técnico em Informática – SETREM, com foco em integração frontend/backend e aplicação de conceitos de desenvolvimento web.

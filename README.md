🎟️ PQN Ticket – Sistema de Check-in e Cadastro de Participantes
-

Projeto desenvolvido para gerenciar o cadastro e check-in de participantes para um organizador de pequenos eventos sociais.
A aplicação é dividida em duas partes:

- Backend (API REST em Node.js + MySQL)

- Frontend (Interface em React.js)

    🚀 Funcionalidades

✅ Cadastro de participantes com geração automática de código único

✅ Listagem de todos os participantes cadastrados

✅ Check-in de participantes através do código

✅ Exibição dos dados do participante após o check-in

✅ Design Frontend simples e intuitivo

⚙️ Tecnologias Utilizadas
-
- Backend:

Node.js

Express.js

MySQL

dotenv

mysql2 (Promise Pool)

- Frontend:

React.js

Axios

React Router

HTML5 / CSS3

JavaScript (ES6+)

🛠️ Como Executar o Projeto
-
🔹 1. Clonar o repositório
git clone https://github.com/seuusuario/pqn-ticket.git

🔹 2. Configurar o banco de dados

🔹 3. Importe o script do banco de dados localizado em, mysql-init/init.sql
(Via Workbench ou shell):

🔹 4. Configurar variáveis de ambiente (.env)

🔹 Na raiz do diretório PQN-Api/, crie o arquivo .env (seguindo o .env.example):


🧠 Backend (API)
-
- 📦 Instalação

1. `cd PQN-Api`

2. `npm install`

▶️ Executar

3. `npm start`


A API rodará em:
👉 http://localhost:3000

🔍 Rotas principais

Método / Rota / Descrição

POST	/api/participants -> *Cadastrar participante*

GET	    /api/participants -> *Listar todos os participantes*

GET	    /api/participants/:codigo -> *Buscar participante pelo código*

PATCH	/api/checkin/:codigo -> *Fazer check-in de um participante*

💻 Frontend (React)
-

- 📦 Instalação

1. `cd PQN-Interface`

2. `npm install`

▶️ Executar

2. `npm run dev`

    A aplicação estará em: 👉 http://localhost:5173 (ou porta definida pelo Vite)

🧾 Fluxo da Aplicação
-
1. Cadastro/Login de Administrador
2. Acessar o Dashboard
3. Cadastrar participante: Informe nome e telefone.
4. O sistema gera automaticamente um código único, exibido na tela.
5. Fazer Check-in: Digite o código gerado.
6. O sistema confirma o check-in e mostra os dados do participante.

7. Listagem: Exibe todos os participantes cadastrados e seus status de check-in.
----------

- 👨‍💻 Desenvolvido por

Miguel Garrido Souza - www.linkedin.com/in/miguel-garrido-dev

📘 Projeto PQN – Pequeno

📅 2025

# Node.js MVC API — SQLite

API REST desenvolvida com Node.js, Express e SQLite, utilizando a arquitetura MVC para organizar rotas, controllers e models.

## Tecnologias

- Node.js
- Express
- SQLite
- JWT para autenticação
- bcrypt para hash de senhas
- Docker e Docker Compose

## Funcionalidades

- Cadastro e login de usuários
- Autenticação por JWT
- Consulta de usuários
- Consulta de usuário por ID
- Consulta do próprio perfil
- Atualização e exclusão de usuários
- Proteção de rotas com middleware de autenticação

## Estrutura do projeto

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── server.js
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .env
├── .gitignore
├── .dockerignore
└── package.json
```

## Configuração

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto e configure as variáveis utilizadas pela aplicação. Por exemplo:

```env
PORT=3000
JWT_SECRET=sua_chave_secreta
```

Use uma chave secreta própria e não publique o arquivo `.env`.

## Executar localmente

```bash
node src/server.js
```

Por padrão, a API estará disponível em `http://localhost:3000`, caso essa seja a porta configurada.

## Docker

Os comandos a seguir devem ser executados na raiz de `backend/`.

### Construir a imagem

```bash
sudo docker build -t node-express-sqlite-mvc:latest -f docker/Dockerfile .
```

### Executar o container diretamente

```bash
sudo docker run -d --name node-express-sqlite-docker -p 3004:3000 --env-file .env node-express-sqlite-mvc:latest
```

A API ficará disponível em `http://localhost:3004`.

### Executar com Docker Compose

```bash
sudo docker-compose -f docker/docker-compose.yml up -d
```

### Consultar logs

```bash
sudo docker logs node-express-sqlite-docker
```

### Parar o container

```bash
sudo docker stop node-express-sqlite-docker
```

### Remover o container

```bash
sudo docker rm node-express-sqlite-docker
```

## Observações

- O arquivo `.env` contém configurações privadas e não deve ser versionado.
- A imagem Docker é construída separadamente do Docker Compose.
- Verifique a configuração do caminho do SQLite para garantir que o banco seja armazenado corretamente no ambiente de execução.

## Objetivo

Projeto de estudo para praticar desenvolvimento de APIs REST com Node.js, arquitetura MVC, autenticação JWT, banco de dados SQLite e containerização com Docker.

# Contexto Técnico do Projeto - API Pizzaria

## 1. Visão Geral

Esta aplicação é uma API REST construída com Node.js + TypeScript para gerenciamento de usuários e operações iniciais da pizzaria (autenticação, perfil e cadastro de categorias).

- Base path da API: `/api`
- Formato de dados: JSON
- Banco de dados: PostgreSQL
- ORM: Prisma
- Validação de entrada: Zod
- Autenticação: JWT

---

## 2. Arquitetura da Aplicação

### 2.1 Padrão utilizado

A aplicação segue um padrão em camadas, com separação de responsabilidades:

1. `Routes`:
- Define os endpoints.
- Encadeia middlewares.
- Direciona para controllers.

2. `Controllers`:
- Recebem `req` e `res`.
- Extraem dados da requisição.
- Delegam regras de negócio para services.
- Retornam resposta HTTP.

3. `Services`:
- Implementam lógica de negócio.
- Fazem validações de regra de domínio (ex.: duplicidade de categoria/usuário).
- Executam operações no banco via Prisma.

4. `Prisma Client`:
- Camada de acesso a dados.
- Conexão com PostgreSQL usando `@prisma/adapter-pg`.

5. `Middlewares`:
- Validação de schema.
- Autenticação JWT.
- Autorização por perfil (admin).

### 2.2 Fluxo entre camadas (macro)

1. A requisição entra pela rota.
2. Middlewares de validação/autenticação/autorização são executados.
3. O controller recebe a requisição e chama o service.
4. O service aplica regras de negócio e consulta/persiste dados no banco.
5. O service retorna os dados para o controller.
6. O controller envia a resposta HTTP final.

---

## 3. Organização de Pastas

```text
api_pizzaria/
  package.json
  prisma.config.ts
  tsconfig.json
  prisma/
    schema.prisma
    migrations/
      20260412155611_create_tables/
        migration.sql
  src/
    server.ts
    routes.ts
    prisma/
      index.ts
    controller/
      user/
        createUserController.ts
        authUserController.ts
        DetailUserControler.ts
      category/
        CrateCategoryController.ts
    services/
      user/
        CreateUserService.ts
        authUserService.ts
        DetailUserService.ts
      category/
        CreateCategoryService.ts
    middlewares/
      validateSchema.ts
      isAuthenticated.ts
      isAdmin.ts
    schemas/
      userSchema.ts
      categorySchema.ts
    @types/
      express/
        index.d.ts
    generated/
      prisma/
        ... (artefatos gerados do Prisma)
```

### 3.1 Responsabilidade por pasta

- `src/server.ts`: bootstrap da aplicação Express, CORS, parsers e error handler global.
- `src/routes.ts`: definição de rotas e pipeline de middlewares por endpoint.
- `src/controller`: interface HTTP (entrada/saída).
- `src/services`: regras de negócio e acesso ao banco.
- `src/middlewares`: segurança e validação transversal.
- `src/schemas`: schemas Zod para contratos de entrada.
- `src/prisma/index.ts`: instanciação do PrismaClient.
- `prisma/schema.prisma`: modelagem da base.
- `prisma/migrations`: histórico SQL versionado.
- `src/generated/prisma`: cliente Prisma gerado automaticamente.

---

## 4. Tecnologias e Versões

### 4.1 Runtime e linguagem

- Node.js (runtime, versão não fixada em arquivo)
- TypeScript `^6.0.2`

### 4.2 Dependências principais

- express `^5.2.1`
- cors `^2.8.6`
- dotenv `^17.4.1`
- zod `^4.3.6`
- jsonwebtoken `^9.0.3`
- bcryptjs `^3.0.3`
- prisma `^7.7.0`
- @prisma/client `^7.7.0`
- @prisma/adapter-pg `^7.7.0`
- pg `^8.20.0`
- tsx `^4.21.0`

### 4.3 Dependências de tipos (dev)

- @types/express `^5.0.6`
- @types/jsonwebtoken `^9.0.10`
- @types/node `^25.6.0`
- @types/pg `^8.20.0`
- @types/cors `^2.8.19`

### 4.4 Scripts disponíveis

- `npm run dev`: sobe API em modo watch (`tsx watch src/server.ts`)
- `npm run build`: compilação TypeScript (`tsc -p tsconfig.json`)
- `npm run start`: executa build (`node dist/server.js`)

---

## 5. Modelagem de Banco de Dados

A modelagem está definida em `prisma/schema.prisma`.

### 5.1 Enum

- `Role`: `STAFF | ADMIN`

### 5.2 Entidades

1. `User` (tabela `users`)
- `id` (PK, UUID)
- `name` (string)
- `email` (string, único)
- `password` (string, hash bcrypt)
- `role` (enum `Role`, default `STAFF`)
- `createdAt`, `updatedAt`

2. `Category` (tabela `categories`)
- `id` (PK, UUID)
- `name` (string, único)
- `createdAt`, `updatedAt`
- Relacionamento: 1:N com `Product`

3. `Product` (tabela `products`)
- `id` (PK, UUID)
- `name` (string)
- `price` (int)
- `description` (string)
- `banner` (string)
- `disable` (boolean, default `false`)
- `category_id` (FK -> `categories.id`)
- `createdAt`, `updatedAt`
- Relacionamentos:
  - N:1 com `Category`
  - 1:N com `OrderItem`

4. `Order` (tabela `orders`)
- `id` (PK, UUID)
- `table` (int)
- `status` (boolean, default `false`)
- `draft` (boolean, default `true`)
- `name` (string opcional)
- `createdAt`, `updatedAt`
- Relacionamento: 1:N com `OrderItem`

5. `OrderItem` (tabela `order_items`)
- `id` (PK, UUID)
- `order_id` (FK -> `orders.id`)
- `product_id` (FK -> `products.id`)
- `amount` (int)
- `createdAt`, `updatedAt`

### 5.3 Relacionamentos e regras

- `Category` -> `Product`: `onDelete: Cascade`
- `Order` -> `OrderItem`: `onDelete: Cascade`
- `Product` -> `OrderItem`: `onDelete: Cascade`
- Índices únicos:
  - `users.email`
  - `categories.name`

---

## 6. Endpoints da API

Base URL local (exemplo): `http://localhost:{PORT}/api`

### 6.1 Criar usuário

- Método e rota: `POST /users`
- Middlewares:
  - `validateSchema(createUserSchema)`
- Objetivo: criar conta de usuário com senha criptografada.

#### Requisição

```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "123456"
}
```

#### Resposta de sucesso (201)

```json
{
  "id": "a8f2b1d0-2b4a-4b20-8d1f-a3c9d6f25c53",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "Role": "STAFF",
  "createdAt": "2026-04-14T12:00:00.000Z"
}
```

#### Possíveis erros

- 400: validação Zod
- 400: usuário já existe

### 6.2 Autenticar usuário (login)

- Método e rota: `POST /session`
- Middlewares:
  - `validateSchema(authUserSchema)`
- Objetivo: autenticar usuário e emitir JWT.

#### Requisição

```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

#### Resposta de sucesso (200)

```json
{
  "id": "a8f2b1d0-2b4a-4b20-8d1f-a3c9d6f25c53",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "Role": "STAFF",
  "createdAt": "2026-04-14T12:00:00.000Z",
  "token": "eyJhbGciOi..."
}
```

#### Possíveis erros

- 400: validação Zod
- 400: usuário não encontrado
- 400: senha incorreta

### 6.3 Detalhar usuário autenticado

- Método e rota: `GET /me`
- Middlewares:
  - `isAuthenticated`
- Objetivo: retornar dados do usuário autenticado.

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Resposta de sucesso (200)

```json
{
  "id": "a8f2b1d0-2b4a-4b20-8d1f-a3c9d6f25c53",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "Role": "STAFF",
  "createdAt": "2026-04-14T12:00:00.000Z"
}
```

#### Possíveis erros

- 401: token não fornecido
- 401: token inválido
- 400: erro retornado pelo fluxo de service

### 6.4 Criar categoria

- Método e rota: `POST /categories`
- Middlewares (ordem de execução):
  1. `isAuthenticated`
  2. `isAdmin`
  3. `validateSchema(createCategorySchema)`
- Objetivo: criar categoria (somente admin).

#### Headers

```http
Authorization: Bearer <token_jwt_admin>
```

#### Requisição

```json
{
  "name": "Bebidas"
}
```

#### Resposta de sucesso (201)

```json
{
  "id": "b6221375-3701-42f4-b840-8f4a579791f2",
  "name": "Bebidas",
  "createdAt": "2026-04-14T12:00:00.000Z"
}
```

#### Possíveis erros

- 401: não autenticado
- 403: usuário não é admin
- 400: validação Zod
- 400: categoria já existe

---

## 7. Validação de Dados

A validação é feita por Zod, aplicada no middleware `validateSchema`.

### 7.1 Schemas atuais

1. `createUserSchema`
- `name`: string, obrigatório, mínimo 1 caractere
- `email`: formato de email válido
- `password`: string, obrigatório, mínimo 6 caracteres

2. `authUserSchema`
- `email`: formato de email válido
- `password`: string, mínimo 6 caracteres

3. `createCategorySchema`
- `name`: string, obrigatório, mínimo 3 caracteres

### 7.2 Como a validação é aplicada

- A rota chama `validateSchema(schema)`.
- O middleware valida `body`, `query` e `params` com `parseAsync`.
- Em erro de validação, retorna HTTP 400 com estrutura:

```json
{
  "error": "Erro de validação",
  "details": [
    {
      "campo": "name",
      "message": "O nome é obrigatório"
    }
  ]
}
```

---

## 8. Middlewares e Responsabilidades

1. `validateSchema`
- Responsável por validação de contrato de entrada.
- Evita entrada inválida chegar ao controller.

2. `isAuthenticated`
- Lê header `Authorization`.
- Valida JWT com `JWT_SECRET`.
- Injeta `req.userId` com o `sub` do token.

3. `isAdmin`
- Usa `req.userId` para buscar usuário no banco.
- Garante que `user.role === "ADMIN"`.
- Bloqueia acesso para usuários sem privilégio.

4. Error handler global (`server.ts`)
- Trata erros não capturados.
- Retorna 400 para instâncias de `Error` e 500 para casos não mapeados.

---

## 9. Fluxo de Requisição Detalhado

### 9.1 Fluxo padrão (visão geral)

1. Cliente envia requisição para `/api/...`.
2. `server.ts` encaminha para `routes.ts`.
3. Middlewares da rota executam em ordem.
4. Controller recebe dados e chama service.
5. Service processa regra de negócio.
6. Service interage com Prisma e banco PostgreSQL.
7. Service retorna resultado ao controller.
8. Controller serializa resposta HTTP.
9. Se houver erro, pode ser tratado em controller/service ou pelo handler global.

### 9.2 Exemplo completo: `POST /categories`

1. Request chega em `/api/categories`.
2. `isAuthenticated` valida token e define `req.userId`.
3. `isAdmin` valida se o usuário tem role `ADMIN`.
4. `validateSchema(createCategorySchema)` valida payload.
5. `CreateCategoryController.handle` extrai `name`.
6. `CreateCategoryService.execute`:
- verifica se já existe categoria com mesmo nome;
- se existir, lança erro;
- se não existir, cria registro em `categories`.
7. Controller retorna `201` com dados da categoria criada.
8. Em falha, retorna mensagem de erro compatível com o fluxo.

---

## 10. Segurança e Configuração

### 10.1 Variáveis de ambiente esperadas

- `PORT`: porta HTTP da API.
- `DATABASE_URL`: conexão PostgreSQL usada pelo Prisma adapter.
- `JWT_SECRET`: chave para assinatura e validação de token JWT.

### 10.2 Medidas já implementadas

- Senhas com hash `bcrypt` (salt rounds = 8).
- JWT com expiração de 1 dia.
- Controle de acesso por role para endpoint administrativo.
- Validação de payload com Zod.

---

## 11. Observações Técnicas Relevantes

- O projeto já possui entidades no banco para produtos e pedidos, mas as rotas implementadas no momento cobrem somente usuários e categorias.
- Existe consistência de padrão Controller -> Service -> Prisma na maior parte do código.
- O cliente Prisma é gerado em `src/generated/prisma` com provider `prisma-client`.

---

## 12. Comandos Úteis de Desenvolvimento

```bash
npm install
npm run dev
npm run build
npm run start
```

Para evolução de banco (Prisma), usar fluxo de migrations no diretório `prisma/migrations`.

---

## 13. Resumo Executivo da Arquitetura Solicitada

- A requisição entra pela rota.
- O controller recebe a requisição e delega para o service.
- O service contém a lógica de negócio, realiza operações e comunicação com o banco de dados.
- O resultado retorna para o controller.
- O controller envia a resposta final ao usuário.

Este documento serve como referência central para manutenção e evolução da API.

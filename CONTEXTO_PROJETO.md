# Contexto Tecnico do Projeto - API Pizzaria

## 1. Visao Geral

Esta aplicacao e uma API REST construida com Node.js + TypeScript para gerenciamento de usuarios e operacoes iniciais da pizzaria.

Atualmente, os fluxos implementados cobrem:
- Usuarios: cadastro, autenticacao e perfil.
- Categorias: criacao e listagem.
- Produtos: criacao com upload de imagem (Cloudinary), listagem, listagem por categoria e desativacao.
- Pedidos: criacao, listagem, detalhamento, adicao/remocao de itens, remocao de pedido, envio para cozinha e finalizacao.

Informacoes base:
- Base path da API: `/api`
- Formatos de entrada: JSON e `multipart/form-data` (na criacao de produto)
- Banco de dados: PostgreSQL
- ORM: Prisma
- Validacao de entrada: Zod
- Autenticacao: JWT
- Upload de imagem: Multer (memoria) + Cloudinary

---

## 2. Arquitetura da Aplicacao

### 2.1 Padrao utilizado

A aplicacao segue padrao em camadas, com separacao de responsabilidades:

1. `Routes`
- Define endpoints.
- Encadeia middlewares.
- Direciona para controllers.

2. `Controllers`
- Recebem `req` e `res`.
- Extraem dados da requisicao.
- Delegam regra de negocio para services.
- Retornam resposta HTTP.

3. `Services`
- Implementam logica de negocio.
- Validam regras de dominio (duplicidade, existencia de categoria etc.).
- Executam operacoes no banco via Prisma.
- No fluxo de produto, fazem upload da imagem para Cloudinary.

4. `Prisma Client`
- Camada de acesso a dados.
- Conexao com PostgreSQL usando `@prisma/adapter-pg`.

5. `Middlewares`
- Validacao de schema.
- Autenticacao JWT.
- Autorizacao por perfil (admin).
- Upload de arquivo com Multer.

### 2.2 Fluxo entre camadas (macro)

1. A requisicao entra pela rota.
2. Middlewares de validacao/autenticacao/autorizacao/upload sao executados.
3. O controller chama o service.
4. O service aplica regras de negocio e persiste/consulta dados.
5. O service retorna o resultado para o controller.
6. O controller envia a resposta HTTP final.

---

## 3. Organizacao de Pastas

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
    config/
      cloudinary.ts
      multer.ts
    controller/
      user/
        createUserController.ts
        authUserController.ts
        DetailUserControler.ts
      category/
        CrateCategoryController.ts
        ListCategoryController.ts
      product/
        CrateProductController.ts
        ListProductController.ts
        ListProductsByCategoryController.ts
        DeleteProductControler.ts
      order/
        CreateOrderController.ts
        ListOrdersController.ts
        DetailOrderController.ts
        AddItemController.ts
        RemoveItemController.ts
        RemoveOrderController.ts
        SendOrderController.ts
        FinishOrderController.ts
    services/
      user/
        CreateUserService.ts
        authUserService.ts
        DetailUserService.ts
      category/
        CreateCategoryService.ts
        ListCategoryService.ts
      product/
        CreateProductService.ts
        ListProductService.ts
        ListProductsByCategoryService.ts
        DeleteProductService.ts
      order/
        CreateOrderService.ts
        ListOrdersService.ts
        DetailOrderService.ts
        AddItemOrderService.ts
        RemoveItemOrderService.ts
        RemoveOrderService.ts
        SendOrderService.ts
        FinishOrderService.ts
    middlewares/
      validateSchema.ts
      isAuthenticated.ts
      isAdmin.ts
    schemas/
      userSchema.ts
      categorySchema.ts
      productSchema.ts
      orderSchema.ts
    @types/
      express/
        index.d.ts
    generated/
      prisma/
        ... (artefatos gerados do Prisma)
```

### 3.1 Responsabilidade por pasta

- `src/server.ts`: bootstrap do Express, CORS, parsers e error handler global.
- `src/routes.ts`: definicao de rotas e ordem de middlewares por endpoint.
- `src/controller`: camada HTTP (entrada/saida).
- `src/services`: regras de negocio e acesso ao banco.
- `src/config`: configuracoes de infraestrutura (Cloudinary e Multer).
- `src/middlewares`: seguranca e validacao transversal.
- `src/schemas`: schemas Zod dos contratos de entrada.
- `src/prisma/index.ts`: instancia do Prisma Client com adapter PostgreSQL.
- `prisma/schema.prisma`: modelagem da base.
- `prisma/migrations`: historico SQL versionado.
- `src/generated/prisma`: cliente Prisma gerado automaticamente.

### 3.2 Controllers implementados

- User:
  - `createUserController`
  - `authUserController`
  - `DetailUserControler`
- Category:
  - `CreateCategoryController`
  - `ListCategoryController`
- Product:
  - `CreateProductController`
  - `ListProductController`
  - `ListProductsByCategoryController`
  - `DeleteProductController`
- Order:
  - `CreateOrderController`
  - `ListOrdersController`
  - `DetailOrderController`
  - `AddItemController`
  - `RemoveItemController`
  - `RemoveOrderController`
  - `SendOrderController`
  - `FinishOrderController`

### 3.3 Services implementados

- User:
  - `CreateUserService`
  - `AuthUserService`
  - `DetailUserService`
- Category:
  - `CreateCategoryService`
  - `ListCategoryService`
- Product:
  - `CreateProductService`
  - `ListProductService`
  - `ListProductsByCategoryService`
  - `DeleteProductService`
- Order:
  - `CreateOrderService`
  - `ListOrdersService`
  - `DetailOrderService`
  - `AddItemOrderService`
  - `RemoveItemOrderService`
  - `RemoveOrderService`
  - `SendOrderService`
  - `FinishOrderService`

### 3.4 Rotas implementadas (`/api`)

- `POST /users`
- `POST /session`
- `GET /me`
- `POST /categories`
- `GET /category`
- `POST /product`
- `GET /products`
- `GET /category/product`
- `DELETE /product`
- `POST /order`
- `GET /orders`
- `GET /order/detail`
- `POST /order/add`
- `DELETE /order/remove`
- `DELETE /order`
- `PUT /order/send`
- `PUT /order/finish`

---

## 4. Tecnologias e Versoes

### 4.1 Runtime e linguagem

- Node.js (runtime, versao nao fixada em arquivo)
- TypeScript `^6.0.2`

### 4.2 Dependencias principais

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
- multer `^2.1.1`
- cloudinary `^2.9.0`
- tsx `^4.21.0`

### 4.3 Dependencias de tipos (dev)

- @types/express `^5.0.6`
- @types/jsonwebtoken `^9.0.10`
- @types/multer `^2.1.0`
- @types/node `^25.6.0`
- @types/pg `^8.20.0`
- @types/cors `^2.8.19`

### 4.4 Scripts disponiveis

- `npm run dev`: sobe API em modo watch (`tsx watch src/server.ts`)
- `npm run build`: compilacao TypeScript (`tsc -p tsconfig.json`)
- `npm run start`: executa build (`node dist/server.js`)
- `npm run test`: placeholder atual (nao ha suite de testes implementada)

---

## 5. Modelagem de Banco de Dados

A modelagem esta definida em `prisma/schema.prisma`.

### 5.1 Enum

- `Role`: `STAFF | ADMIN`

### 5.2 Entidades

1. `User` (tabela `users`)
- `id` (PK, UUID)
- `name` (string)
- `email` (string, unico)
- `password` (string, hash bcrypt)
- `role` (enum `Role`, default `STAFF`)
- `createdAt`, `updatedAt`

2. `Category` (tabela `categories`)
- `id` (PK, UUID)
- `name` (string, unico)
- `createdAt`, `updatedAt`
- Relacionamento: 1:N com `Product`

3. `Product` (tabela `products`)
- `id` (PK, UUID)
- `name` (string)
- `price` (int)
- `description` (string)
- `banner` (string: URL da imagem no Cloudinary)
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
- Indices unicos:
  - `users.email`
  - `categories.name`

---

## 6. Endpoints da API

Base URL local (exemplo): `http://localhost:{PORT}/api`

### 6.0 Mapa rapido de rotas atuais

- `POST /users` - Criar usuario
- `POST /session` - Autenticar usuario
- `GET /me` - Detalhar usuario autenticado
- `POST /categories` - Criar categoria (admin)
- `GET /category` - Listar categorias
- `POST /product` - Criar produto com imagem (admin)
- `GET /products` - Listar produtos
- `GET /category/product` - Listar produtos por categoria
- `DELETE /product` - Desativar produto (admin)
- `POST /order` - Criar pedido
- `GET /orders` - Listar pedidos
- `GET /order/detail` - Detalhar pedido
- `POST /order/add` - Adicionar item ao pedido
- `DELETE /order/remove` - Remover item do pedido
- `DELETE /order` - Remover pedido
- `PUT /order/send` - Enviar pedido para cozinha
- `PUT /order/finish` - Finalizar pedido

### 6.1 Criar usuario

- Metodo e rota: `POST /users`
- Middlewares:
  - `validateSchema(createUserSchema)`
- Objetivo: criar conta de usuario com senha criptografada.

#### Requisicao (JSON)

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

#### Possiveis erros

- 400: validacao Zod
- 400: usuario ja existe

### 6.2 Autenticar usuario (login)

- Metodo e rota: `POST /session`
- Middlewares:
  - `validateSchema(authUserSchema)`
- Objetivo: autenticar usuario e emitir JWT.

#### Requisicao (JSON)

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

#### Possiveis erros

- 400: validacao Zod
- 400: usuario nao encontrado
- 400: senha incorreta

### 6.3 Detalhar usuario autenticado

- Metodo e rota: `GET /me`
- Middlewares:
  - `isAuthenticated`
- Objetivo: retornar dados do usuario autenticado.

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

#### Possiveis erros

- 401: token nao fornecido
- 401: token invalido
- 400: erro retornado pelo fluxo de service

### 6.4 Criar categoria

- Metodo e rota: `POST /categories`
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `isAdmin`
  3. `validateSchema(createCategorySchema)`
- Objetivo: criar categoria (somente admin).

#### Headers

```http
Authorization: Bearer <token_jwt_admin>
```

#### Requisicao (JSON)

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

#### Possiveis erros

- 401: nao autenticado
- 403: usuario nao e admin
- 400: validacao Zod
- 400: categoria ja existe

### 6.5 Listar categorias

- Metodo e rota: `GET /category`
- Middlewares:
  - `isAuthenticated`
- Objetivo: retornar categorias cadastradas no banco (ordenadas por `createdAt` desc).

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Resposta de sucesso (200)

```json
[
  {
    "id": "b6221375-3701-42f4-b840-8f4a579791f2",
    "name": "Bebidas",
    "createdAt": "2026-04-14T12:00:00.000Z"
  },
  {
    "id": "d58f31d9-c8f4-4f2e-a8e5-8f8152a2dc9a",
    "name": "Pizzas",
    "createdAt": "2026-04-13T18:30:00.000Z"
  }
]
```

#### Possiveis erros

- 401: token nao fornecido
- 401: token invalido
- 400: erro retornado pelo fluxo de service

### 6.6 Criar produto com imagem

- Metodo e rota: `POST /product`
- Content-Type: `multipart/form-data`
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `isAdmin`
  3. `upload.single("file")`
  4. `validateSchema(createProductSchema)`
- Objetivo: cadastrar produto com upload de imagem para Cloudinary (somente admin).

#### Headers

```http
Authorization: Bearer <token_jwt_admin>
```

#### Campos de formulario (`multipart/form-data`)

- `name` (texto, obrigatorio)
- `price` (texto numerico inteiro >= 0)
- `description` (texto, obrigatorio)
- `category_id` (texto, obrigatorio)
- `file` (arquivo de imagem, obrigatorio)

#### Resposta de sucesso (200)

```json
{
  "id": "f2c4f0d1-8fd3-4bd0-9bc2-f0d4a0ef9941",
  "name": "Pizza Calabresa",
  "description": "Molho artesanal, queijo e calabresa",
  "price": 59,
  "banner": "https://res.cloudinary.com/.../products/1713111111_pizza-calabresa.jpg",
  "category_id": "b6221375-3701-42f4-b840-8f4a579791f2"
}
```

#### Possiveis erros

- 401: nao autenticado
- 403: usuario nao e admin
- 400: validacao Zod
- 400: imagem nao enviada
- 400: tipo de arquivo invalido (aceitos: JPEG, JPG, PNG)
- 400: categoria nao encontrada
- 400: produto com nome ja cadastrado
- 400: preco invalido (nao inteiro ou menor que zero)
- 400: erro no upload para Cloudinary

### 6.7 Listar produtos

- Metodo e rota: `GET /products`
- Query param opcional:
  - `disabled=true|false`
- Valor padrao quando nao informado:
  - `disabled=false`
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `validateSchema(listProductSchema)`
- Objetivo: listar produtos por status de habilitacao.

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Exemplos de uso

- `/products?disabled=false` -> retorna produtos habilitados (`disable = false`)
- `/products?disabled=true` -> retorna produtos desabilitados (`disable = true`)
- `/products` -> equivalente a `/products?disabled=false`

#### Resposta de sucesso (200)

```json
[
  {
    "id": "f2c4f0d1-8fd3-4bd0-9bc2-f0d4a0ef9941",
    "name": "Pizza Calabresa",
    "description": "Molho artesanal, queijo e calabresa",
    "price": 59,
    "banner": "https://res.cloudinary.com/.../products/1713111111_pizza-calabresa.jpg",
    "disable": false,
    "category_id": "b6221375-3701-42f4-b840-8f4a579791f2",
    "createdAt": "2026-04-19T12:00:00.000Z"
  }
]
```

#### Possiveis erros

- 401: nao autenticado
- 400: validacao Zod (`disabled` diferente de `true` ou `false`)
- 400: erro retornado pelo fluxo de service

### 6.8 Deletar produto (desativacao logica)

- Metodo e rota: `DELETE /product`
- Query param obrigatorio:
  - `product_id`
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `isAdmin`
- Objetivo: desativar produto via soft delete (atualiza `disable` para `true`).

#### Headers

```http
Authorization: Bearer <token_jwt_admin>
```

#### Exemplo de uso

- `/product?product_id=f2c4f0d1-8fd3-4bd0-9bc2-f0d4a0ef9941`

#### Resposta de sucesso (200)

```json
{
  "message": "Produto desativado com sucesso"
}
```

#### Possiveis erros

- 401: nao autenticado
- 403: usuario nao e admin
- 400: erro retornado pelo fluxo de service

### 6.9 Listar produtos por categoria

- Metodo e rota: `GET /category/product`
- Query param obrigatorio:
  - `category_id` (string)
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `validateSchema(listProductsByCategorySchema)`
- Objetivo: retornar todos os produtos vinculados a uma categoria especifica.

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Exemplo de uso

- `/category/product?category_id=123`

#### Resposta de sucesso (200)

```json
[
  {
    "id": "f2c4f0d1-8fd3-4bd0-9bc2-f0d4a0ef9941",
    "name": "Pizza Calabresa",
    "description": "Molho artesanal, queijo e calabresa",
    "price": 59,
    "banner": "https://res.cloudinary.com/.../products/1713111111_pizza-calabresa.jpg",
    "disable": false,
    "category_id": "123",
    "createdAt": "2026-04-19T12:00:00.000Z",
    "category": {
      "id": "123",
      "name": "Pizzas"
    }
  }
]
```

#### Possiveis erros

- 401: nao autenticado
- 400: `category_id` nao enviado (Bad Request)
- 404: categoria nao encontrada
- 400: erro retornado pelo fluxo de service

### 6.10 Criar pedido

- Metodo e rota: `POST /order`
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `validateSchema(createOrderSchema)`
- Objetivo: criar um novo pedido com numero da mesa e nome opcional do cliente.

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Requisicao (JSON)

```json
{
  "table": 5,
  "name": "Joao Silva"
}
```

#### Resposta de sucesso (201)

```json
{
  "id": "c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f",
  "table": 5,
  "name": "Joao Silva",
  "status": false,
  "draft": true,
  "createdAt": "2026-04-19T15:00:00.000Z"
}
```

#### Possiveis erros

- 401: nao autenticado
- 400: validacao Zod (mesa ausente/invalida)
- 400: ja existe pedido ativo para a mesma mesa
- 400: erro retornado pelo fluxo de service

### 6.11 Listar pedidos

- Metodo e rota: `GET /orders`
- Query param opcional:
  - `draft=true|false`
- Valor padrao quando nao informado:
  - `draft=false`
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
- Objetivo: listar pedidos por status de rascunho, incluindo itens e dados resumidos dos produtos.

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Exemplos de uso

- `/orders?draft=true` -> retorna pedidos em rascunho
- `/orders?draft=false` -> retorna pedidos enviados
- `/orders` -> equivalente a `/orders?draft=false`

#### Resposta de sucesso (200)

```json
[
  {
    "id": "c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f",
    "table": 5,
    "name": "Joao Silva",
    "status": false,
    "draft": true,
    "createdAt": "2026-04-19T15:00:00.000Z",
    "items": [
      {
        "id": "8b2d8c0a-8dc5-4bb8-9d31-59595f1ef850",
        "amount": 2,
        "product_id": "f2c4f0d1-8fd3-4bd0-9bc2-f0d4a0ef9941",
        "order_id": "c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f",
        "product": {
          "id": "f2c4f0d1-8fd3-4bd0-9bc2-f0d4a0ef9941",
          "name": "Pizza Calabresa",
          "description": "Molho artesanal, queijo e calabresa",
          "price": 59,
          "banner": "https://res.cloudinary.com/.../products/1713111111_pizza-calabresa.jpg"
        }
      }
    ]
  }
]
```

#### Possiveis erros

- 401: nao autenticado
- 400: erro retornado pelo fluxo de service

### 6.12 Adicionar item ao pedido

- Metodo e rota: `POST /order/add`
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `validateSchema(addItemSchema)`
- Objetivo: adicionar um item (produto e quantidade) a um pedido existente.

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Requisicao (JSON)

```json
{
  "order_id": "c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f",
  "product_id": "f2c4f0d1-8fd3-4bd0-9bc2-f0d4a0ef9941",
  "amount": 2
}
```

#### Resposta de sucesso (201)

```json
{
  "id": "8b2d8c0a-8dc5-4bb8-9d31-59595f1ef850",
  "order_id": "c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f",
  "product_id": "f2c4f0d1-8fd3-4bd0-9bc2-f0d4a0ef9941",
  "amount": 2,
  "createdAt": "2026-04-19T16:00:00.000Z",
  "product": {
    "id": "f2c4f0d1-8fd3-4bd0-9bc2-f0d4a0ef9941",
    "name": "Pizza Calabresa",
    "price": 59,
    "description": "Molho artesanal, queijo e calabresa",
    "banner": "https://res.cloudinary.com/.../products/1713111111_pizza-calabresa.jpg"
  }
}
```

#### Possiveis erros

- 401: nao autenticado
- 400: validacao Zod (`order_id`, `product_id` ou `amount` invalidos)
- 404: pedido nao encontrado
- 404: produto nao encontrado
- 400: pedido ja foi finalizado
- 400: erro retornado pelo fluxo de service

### 6.13 Remover item do pedido

- Metodo e rota: `DELETE /order/remove`
- Query param obrigatorio:
  - `item_id` (string)
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `validateSchema(removeItemSchema)`
- Objetivo: remover um item existente da tabela `order_items`.

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Exemplo de uso

- `/order/remove?item_id=8b2d8c0a-8dc5-4bb8-9d31-59595f1ef850`

#### Resposta de sucesso (200)

```json
{
  "message": "Item removido com sucesso"
}
```

#### Possiveis erros

- 401: nao autenticado
- 400: `item_id` nao enviado (Bad Request)
- 404: item do pedido nao encontrado
- 400: erro retornado pelo fluxo de service

### 6.14 Detalhar pedido

- Metodo e rota: `GET /order/detail`
- Query param obrigatorio:
  - `order_id` (string)
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `validateSchema(detailOrderSchema)`
- Objetivo: retornar os detalhes completos de um pedido, incluindo informacoes gerais e itens.

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Exemplo de uso

- `/order/detail?order_id=c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f`

#### Resposta de sucesso (200)

```json
{
  "id": "c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f",
  "table": 5,
  "name": "Joao Silva",
  "status": false,
  "draft": true,
  "createdAt": "2026-04-19T15:00:00.000Z",
  "updatedAt": "2026-04-19T15:00:00.000Z",
  "items": [
    {
      "id": "8b2d8c0a-8dc5-4bb8-9d31-59595f1ef850",
      "amount": 2,
      "order_id": "c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f",
      "product_id": "f2c4f0d1-8fd3-4bd0-9bc2-f0d4a0ef9941",
      "product": {
        "id": "f2c4f0d1-8fd3-4bd0-9bc2-f0d4a0ef9941",
        "name": "Pizza Calabresa",
        "description": "Molho artesanal, queijo e calabresa",
        "price": 59,
        "banner": "https://res.cloudinary.com/.../products/1713111111_pizza-calabresa.jpg"
      }
    }
  ]
}
```

#### Possiveis erros

- 401: nao autenticado
- 400: `order_id` nao enviado (Bad Request)
- 404: pedido nao encontrado
- 400: erro retornado pelo fluxo de service

### 6.15 Enviar pedido para cozinha

- Metodo e rota: `PUT /order/send`
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `validateSchema(sendOrderSchema)`
- Objetivo: enviar pedido para cozinha, alterando `draft` para `false`.

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Requisicao (JSON)

```json
{
  "order_id": "c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f",
  "name": "Joao Silva"
}
```

#### Resposta de sucesso (200)

```json
{
  "updatedOrder": {
    "id": "c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f",
    "table": 5,
    "name": "Joao Silva",
    "status": false,
    "draft": false,
    "createdAt": "2026-04-19T15:00:00.000Z"
  },
  "message": "Pedido enviado com sucesso"
}
```

#### Possiveis erros

- 401: nao autenticado
- 404: pedido nao encontrado
- 400: erro retornado pelo fluxo de service

### 6.16 Finalizar pedido

- Metodo e rota: `PUT /order/finish`
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `validateSchema(finishOrderSchema)`
- Objetivo: finalizar pedido, alterando `status` para `true`.

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Requisicao (JSON)

```json
{
  "order_id": "c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f"
}
```

#### Resposta de sucesso (200)

```json
{
  "updatedOrder": {
    "id": "c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f",
    "table": 5,
    "name": "Joao Silva",
    "status": true,
    "draft": false,
    "createdAt": "2026-04-19T15:00:00.000Z"
  },
  "message": "Pedido finalizado com sucesso"
}
```

#### Possiveis erros

- 401: nao autenticado
- 404: pedido nao encontrado
- 400: erro retornado pelo fluxo de service

### 6.17 Remover pedido

- Metodo e rota: `DELETE /order`
- Query param obrigatorio:
  - `order_id` (string)
- Middlewares (ordem de execucao):
  1. `isAuthenticated`
  2. `validateSchema(removeOrderSchema)`
- Objetivo: remover um pedido da base e, quando houver itens vinculados, a remocao ocorre em cascata.

#### Headers

```http
Authorization: Bearer <token_jwt>
```

#### Exemplo de uso

- `/order?order_id=c7c5a73d-f8e6-4db3-a2ac-2735986f5b9f`

#### Resposta de sucesso (200)

```json
{
  "message": "Pedido removido com sucesso"
}
```

ou

```json
{
  "message": "Pedido e itens vinculados removidos com sucesso"
}
```

#### Possiveis erros

- 401: nao autenticado
- 400: `order_id` nao enviado (Bad Request)
- 404: pedido nao encontrado
- 400: erro retornado pelo fluxo de service

---

## 7. Validacao de Dados

A validacao e feita por Zod no middleware `validateSchema`, sempre sobre `body`, `query` e `params`.

### 7.1 Schemas atuais

1. `createUserSchema`
- `name`: string, obrigatorio, minimo 1 caractere
- `email`: email valido
- `password`: string, obrigatorio, minimo 6 caracteres

2. `authUserSchema`
- `email`: email valido
- `password`: string, minimo 6 caracteres

3. `createCategorySchema`
- `name`: string, obrigatorio, minimo 3 caracteres

4. `createProductSchema`
- `name`: string, obrigatorio
- `price`: string obrigatoria com refine para inteiro >= 0
- `description`: string, obrigatoria
- `category_id`: string, obrigatoria

5. `listProductSchema`
- `query.disabled`: opcional, aceita apenas `"true"` ou `"false"`
- Quando ausente, o controller assume `false` por padrao

6. `listProductsByCategorySchema`
- `query.category_id`: obrigatorio, string nao vazia

7. `createOrderSchema`
- `table`: obrigatorio, numero inteiro valido
- `name`: opcional, string

8. `addItemSchema`
- `order_id`: obrigatorio, string nao vazia
- `product_id`: obrigatorio, string nao vazia
- `amount`: obrigatorio, numero inteiro positivo

9. `removeItemSchema`
- `query.item_id`: obrigatorio, string nao vazia

10. `detailOrderSchema`
- `query.order_id`: obrigatorio, string nao vazia

11. `sendOrderSchema`
- `order_id`: obrigatorio, string nao vazia
- `name`: opcional, string (minimo 2 caracteres)

12. `finishOrderSchema`
- `order_id`: obrigatorio, string nao vazia

13. `removeOrderSchema`
- `query.order_id`: obrigatorio, string nao vazia

### 7.2 Estrutura de erro de validacao (HTTP 400)

```json
{
  "error": "Erro de validacao",
  "details": [
    {
      "campo": "name",
      "message": "O nome e obrigatorio"
    }
  ]
}
```

---

## 8. Middlewares e Responsabilidades

1. `validateSchema`
- Valida contrato de entrada com Zod.
- Em caso de erro de schema, responde 400 com `details` por campo.

2. `isAuthenticated`
- Le `Authorization`.
- Valida JWT com `JWT_SECRET`.
- Injeta `req.userId` com o `sub` do token.

3. `isAdmin`
- Busca usuario pelo `req.userId`.
- Garante `user.role === "ADMIN"`.
- Bloqueia acesso para usuarios sem privilegio.

4. `upload.single("file")` (Multer)
- Faz upload em memoria (`memoryStorage`).
- Limite de tamanho: 5MB.
- Restringe tipos MIME para `image/jpeg`, `image/jpg`, `image/png`.

5. Error handler global (`server.ts`)
- Trata erros nao capturados.
- Retorna 400 para instancias de `Error`.
- Retorna 500 para casos nao mapeados.

---

## 9. Fluxo de Requisicao Detalhado

### 9.1 Fluxo padrao (visao geral)

1. Cliente envia requisicao para `/api/...`.
2. `server.ts` encaminha para `routes.ts`.
3. Middlewares da rota executam em ordem.
4. Controller recebe dados e chama service.
5. Service processa regra de negocio.
6. Service interage com Prisma e banco PostgreSQL.
7. Service retorna resultado ao controller.
8. Controller serializa resposta HTTP.
9. Erros podem ser tratados no proprio fluxo ou pelo handler global.

### 9.2 Exemplo completo: `POST /categories`

1. Request chega em `/api/categories`.
2. `isAuthenticated` valida token e define `req.userId`.
3. `isAdmin` valida se o usuario tem role `ADMIN`.
4. `validateSchema(createCategorySchema)` valida payload.
5. `CreateCategoryController.handle` extrai `name`.
6. `CreateCategoryService.execute` verifica duplicidade e cria categoria.
7. Controller retorna `201` com dados da categoria criada.

### 9.3 Exemplo completo: `GET /category`

1. Request chega em `/api/category`.
2. `isAuthenticated` valida token e define `req.userId`.
3. `ListCategoryController.handle` chama `ListCategoryService.execute`.
4. O service consulta categorias ordenadas por criacao descendente.
5. Controller retorna `200` com a lista.

### 9.4 Exemplo completo: `POST /product`

1. Request chega em `/api/product` com `multipart/form-data`.
2. `isAuthenticated` valida token.
3. `isAdmin` valida perfil `ADMIN`.
4. `upload.single("file")` processa arquivo em memoria e aplica validacoes de tipo/tamanho.
5. `validateSchema(createProductSchema)` valida campos textuais do formulario.
6. `CreateProductController.handle` valida `price` inteiro >= 0 e presenca de arquivo.
7. `CreateProductService.execute` valida categoria existente.
8. Service envia imagem para Cloudinary e recebe `secure_url`.
9. Service valida duplicidade de nome de produto.
10. Service cria registro em `products` com `banner` = URL do Cloudinary.
11. Controller retorna `200` com produto criado.

### 9.5 Exemplo completo: `GET /products`

1. Request chega em `/api/products` com query opcional `disabled`.
2. `isAuthenticated` valida token.
3. `validateSchema(listProductSchema)` valida o valor de query quando enviado.
4. `ListProductController.handle` converte o query param para booleano.
5. Se nao houver query, o controller usa `false` como padrao.
6. `ListProductService.execute` consulta `products` filtrando por `disable`.
7. Controller retorna `200` com a lista filtrada.

### 9.6 Exemplo completo: `DELETE /product`

1. Request chega em `/api/product` com query `product_id`.
2. `isAuthenticated` valida token.
3. `isAdmin` valida perfil `ADMIN`.
4. `DeleteProductController.handle` extrai `product_id` do query.
5. `DeleteProductService.execute` atualiza o produto definindo `disable = true`.
6. Controller retorna `200` com mensagem de sucesso.

### 9.7 Exemplo completo: `GET /category/product`

1. Request chega em `/api/category/product` com query `category_id`.
2. `isAuthenticated` valida token.
3. `validateSchema(listProductsByCategorySchema)` valida `category_id`.
4. `ListProductsByCategoryController.handle` extrai `category_id` do query.
5. `ListProductsByCategoryService.execute` valida se a categoria existe.
6. Se a categoria nao existir, controller retorna `404`.
7. Se existir, service lista produtos vinculados ao `category_id`.
8. Controller retorna `200` com a lista de produtos.

### 9.8 Exemplo completo: `POST /order`

1. Request chega em `/api/order` com body JSON.
2. `isAuthenticated` valida token.
3. `validateSchema(createOrderSchema)` valida `table` (inteiro obrigatorio) e `name` (opcional).
4. `CreateOrderController.handle` extrai os dados e chama service.
5. `CreateOrderService.execute` valida se ja existe pedido ativo para a mesa.
6. Se ja existir pedido ativo para a mesma mesa, o fluxo retorna erro `400`.
7. Se nao existir, service cria o registro na tabela `orders`.
8. Controller retorna `201` com os dados do pedido criado.

### 9.9 Exemplo completo: `GET /orders`

1. Request chega em `/api/orders` com query opcional `draft`.
2. `isAuthenticated` valida token.
3. `ListOrdersController.handle` extrai o query param `draft`.
4. `ListOrdersService.execute` converte o valor para booleano com padrao `false`.
5. Service consulta `orders` filtrando por `draft`.
6. Service retorna pedido com `items` e dados resumidos de `product` em cada item.
7. Controller retorna `200` com a lista.

### 9.10 Exemplo completo: `POST /order/add`

1. Request chega em `/api/order/add` com body JSON.
2. `isAuthenticated` valida token.
3. `validateSchema(addItemSchema)` valida `order_id`, `product_id` e `amount`.
4. `AddItemController.handle` extrai os dados e chama service.
5. `AddItemOrderService.execute` valida se o pedido existe.
6. Se o pedido nao existir, retorna erro `404`.
7. Service valida se o pedido ja foi finalizado (`status = true`).
8. Se estiver finalizado, retorna erro `400`.
9. Service valida se o produto existe e esta habilitado (`disable = false`).
10. Se o produto nao existir/estiver desabilitado, retorna erro `404`.
11. Service cria o item na tabela `order_items`.
12. Controller retorna `201` com o item criado e dados resumidos do produto.

### 9.11 Exemplo completo: `DELETE /order/remove`

1. Request chega em `/api/order/remove` com query `item_id`.
2. `isAuthenticated` valida token.
3. `validateSchema(removeItemSchema)` valida `item_id`.
4. `RemoveItemController.handle` extrai `item_id` do query.
5. `RemoveItemOrderService.execute` valida se o item existe em `order_items`.
6. Se o item nao existir, retorna erro `404`.
7. Se existir, service remove o item da tabela `order_items`.
8. Controller retorna `200` com mensagem de sucesso.

### 9.12 Exemplo completo: `PUT /order/send`

1. Request chega em `/api/order/send` com body JSON.
2. `isAuthenticated` valida token.
3. `validateSchema(sendOrderSchema)` valida `order_id` e `name`.
4. `SendOrderController.handle` extrai `order_id` e `name` do body.
5. `SendOrderService.execute` valida se o pedido existe.
6. Se o pedido nao existir, retorna erro `404`.
7. Se existir, service atualiza o pedido com `draft = false`.
8. Controller retorna `200` com os dados atualizados e mensagem de sucesso.

### 9.13 Exemplo completo: `GET /order/detail`

1. Request chega em `/api/order/detail` com query `order_id`.
2. `isAuthenticated` valida token.
3. `validateSchema(detailOrderSchema)` valida `order_id`.
4. `DetailOrderController.handle` extrai `order_id` do query.
5. `DetailOrderService.execute` busca o pedido por `id` com seus itens e produtos.
6. Se o pedido nao existir, retorna erro `404`.
7. Controller retorna `200` com os detalhes completos do pedido.

### 9.14 Exemplo completo: `PUT /order/finish`

1. Request chega em `/api/order/finish` com body JSON.
2. `isAuthenticated` valida token.
3. `validateSchema(finishOrderSchema)` valida `order_id`.
4. `FinishOrderController.handle` extrai `order_id` do body.
5. `FinishOrderService.execute` valida se o pedido existe.
6. Se o pedido nao existir, retorna erro `404`.
7. Se existir, service atualiza o pedido com `status = true`.
8. Controller retorna `200` com os dados atualizados e mensagem de sucesso.

### 9.15 Exemplo completo: `DELETE /order`

1. Request chega em `/api/order` com query `order_id`.
2. `isAuthenticated` valida token.
3. `validateSchema(removeOrderSchema)` valida `order_id`.
4. `RemoveOrderController.handle` extrai `order_id` da query.
5. `RemoveOrderService.execute` valida se o pedido existe.
6. Se o pedido nao existir, retorna erro `404`.
7. Service verifica se existem itens em `order_items` vinculados ao pedido.
8. Service remove o pedido na tabela `orders`; os itens vinculados sao removidos em cascata.
9. Controller retorna `200` com mensagem de sucesso.

---

## 10. Seguranca e Configuracao

### 10.1 Variaveis de ambiente esperadas

- `PORT`: porta HTTP da API.
- `DATABASE_URL`: conexao PostgreSQL usada pelo Prisma adapter.
- `JWT_SECRET`: chave para assinatura e validacao de token JWT.
- `CLOUDINARY_CLOUD_NAME`: identificador da conta Cloudinary.
- `CLOUDINARY_API_KEY`: chave de API Cloudinary.
- `CLOUDINARY_API_SECRET`: segredo da API Cloudinary.

### 10.2 Medidas implementadas

- Senhas com hash `bcrypt` (`salt rounds = 8`).
- JWT com expiracao de 1 dia.
- Controle de acesso por role para endpoints administrativos.
- Controle de acesso por autenticacao para endpoints protegidos.
- Validacao de payload com Zod.
- Restricao de tipo/tamanho no upload de imagem.

---

## 11. Observacoes Tecnicas Relevantes

- O banco possui entidades para pedidos (`Order`, `OrderItem`) e, no momento, as rotas implementadas cobrem criacao, listagem, detalhamento, adicao/remocao de itens, remocao de pedido, envio para cozinha e finalizacao.
- A camada de pedidos implementada atualmente cobre criacao (`POST /order`), listagem (`GET /orders`), detalhamento (`GET /order/detail`), adicao de item (`POST /order/add`), remocao de item (`DELETE /order/remove`), remocao de pedido (`DELETE /order`), envio (`PUT /order/send`) e finalizacao (`PUT /order/finish`).
- A camada de produto implementada atualmente cobre criacao (`POST /product`), listagem filtrada (`GET /products`), listagem por categoria (`GET /category/product`) e desativacao (`DELETE /product`).
- O cliente Prisma e gerado em `src/generated/prisma` com provider `prisma-client`.
- O projeto mantem o padrao Controller -> Service -> Prisma em todos os fluxos principais ja implementados.

---

## 12. Comandos Uteis de Desenvolvimento

```bash
npm install
npm run dev
npm run build
npm run start
```

Para evolucao do banco (Prisma), usar fluxo de migrations no diretorio `prisma/migrations`.

---

## 13. Resumo Executivo da Arquitetura Atual

- A requisicao entra pela rota e passa pela cadeia de middlewares.
- O controller recebe a entrada e delega para o service.
- O service aplica regras de negocio e acessa o banco via Prisma.
- No fluxo de produto, o service integra com o Cloudinary para armazenar imagem e tambem executa desativacao logica (`disable = true`).
- No fluxo de pedido, o service cria o registro na tabela `orders` com status inicial pendente e rascunho ativo, lista/detalha pedidos com seus itens, adiciona e remove itens, remove pedido com cascata de itens quando necessario, envia o pedido para cozinha (`draft = false`) e finaliza o pedido (`status = true`).
- O resultado retorna para o controller, que envia a resposta final ao cliente.

Este documento serve como referencia central para manutencao e evolucao da API.

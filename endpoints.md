# Documentacao de Endpoints - API Pizzaria

## Informacoes Gerais

- Base URL: `/api`
- Formato padrao: `application/json`
- Endpoint de produto usa: `multipart/form-data`
- Autenticacao: JWT via header `Authorization: Bearer <token>`
- Erro de validacao (Zod):

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

## Endpoints

### POST /users

Cria um novo usuario.

**Autenticacao:** Nao obrigatoria

**Body:**

```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "123456"
}
```

**Validacao:**
- `name`: string obrigatoria, minimo 1
- `email`: email valido
- `password`: string obrigatoria, minimo 6

**Responses:**

`201 Created`

```json
{
  "id": "uuid",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "Role": "STAFF",
  "createdAt": "2026-04-19T10:00:00.000Z"
}
```

`400 Bad Request`

```json
{
  "error": "Usuario já existe"
}
```

ou erro de validacao Zod.

---

### POST /session

Autentica usuario e retorna token JWT.

**Autenticacao:** Nao obrigatoria

**Body:**

```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

**Validacao:**
- `email`: email valido
- `password`: string obrigatoria, minimo 6

**Responses:**

`200 OK`

```json
{
  "id": "uuid",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "Role": "STAFF",
  "createdAt": "2026-04-19T10:00:00.000Z",
  "token": "jwt-token"
}
```

`400 Bad Request`

```json
{
  "error": "Usuario não encontrado"
}
```

```json
{
  "error": "Senha incorreta"
}
```

ou erro de validacao Zod.

---

### GET /me

Retorna os dados do usuario autenticado.

**Autenticacao:** Obrigatoria

**Query params:** nenhum

**Body:** nenhum

**Responses:**

`200 OK`

```json
{
  "id": "uuid",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "Role": "STAFF",
  "createdAt": "2026-04-19T10:00:00.000Z"
}
```

`401 Unauthorized`

```json
{
  "message": "Token não fornecido"
}
```

ou

```json
{
  "message": "Token inválido"
}
```

`400 Bad Request`

```json
{
  "error": "Erro ao detalhar usuário"
}
```

---

### POST /categories

Cria categoria (apenas admin).

**Autenticacao:** Obrigatoria + role `ADMIN`

**Body:**

```json
{
  "name": "Bebidas"
}
```

**Validacao:**
- `name`: string obrigatoria, minimo 3

**Responses:**

`201 Created`

```json
{
  "id": "uuid",
  "name": "Bebidas",
  "createdAt": "2026-04-19T10:00:00.000Z"
}
```

`401 Unauthorized`

```json
{
  "message": "Token não fornecido"
}
```

`403 Forbidden`

```json
{
  "error": "Acesso negado. Admins apenas."
}
```

`400 Bad Request`

```json
{
  "error": "Ja existe uma categoria com esse nome"
}
```

ou erro de validacao Zod.

---

### GET /category

Lista categorias ordenadas por data de criacao decrescente.

**Autenticacao:** Obrigatoria

**Query params:** nenhum

**Body:** nenhum

**Responses:**

`200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Bebidas",
    "createdAt": "2026-04-19T10:00:00.000Z"
  }
]
```

`401 Unauthorized` (token ausente/invalido)

`400 Bad Request`

```json
{
  "error": "Erro ao listar categorias"
}
```

---

### POST /product

Cria produto com upload de imagem para Cloudinary (apenas admin).

**Autenticacao:** Obrigatoria + role `ADMIN`

**Content-Type:** `multipart/form-data`

**Body (form-data):**
- `name` (string)
- `price` (string numerica inteira >= 0)
- `description` (string)
- `category_id` (string)
- `file` (imagem obrigatoria)

**Validacao:**
- `name`: obrigatorio
- `price`: obrigatorio, inteiro >= 0
- `description`: obrigatorio
- `category_id`: obrigatorio
- `file`: obrigatorio (controller)
- MIME permitido: `image/jpeg`, `image/jpg`, `image/png`
- Limite de arquivo: 5MB

**Responses:**

`200 OK`

```json
{
  "id": "uuid",
  "name": "Pizza Calabresa",
  "description": "Molho artesanal",
  "price": 59,
  "banner": "https://res.cloudinary.com/...",
  "category_id": "uuid"
}
```

`401 Unauthorized` (token ausente/invalido)

`403 Forbidden` (nao admin)

`400 Bad Request`

```json
{
  "error": "Imagem do produto é obrigatória"
}
```

```json
{
  "error": "Preço inválido. Envie um número inteiro maior ou igual a zero."
}
```

```json
{
  "error": "Categoria não encontrada"
}
```

```json
{
  "error": "Já existe um produto com esse nome"
}
```

```json
{
  "error": "Erro ao fazer upload da imagem"
}
```

ou erro de validacao Zod/multer.

---

### GET /products

Lista produtos filtrando por status de desativacao.

**Autenticacao:** Obrigatoria

**Query params:**
- `disabled` (opcional): `"true"` ou `"false"`
- Quando ausente, o sistema usa `false`

**Body:** nenhum

**Validacao:**
- `query.disabled`: enum `true|false` (opcional)

**Responses:**

`200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Pizza Calabresa",
    "description": "Molho artesanal",
    "price": 59,
    "banner": "https://res.cloudinary.com/...",
    "disable": false,
    "category_id": "uuid",
    "createdAt": "2026-04-19T10:00:00.000Z",
    "category": {
      "id": "uuid",
      "name": "Pizzas"
    }
  }
]
```

`401 Unauthorized` (token ausente/invalido)

`400 Bad Request` (erro de validacao ou erro de listagem)

---

### GET /category/product

Lista produtos ativos por categoria.

**Autenticacao:** Obrigatoria

**Query params:**
- `category_id` (obrigatorio)

**Body:** nenhum

**Validacao:**
- `query.category_id`: string obrigatoria

**Responses:**

`200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Pizza Calabresa",
    "description": "Molho artesanal",
    "price": 59,
    "banner": "https://res.cloudinary.com/...",
    "disable": false,
    "category_id": "uuid",
    "createdAt": "2026-04-19T10:00:00.000Z",
    "category": {
      "id": "uuid",
      "name": "Pizzas"
    }
  }
]
```

`401 Unauthorized` (token ausente/invalido)

`404 Not Found`

```json
{
  "error": "Categoria não encontrada"
}
```

`400 Bad Request` (validacao ou erro de service)

---

### DELETE /product

Desativa produto (soft delete) definindo `disable = true`.

**Autenticacao:** Obrigatoria + role `ADMIN`

**Query params:**
- `product_id` (obrigatorio na pratica de negocio)

**Body:** nenhum

**Validacao:**
- Nao ha schema Zod nessa rota; o `product_id` e lido da query no controller.

**Responses:**

`200 OK`

```json
{
  "message": "Produto desativado com sucesso"
}
```

`401 Unauthorized` (token ausente/invalido)

`403 Forbidden` (nao admin)

`400 Bad Request`

```json
{
  "error": "Erro ao desativar produto"
}
```

ou mensagem de erro do Prisma.

---

### POST /order

Cria novo pedido.

**Autenticacao:** Obrigatoria

**Body:**

```json
{
  "table": 5,
  "name": "Joao Silva"
}
```

**Validacao:**
- `table`: numero inteiro obrigatorio
- `name`: string opcional

**Responses:**

`201 Created`

```json
{
  "id": "uuid",
  "table": 5,
  "name": "Joao Silva",
  "status": false,
  "draft": true,
  "createdAt": "2026-04-19T10:00:00.000Z"
}
```

`401 Unauthorized` (token ausente/invalido)

`400 Bad Request`

```json
{
  "error": "Ja existe um pedido ativo para esta mesa"
}
```

ou erro de validacao Zod.

---

### GET /orders

Lista pedidos por status de rascunho.

**Autenticacao:** Obrigatoria

**Query params:**
- `draft` (opcional): `"true"` ou `"false"`
- Quando ausente, considera `false`

**Body:** nenhum

**Validacao:**
- Nao ha schema Zod nesta rota.

**Responses:**

`200 OK`

```json
[
  {
    "id": "uuid",
    "table": 5,
    "name": "Joao Silva",
    "status": false,
    "draft": false,
    "createdAt": "2026-04-19T10:00:00.000Z",
    "items": []
  }
]
```

`401 Unauthorized` (token ausente/invalido)

`400 Bad Request`

```json
{
  "error": "Erro ao listar pedidos"
}
```

---

### GET /order/detail

Detalha um pedido com seus itens.

**Autenticacao:** Obrigatoria

**Query params:**
- `order_id` (obrigatorio)

**Body:** nenhum

**Validacao:**
- `query.order_id`: string obrigatoria

**Responses:**

`200 OK`

```json
{
  "id": "uuid",
  "table": 5,
  "name": "Joao Silva",
  "status": false,
  "draft": true,
  "createdAt": "2026-04-19T10:00:00.000Z",
  "updatedAt": "2026-04-19T10:00:00.000Z",
  "items": [
    {
      "id": "uuid",
      "amount": 2,
      "order_id": "uuid",
      "product_id": "uuid",
      "product": {
        "id": "uuid",
        "name": "Pizza Calabresa",
        "description": "Molho artesanal",
        "price": 59,
        "banner": "https://res.cloudinary.com/..."
      }
    }
  ]
}
```

`401 Unauthorized` (token ausente/invalido)

`404 Not Found`

```json
{
  "error": "Pedido não encontrado"
}
```

`400 Bad Request` (validacao ou erro de service)

---

### POST /order/add

Adiciona item ao pedido.

**Autenticacao:** Obrigatoria

**Body:**

```json
{
  "order_id": "uuid",
  "product_id": "uuid",
  "amount": 2
}
```

**Validacao:**
- `order_id`: string obrigatoria
- `product_id`: string obrigatoria
- `amount`: numero inteiro positivo

**Responses:**

`201 Created`

```json
{
  "id": "uuid",
  "order_id": "uuid",
  "product_id": "uuid",
  "amount": 2,
  "createdAt": "2026-04-19T10:00:00.000Z",
  "product": {
    "id": "uuid",
    "name": "Pizza Calabresa",
    "price": 59,
    "description": "Molho artesanal",
    "banner": "https://res.cloudinary.com/..."
  }
}
```

`401 Unauthorized` (token ausente/invalido)

`404 Not Found`

```json
{
  "error": "Pedido não encontrado"
}
```

```json
{
  "error": "Produto não encontrado"
}
```

`400 Bad Request`

```json
{
  "error": "Pedido já foi finalizado"
}
```

ou erro de validacao Zod.

---

### DELETE /order/remove

Remove item de pedido.

**Autenticacao:** Obrigatoria

**Query params:**
- `item_id` (obrigatorio)

**Body:** nenhum

**Validacao:**
- `query.item_id`: string obrigatoria

**Responses:**

`200 OK`

```json
{
  "message": "Item removido com sucesso"
}
```

`401 Unauthorized` (token ausente/invalido)

`404 Not Found`

```json
{
  "error": "Item do pedido não encontrado"
}
```

`400 Bad Request` (validacao ou erro de service)

---

### DELETE /order

Remove pedido. Se houver itens vinculados, a exclusao ocorre em cascata.

**Autenticacao:** Obrigatoria

**Query params:**
- `order_id` (obrigatorio)

**Body:** nenhum

**Validacao:**
- `query.order_id`: string obrigatoria

**Responses:**

`200 OK`

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

`401 Unauthorized` (token ausente/invalido)

`404 Not Found`

```json
{
  "error": "Pedido não encontrado"
}
```

`400 Bad Request` (validacao ou erro de service)

---

### PUT /order/send

Envia pedido para cozinha, alterando `draft` para `false` e atualizando `name` quando enviado.

**Autenticacao:** Obrigatoria

**Body:**

```json
{
  "order_id": "uuid",
  "name": "Joao Silva"
}
```

**Validacao:**
- `order_id`: string obrigatoria
- `name`: string opcional, minimo 2 quando enviada

**Responses:**

`200 OK`

```json
{
  "updatedOrder": {
    "id": "uuid",
    "table": 5,
    "name": "Joao Silva",
    "status": false,
    "draft": false,
    "createdAt": "2026-04-19T10:00:00.000Z"
  },
  "message": "Pedido enviado com sucesso"
}
```

`401 Unauthorized` (token ausente/invalido)

`400 Bad Request`

```json
{
  "error": "Erro ao enviar pedido: Pedido não encontrado"
}
```

ou erro de validacao Zod.

---

### PUT /order/finish

Finaliza pedido, alterando `status` para `true`.

**Autenticacao:** Obrigatoria

**Body:**

```json
{
  "order_id": "uuid"
}
```

**Validacao:**
- `order_id`: string obrigatoria

**Responses:**

`200 OK`

```json
{
  "updatedOrder": {
    "id": "uuid",
    "table": 5,
    "name": "Joao Silva",
    "status": true,
    "draft": false,
    "createdAt": "2026-04-19T10:00:00.000Z"
  },
  "message": "Pedido finalizado com sucesso"
}
```

`401 Unauthorized` (token ausente/invalido)

`400 Bad Request`

```json
{
  "error": "Erro ao finalizar pedido: Pedido não encontrado"
}
```

ou erro de validacao Zod.

# Solo Z Store Backend

Backend completo para a loja Solo Z com pagamentos via Mercado Pago (Pix) e entrega automatica via RCON.

## Stack

- Node.js + Express
- PostgreSQL + Prisma ORM
- Mercado Pago SDK (Pix)
- RCON (Minecraft)

## Setup rapido

```bash
cd backend
npm install
cp .env.example .env
```

Edite o `.env` com seus dados.

### Rodar localmente

```bash
npm run prisma:generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

API: `http://localhost:4000`

### Docker

```bash
docker compose up --build
```

## Variaveis de ambiente

```
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
MP_ACCESS_TOKEN=
RCON_HOST=
RCON_PORT=
RCON_PASSWORD=
PORT=4000
WEBHOOK_TOKEN=
```

> `WEBHOOK_TOKEN` e usado para validar o webhook do Mercado Pago via query `?token=...`.

### Usando Supabase com Prisma

- `DATABASE_URL`: use a URL do pooler (porta `6543`) para runtime da API.
- `DIRECT_URL`: use a conexao direta (porta `5432`) para comandos Prisma (`migrate`, `db push`, etc).

Formato esperado:

```env
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

> Ajuste a regiao do host do pooler caso seu projeto Supabase nao seja `sa-east-1`.

## Migrar banco atual para Supabase

1. Crie o projeto no Supabase e copie as 2 strings de conexao (pooler e direct).
2. Preencha `.env` com `DATABASE_URL` e `DIRECT_URL`.
3. Gere um dump do banco atual (local):

```bash
pg_dump -h localhost -p 5432 -U postgres -d soloz -Fc -f soloz.dump
```

4. Restaure no Supabase usando a conexao direta:

```bash
pg_restore --no-owner --no-privileges --clean --if-exists \
  --dbname="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" \
  soloz.dump
```

5. Registre o estado atual das migracoes no Supabase (para alinhar historico Prisma):

```bash
npx prisma migrate resolve --applied 20260320003425_init
npx prisma migrate resolve --applied 20260320004627_admin_auth_fix
```

6. Valide conectividade e cliente Prisma:

```bash
npm run prisma:generate
npm run prisma:migrate
```

7. Inicie a API:

```bash
npm run dev
```

## Endpoints

- `POST /auth/login`
- `GET /products`
- `GET /products/admin`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /orders`
- `POST /webhook/mercadopago`

### POST /orders

Body:

```json
{
  "productId": "uuid-do-produto",
  "playerNickname": "Player123"
}
```

Resposta:

```json
{
  "order": {
    "id": "...",
    "productId": "...",
    "playerNickname": "Player123",
    "paymentId": "...",
    "status": "pending",
    "createdAt": "2026-03-19T12:00:00.000Z"
  },
  "payment": {
    "id": "123456",
    "status": "pending",
    "qrCode": "...",
    "qrCodeBase64": "...",
    "ticketUrl": "..."
  }
}
```

### Webhook Mercado Pago

Configure o webhook para:

```
POST https://seu-dominio.com/webhook/mercadopago?token=SEU_WEBHOOK_TOKEN
```

O backend busca o pagamento, valida `approved` e entrega via RCON.

## Fila de entrega

Pagamentos aprovados entram na tabela `DeliveryQueue`. O servidor processa a fila a cada 15s
e tenta entregar via RCON, evitando duplicacao.

## Prisma

```bash
npx prisma studio
```

## Entrega via RCON

O campo `minecraftCommand` do produto deve conter `{player}`.

Exemplo:

```
lp user {player} parent add vip
```

## Postman (exemplos)

- Criar pedido: `POST http://localhost:4000/orders`
- Login: `POST http://localhost:4000/auth/login`
- Produtos: `GET http://localhost:4000/products`
- Webhook: `POST http://localhost:4000/webhook/mercadopago?token=SEU_WEBHOOK_TOKEN`

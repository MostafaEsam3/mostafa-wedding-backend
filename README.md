# Wedding Guestbook Backend

Node.js + Express + MongoDB Atlas backend for the wedding guestbook form.

## Fields

- `name`: guest name
- `relationship`: one of `Friend`, `Family`, `Colleague`, `Well-wisher`
- `message`: wish/message
- `willAttend`: boolean
- `createdAt`, `updatedAt`: generated automatically

## Requirements

- Node.js 20+
- MongoDB Atlas cluster

## Run locally

1. Install packages:

```bash
npm install
```

2. Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

On Windows CMD/PowerShell, just copy `.env.example` to `.env` manually.

3. Put your MongoDB Atlas connection string in `MONGODB_URI`.

4. Start development mode:

```bash
npm run dev
```

API base URL:

```text
http://localhost:5000/api
```

## Endpoints

### Create wish

`POST /api/wishes`

```json
{
  "name": "Mahmoud",
  "relationship": "Friend",
  "message": "Congratulations and best wishes!",
  "willAttend": true
}
```

### Get paginated wishes

`GET /api/wishes?page=1&limit=5`

Default `limit` is 5.

Example response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 5,
    "totalItems": 0,
    "totalPages": 0,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

### Get one wish

`GET /api/wishes/:id`

### Delete wish

`DELETE /api/wishes/:id`

Header required:

```text
x-admin-key: <your ADMIN_API_KEY>
```

Delete is protected so a public visitor cannot delete guestbook entries.

### Health check

`GET /api/health`

## MongoDB Atlas setup

1. Create a free/paid Atlas cluster.
2. Database Access -> create a database user.
3. Network Access -> add your current IP. For temporary testing you can allow `0.0.0.0/0`, but restrict it for production.
4. Connect -> Drivers -> copy the Node.js connection string.
5. Replace `<username>`, `<password>` and database name in `.env`.

## CORS

Set `CLIENT_ORIGIN` to your React website URL, for example:

```text
CLIENT_ORIGIN=http://localhost:5173
```

For more than one origin, separate them with commas.

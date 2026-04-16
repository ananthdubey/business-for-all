# Business for All Backend

Production-ready Express + MongoDB backend for the existing React frontend.

## Run locally

```bash
cd backend
npm install
npm run dev
```

`npm run dev` starts the backend directly for maximum Windows compatibility.

## Environment

Copy `.env.example` to `.env` and set:

- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- SMTP variables for email delivery

## API base URL

`http://localhost:5000/api`

## Uploads

Application documents are stored locally in `uploads/documents` and exposed at:

`http://localhost:5000/uploads/<filename>`

## Optional seed data

```bash
npm run seed:categories
```

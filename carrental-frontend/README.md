# CarRental Frontend (Next.js + TypeScript)

## Setup
```bash
npm install
cp .env.local.example .env.local
npm run dev
```
Opens on **http://localhost:3000**. Make sure the backend is running on port 8080.

## Pages
- `/` — car listing
- `/cars/[id]` — car details + booking form
- `/login`, `/register` — auth
- `/bookings` — my bookings (customer)
- `/admin` — admin dashboard (add/edit/delete cars, view all bookings & users)

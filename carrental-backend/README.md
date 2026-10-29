# CarRental Backend (Spring Boot + PostgreSQL)

## Setup
1. Install Java 17+, Maven, PostgreSQL.
2. Create a database:
   ```sql
   CREATE DATABASE carrental_db;
   ```
3. Edit `src/main/resources/application.properties` with your Postgres username/password.
4. Run:
   ```bash
   mvn spring-boot:run
   ```
   Backend starts on **http://localhost:8080**

## What happens on first run
- Hibernate auto-creates tables (`users`, `cars`, `bookings`) from the Entity classes.
- `data.sql` inserts 8 demo cars with real photos.
- `DataSeeder` creates a default admin: **admin@carrental.com / admin123**

## Main API endpoints
| Method | URL | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/cars | Public |
| GET | /api/cars/{id} | Public |
| POST | /api/bookings | Logged-in user |
| GET | /api/bookings/my | Logged-in user |
| DELETE | /api/bookings/{id} | Owner or Admin |
| POST/PUT/DELETE | /api/admin/cars/** | Admin only |
| GET | /api/admin/bookings | Admin only |
| GET | /api/admin/users | Admin only |

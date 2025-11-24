# Quick Start Guide - Course Knowledge System

## 🚀 Getting Started (5 Minutes)

### 1. Run Database Migration
```bash
pnpm migration:up
```

### 2. Start the Server
```bash
pnpm start:dev
```

### 3. Access Swagger Documentation
Open your browser to: **http://localhost:3000/swagger**

## 📋 Quick Test Flow

### Step 1: Create an Admin User

1. **Sign up a new user:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/sign-up/email \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Admin User",
       "email": "admin@test.com",
       "password": "Admin123!",
       "username": "admin"
     }'
   ```

2. **Verify email** (check logs for verification link)

3. **Update user role to Admin:**
   ```bash
   # Connect to your PostgreSQL database
   psql -U postgres -d epicode
   
   # Update the user role
   UPDATE "user" SET role = 'Admin' WHERE email = 'admin@test.com';
   ```

4. **Sign in:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/sign-in/email \
     -H "Content-Type: application/json" \
     -c cookies.txt \
     -d '{
       "email": "admin@test.com",
       "password": "Admin123!"
     }'
   ```

### Step 2: Create a Course (Admin)

```bash
curl -X POST http://localhost:3000/api/v1/admin/courses \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Introduction to TypeScript",
    "description": "Learn TypeScript from scratch",
    "duration": 300,
    "isActive": true
  }'
```

**Save the returned `courseId`!**

### Step 3: Add a Module (Admin)

```bash
curl -X POST http://localhost:3000/api/v1/admin/courses/{courseId}/modules \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Getting Started",
    "description": "Introduction to TypeScript basics",
    "orderIndex": 0
  }'
```

**Save the returned `moduleId`!**

### Step 4: Add a Lesson (Admin)

```bash
curl -X POST http://localhost:3000/api/v1/admin/courses/modules/{moduleId}/lessons \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "What is TypeScript?",
    "description": "Understanding TypeScript fundamentals",
    "type": "video",
    "videoUrl": "https://example.com/video.mp4",
    "duration": 15,
    "orderIndex": 0
  }'
```

### Step 5: Create a Regular User

```bash
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "User123!",
    "username": "johndoe"
  }'
```

### Step 6: Enroll User in Course (Admin)

```bash
curl -X POST http://localhost:3000/api/v1/admin/courses/{courseId}/enroll \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "userId": "{userId}"
  }'
```

### Step 7: Browse Courses (User)

1. **Sign in as regular user:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/sign-in/email \
     -H "Content-Type: application/json" \
     -c user-cookies.txt \
     -d '{
       "email": "john@test.com",
       "password": "User123!"
     }'
   ```

2. **View available courses:**
   ```bash
   curl -X GET http://localhost:3000/api/v1/courses \
     -b user-cookies.txt
   ```

3. **View my enrollments:**
   ```bash
   curl -X GET http://localhost:3000/api/v1/courses/my/enrollments \
     -b user-cookies.txt
   ```

4. **Update progress:**
   ```bash
   curl -X PUT http://localhost:3000/api/v1/courses/enrollments/{enrollmentId} \
     -H "Content-Type: application/json" \
     -b user-cookies.txt \
     -d '{
       "status": "in_progress",
       "progressPercentage": 50
     }'
   ```

## 📚 Using Swagger UI (Recommended)

**Easier way to test the API:**

1. Open: http://localhost:3000/swagger
2. Expand the `authentication` section
3. Use "Try it out" on `/api/v1/auth-docs/sign-in/email`
4. Copy the response (the actual endpoint is `/api/auth/sign-in/email`)
5. Call the actual Better Auth endpoint from your app or use Swagger's "Authorize" button
6. Test admin and user endpoints

## 🔑 Key Endpoints

### Authentication
- `POST /api/auth/sign-up/email` - Sign up
- `POST /api/auth/sign-in/email` - Sign in
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/reference` - Interactive API docs

### Admin (Requires Admin Role)
- `POST /api/v1/admin/courses` - Create course
- `POST /api/v1/admin/courses/:courseId/modules` - Create module
- `POST /api/v1/admin/courses/modules/:moduleId/lessons` - Create lesson
- `POST /api/v1/admin/courses/:courseId/enroll` - Enroll user

### User (Requires Authentication)
- `GET /api/v1/courses` - List active courses
- `GET /api/v1/courses/:id` - Get course details
- `GET /api/v1/courses/my/enrollments` - My enrollments
- `PUT /api/v1/courses/enrollments/:id` - Update progress

## 🔒 Security Notes

- All course endpoints require authentication
- Admin endpoints require Admin role
- Users can only view their own enrollments
- Email verification is required before login
- Sessions are stored in Redis
- Passwords are hashed with scrypt

## 📖 Full Documentation

- **Complete Guide**: `COURSE_SYSTEM.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`
- **Swagger UI**: http://localhost:3000/swagger
- **Better Auth Reference**: http://localhost:3000/api/auth/reference

## ❓ Troubleshooting

### "Unauthorized" Error
- Make sure you're signed in
- Check that cookies are being sent with requests
- Verify email address (check logs for verification link)

### "Forbidden" Error
- Check user role in database
- Admin endpoints require `role = 'Admin'`

### Migration Errors
- Ensure PostgreSQL is running
- Check database connection in `.env`
- Try `pnpm migration:down` then `pnpm migration:up`

### Can't Access Swagger
- Check if server is running: `pnpm start:dev`
- Verify port 3000 is not in use
- Check for basic auth credentials in `.env`

## 🎉 You're Ready!

You now have a fully functional course knowledge system with:
- ✅ Secure authentication
- ✅ Admin management
- ✅ Course hierarchy (Courses → Modules → Lessons)
- ✅ User enrollments and progress tracking
- ✅ Complete API documentation

Happy coding! 🚀


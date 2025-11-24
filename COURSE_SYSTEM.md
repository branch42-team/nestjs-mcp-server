# Course Knowledge System Documentation

## Overview

This is a secure course knowledge system built with NestJS, TypeORM, PostgreSQL, and Better Auth. The system provides:

- ✅ **Email + Password Authentication** with Better Auth
- ✅ **Admin Plugin** for user management
- ✅ **Role-Based Access Control** (Admin/User roles)
- ✅ **Complete Course Management System**
  - Courses with modules and lessons
  - User enrollments with progress tracking
  - Admin-only course management
  - User course browsing and enrollment tracking

## Architecture

### Database Schema

```
User (Better Auth)
├── id (UUID, PK)
├── email (unique)
├── username (unique)
├── role (Admin | User)
└── ...other auth fields

Course
├── id (UUID, PK)
├── title
├── description
├── thumbnailUrl
├── isActive
├── duration
├── metadata (JSONB)
└── modules (1:many)

Module
├── id (UUID, PK)
├── title
├── description
├── orderIndex
├── isActive
├── courseId (FK → Course)
└── lessons (1:many)

Lesson
├── id (UUID, PK)
├── title
├── description
├── type (video | text | quiz | document)
├── content
├── videoUrl
├── documentUrl
├── duration
├── orderIndex
├── isActive
├── metadata (JSONB)
└── moduleId (FK → Module)

Enrollment
├── id (UUID, PK)
├── userId (FK → User)
├── courseId (FK → Course)
├── status (enrolled | in_progress | completed | suspended)
├── enrolledAt
├── completedAt
├── progressPercentage (0-100)
└── metadata (JSONB)
```

### Key Features

1. **Soft Delete**: All entities support soft deletion
2. **Progress Tracking**: Enrollments track user progress and completion
3. **Flexible Content**: Lessons support multiple content types
4. **Metadata Storage**: JSONB fields for extensibility
5. **Cascade Deletes**: Proper relationship management

## API Endpoints

### Authentication Endpoints

#### Documentation Endpoints (Swagger)
- `POST /api/v1/auth-docs/sign-up/email` - Sign up (documentation)
- `POST /api/v1/auth-docs/sign-in/email` - Sign in (documentation)
- `POST /api/v1/auth-docs/sign-out` - Sign out (documentation)
- `POST /api/v1/auth-docs/forget-password` - Request password reset (documentation)
- `POST /api/v1/auth-docs/reset-password` - Reset password (documentation)
- `POST /api/v1/auth-docs/change-password` - Change password (documentation)
- `POST /api/v1/auth-docs/send-verification-email` - Send verification email (documentation)

#### Actual Better Auth Endpoints
- `POST /api/auth/sign-up/email` - Create new account
- `POST /api/auth/sign-in/email` - Login with email/password
- `POST /api/auth/sign-out` - Logout
- `POST /api/auth/forget-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `POST /api/auth/change-password` - Change password (requires auth)
- `POST /api/auth/send-verification-email` - Resend verification email
- `GET /api/auth/reference` - Interactive API reference (Better Auth OpenAPI)

### Admin Course Management Endpoints

**Base Path**: `/api/v1/admin/courses`
**Required Role**: Admin

#### Courses
- `POST /` - Create course
- `GET /` - Get all courses (including inactive)
- `GET /:id` - Get course details with modules and lessons
- `PUT /:id` - Update course
- `DELETE /:id` - Delete course (soft delete)

#### Modules
- `POST /:courseId/modules` - Create module in course
- `GET /:courseId/modules` - Get all modules in course
- `GET /modules/:moduleId` - Get module details with lessons
- `PUT /modules/:moduleId` - Update module
- `DELETE /modules/:moduleId` - Delete module (soft delete)

#### Lessons
- `POST /modules/:moduleId/lessons` - Create lesson in module
- `GET /modules/:moduleId/lessons` - Get all lessons in module
- `GET /lessons/:lessonId` - Get lesson details
- `PUT /lessons/:lessonId` - Update lesson
- `DELETE /lessons/:lessonId` - Delete lesson (soft delete)

#### Enrollments
- `POST /:courseId/enroll` - Enroll a user in course
- `GET /:courseId/enrollments` - Get all enrollments for course
- `DELETE /enrollments/:enrollmentId` - Unenroll user (soft delete)

### User Course Endpoints

**Base Path**: `/api/v1/courses`
**Authentication**: Required

#### Course Browsing
- `GET /` - Get all active courses
- `GET /:id` - Get course details with modules and lessons
- `GET /lessons/:lessonId` - Get lesson details

#### User Enrollments
- `GET /my/enrollments` - Get current user's enrollments
- `GET /enrollments/:enrollmentId` - Get enrollment details
- `PUT /enrollments/:enrollmentId` - Update enrollment progress

## Usage Examples

### 1. Authentication Flow

#### Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

#### Sign In
```bash
curl -X POST http://localhost:3000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!",
    "rememberMe": true
  }'
```

### 2. Admin: Create Course with Modules and Lessons

#### Create Course
```bash
curl -X POST http://localhost:3000/api/v1/admin/courses \
  -H "Content-Type: application/json" \
  -H "Cookie: session_token=..." \
  -d '{
    "title": "Introduction to TypeScript",
    "description": "Learn TypeScript from scratch",
    "duration": 300,
    "isActive": true
  }'
```

#### Create Module
```bash
curl -X POST http://localhost:3000/api/v1/admin/courses/{courseId}/modules \
  -H "Content-Type: application/json" \
  -H "Cookie: session_token=..." \
  -d '{
    "title": "Getting Started",
    "description": "Introduction to TypeScript basics",
    "orderIndex": 0
  }'
```

#### Create Lesson
```bash
curl -X POST http://localhost:3000/api/v1/admin/courses/modules/{moduleId}/lessons \
  -H "Content-Type: application/json" \
  -H "Cookie: session_token=..." \
  -d '{
    "title": "What is TypeScript?",
    "description": "Understanding TypeScript fundamentals",
    "type": "video",
    "videoUrl": "https://example.com/video.mp4",
    "duration": 15,
    "orderIndex": 0
  }'
```

#### Enroll User in Course
```bash
curl -X POST http://localhost:3000/api/v1/admin/courses/{courseId}/enroll \
  -H "Content-Type: application/json" \
  -H "Cookie: session_token=..." \
  -d '{
    "userId": "user-uuid-here"
  }'
```

### 3. User: Browse Courses and Track Progress

#### Browse Active Courses
```bash
curl -X GET http://localhost:3000/api/v1/courses \
  -H "Cookie: session_token=..."
```

#### Get Course Details
```bash
curl -X GET http://localhost:3000/api/v1/courses/{courseId} \
  -H "Cookie: session_token=..."
```

#### View My Enrollments
```bash
curl -X GET http://localhost:3000/api/v1/courses/my/enrollments \
  -H "Cookie: session_token=..."
```

#### Update Progress
```bash
curl -X PUT http://localhost:3000/api/v1/courses/enrollments/{enrollmentId} \
  -H "Content-Type: application/json" \
  -H "Cookie: session_token=..." \
  -d '{
    "status": "in_progress",
    "progressPercentage": 45,
    "metadata": {
      "lastLessonId": "lesson-uuid",
      "completedLessons": ["lesson1", "lesson2"]
    }
  }'
```

## Security Features

### Authentication
- ✅ Email/password authentication with Better Auth
- ✅ Email verification required before login
- ✅ Password reset functionality
- ✅ Session management with Redis caching
- ✅ Secure password hashing (scrypt)

### Authorization
- ✅ Role-based access control (RBAC)
- ✅ Admin-only endpoints for course management
- ✅ Users can only view their own enrollments
- ✅ Guards and decorators for route protection

### Admin Plugin Features
- ✅ User impersonation (for support)
- ✅ User banning capabilities
- ✅ Admin-specific user management endpoints
- ✅ Configurable admin user IDs

## Database Setup

### Run Migrations
```bash
# Generate migration (if needed)
pnpm typeorm migration:generate src/database/migrations/add-courses-system

# Run migrations
pnpm migration:up

# Rollback migrations
pnpm migration:down
```

### Create Admin User
After signing up a user, update their role to Admin:
```sql
UPDATE "user" SET role = 'Admin' WHERE email = 'admin@example.com';
```

## Development

### Start Development Server
```bash
# Start API and email preview
pnpm start:dev

# Start with Docker (PostgreSQL, Redis)
pnpm docker:dev:up
```

### API Documentation
- **Swagger**: http://localhost:3000/swagger
- **Better Auth Reference**: http://localhost:3000/api/auth/reference
- **Bull Board (Jobs)**: http://localhost:3000/api/queues

All documentation endpoints are protected with basic auth (check `.env` for credentials).

## Environment Variables

Key environment variables for the course system:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=epicode
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres

# Auth
AUTH_SECRET=your-secret-key-here
APP_URL=http://localhost:3000

# Email (for verification/password reset)
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your-email@example.com
MAIL_PASSWORD=your-password
```

## Project Structure

```
src/
├── api/
│   ├── courses/
│   │   ├── entities/          # Database entities
│   │   │   ├── course.entity.ts
│   │   │   ├── module.entity.ts
│   │   │   ├── lesson.entity.ts
│   │   │   └── enrollment.entity.ts
│   │   ├── dto/               # Data transfer objects
│   │   │   ├── course.dto.ts
│   │   │   └── enrollment.dto.ts
│   │   ├── courses.service.ts
│   │   ├── courses-admin.controller.ts  # Admin endpoints
│   │   ├── courses-user.controller.ts   # User endpoints
│   │   └── courses.module.ts
│   └── user/                  # User management
├── auth/
│   ├── entities/              # Better Auth entities
│   ├── dto/                   # Auth DTOs
│   ├── auth.controller.ts     # Auth documentation
│   ├── auth.guard.ts          # Authentication guard
│   └── auth.service.ts
├── config/
│   └── auth/
│       └── better-auth.config.ts  # Better Auth configuration
└── decorators/
    └── auth/
        ├── roles.decorator.ts     # @Roles() decorator
        └── roles.guard.ts         # Role authorization guard
```

## Testing

### Access Swagger Documentation
1. Start the server: `pnpm start:dev`
2. Navigate to: http://localhost:3000/swagger
3. Use the authentication endpoints to get a session
4. Test admin and user endpoints

### Test Authentication Flow
1. Sign up a new user
2. Verify email (check email or logs for verification link)
3. Sign in with credentials
4. Test authenticated endpoints

### Test Course Management
1. Create admin user (update role in database)
2. Sign in as admin
3. Create course, modules, and lessons
4. Enroll users
5. Sign in as regular user
6. Browse courses and view enrollments

## Next Steps

Potential enhancements:
- [ ] Add quiz functionality with scoring
- [ ] Implement lesson completion tracking
- [ ] Add course categories and tags
- [ ] Implement course ratings and reviews
- [ ] Add certificate generation on completion
- [ ] Implement search and filtering
- [ ] Add course prerequisites
- [ ] Implement content restrictions based on progress
- [ ] Add discussion forums per course
- [ ] Implement notifications for new content

## License

MIT

## Author

Parth Patel (@Parthvsquare)


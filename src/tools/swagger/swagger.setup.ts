import { type GlobalConfig } from '@/config/config.type';
import { type INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export const SWAGGER_PATH = '/swagger';

function setupSwagger(app: INestApplication): OpenAPIObject {
  const configService = app.get(ConfigService<GlobalConfig>);
  const appName = configService.getOrThrow('app.name', { infer: true });

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(
      `Parth's Epicode Assignment - Secure Course Knowledge System

**Features:**
- 🔐 Email + Password Authentication with Better Auth
- 👥 Admin Plugin for user management
- 📚 Complete Course Management System
- 📖 Courses with Modules and Lessons
- ✅ User Enrollments with Progress Tracking

---

## 🔐 Authentication Documentation

**Better Auth API Reference:** [/api/auth/swagger](/api/auth/swagger)

The Better Auth documentation provides interactive API reference for all authentication endpoints including:
- Sign up / Sign in
- Session management
- Password reset
- Admin user management
- And more...
`,
    )
    .setVersion('1.0')
    .setExternalDoc('Better Auth API Reference', '/api/auth/swagger')
    .addTag('Authentication', 'External Better Auth API Reference', {
      description: 'Go to Docs',
      url: '/api/auth/swagger',
    })
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'Api-Key', in: 'header' }, 'Api-Key')
    .addServer(
      configService.getOrThrow('app.url', { infer: true }),
      'Development',
    )
    .addServer('http://localhost:8000', 'Local Development')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Use Scalar API Reference instead of default Swagger UI
  app.use(
    SWAGGER_PATH,
    apiReference({
      spec: {
        content: document,
      },
      layout: 'modern',
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch',
      },
      authentication: {
        preferredSecurityScheme: 'bearer',
      },
      theme: 'elysiajs',
      hideClientButton: false,
      showSidebar: true,
      hideDarkModeToggle: false,
      hideModels: false,
      hideDownloadButton: false,
      withFastify: true, // Required when using Fastify adapter
    }),
  );

  return document;
}

export default setupSwagger;

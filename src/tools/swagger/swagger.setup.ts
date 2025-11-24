import { type GlobalConfig } from '@/config/config.type';
import { type INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export const SWAGGER_PATH = '/swagger';

function setupSwagger(app: INestApplication): OpenAPIObject {
  const configService = app.get(ConfigService<GlobalConfig>);
  const appName = configService.getOrThrow('app.name', { infer: true });

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(
      `<p>Parth's Epicode Assignment - Secure Course Knowledge System</p>
      <p><strong>Features:</strong></p>
      <ul>
        <li>🔐 Email + Password Authentication with Better Auth</li>
        <li>👥 Admin Plugin for user management</li>
        <li>📚 Complete Course Management System</li>
        <li>📖 Courses with Modules and Lessons</li>
        <li>✅ User Enrollments with Progress Tracking</li>
      </ul>
      <p>Click <a href="/api/auth/reference">here</a> to see authentication API's.</p>
      <p>See <a href="/COURSE_SYSTEM.md">COURSE_SYSTEM.md</a> for complete documentation.</p>`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'Api-Key', in: 'header' }, 'Api-Key')
    .addServer(
      configService.getOrThrow('app.url', { infer: true }),
      'Development',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document, {
    customSiteTitle: appName,
    jsonDocumentUrl: 'swagger/json',
  });

  return document;
}

export default setupSwagger;

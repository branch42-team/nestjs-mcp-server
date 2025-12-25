# NestJS MCP Server Template

<div align="center">

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

**Production-ready NestJS boilerplate with Model Context Protocol (MCP) server, RAG capabilities, and comprehensive developer tooling**

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [License](#license)

</div>

---

## 🚀 Overview

A comprehensive, production-ready **NestJS template** that combines modern backend architecture with AI capabilities through the **Model Context Protocol (MCP)**. Perfect for building intelligent applications, LMS platforms, content management systems, or any project requiring semantic search and AI integration.

### What Makes This Different?

- 🤖 **Built-in MCP Server**: Expose your data to AI agents with standardized protocol
- 🔍 **RAG Pipeline**: Semantic search with pgvector and local embeddings (no API costs)
- 🔐 **Modern Auth**: Better Auth with support for OAuth, 2FA, magic links, and more
- ⚡ **High Performance**: Fastify adapter (2x faster than Express)
- 🎯 **Production Ready**: Docker, monitoring, graceful shutdown, health checks
- 🛠️ **Developer Experience**: Swagger, GraphQL playground, hot reload, Bull Board UI

---

## ✨ Features

### Core Framework

- ✅ **NestJS** with Fastify adapter for high performance
- ✅ **TypeScript** for type safety and better DX
- ✅ **PostgreSQL** with TypeORM for robust data management
- ✅ **Redis** for caching and queue management

### Authentication & Security

- ✅ **[Better Auth](https://www.better-auth.com/)**: Complete auth solution supporting:
  - Email/Password, OAuth, Magic Links, Passkeys
  - Two-Factor Authentication (2FA)
  - Role-based access control (RBAC)
  - Session management
- ✅ **API Key Management**: Secure programmatic access with SHA-256 hashing
- ✅ **Rate Limiting**: Redis-backed request throttling
- ✅ **Input Validation**: class-validator with custom decorators

### AI & Search Capabilities

- ✅ **MCP Server**: Model Context Protocol implementation for AI agents
- ✅ **RAG Pipeline**: Retrieval-Augmented Generation with semantic search
- ✅ **pgvector**: PostgreSQL extension for vector similarity search
- ✅ **Local Embeddings**: Hugging Face Transformers (no API costs)
- ✅ **Content Chunking**: Intelligent text splitting for better search accuracy

### API Protocols

- ✅ **REST API**: Versioned endpoints with Swagger documentation
- ✅ **GraphQL API**: Apollo Server with type-safe schema
- ✅ **WebSocket**: Socket.io with Redis adapter for clustering

### Background Processing

- ✅ **BullMQ**: Redis-based job queue with retry logic
- ✅ **Worker Process**: Dedicated worker for heavy computations
- ✅ **Bull Board**: Web UI for monitoring jobs and queues

### Email System

- ✅ **[React Email](https://react.email/)**: Beautiful, responsive email templates
- ✅ **[MailPit](https://github.com/axllent/mailpit)**: Local SMTP server for testing
- ✅ **Auto-compilation**: TSX to HTML at build time

### Developer Tools

- ✅ **Swagger UI**: Interactive API documentation
- ✅ **OpenAPI Codegen**: Auto-generate frontend API clients
- ✅ **Dependency Graph**: Visualize module dependencies
- ✅ **ERD Generator**: Database schema visualization
- ✅ **Hot Reload**: Fast development iteration

### DevOps & Monitoring

- ✅ **Docker**: Dev and prod configurations with docker-compose
- ✅ **Prometheus + Grafana**: Optional monitoring dashboards
- ✅ **Pino Logging**: Structured JSON logs
- ✅ **Health Checks**: Kubernetes-ready endpoints
- ✅ **Graceful Shutdown**: Zero downtime deployments
- ✅ **GitHub Actions**: CI/CD pipeline included

### Code Quality

- ✅ **ESLint + Prettier**: Code formatting and linting
- ✅ **Husky + Commitlint**: Git hooks for quality enforcement
- ✅ **Jest**: Unit and E2E testing
- ✅ **SWC**: Fast compilation (faster than Webpack)

### Other Features

- ✅ **i18n**: Internationalization support
- ✅ **File Uploads**: Local and AWS S3 support
- ✅ **Pagination**: Offset and cursor-based
- ✅ **Sentry Integration**: Error tracking (ready to configure)
- ✅ **pnpm**: Fast, disk-efficient package manager

---

## 🎯 Use Cases

This template is perfect for:

- 📚 **Learning Management Systems (LMS)**: Course content with semantic search
- 🤖 **AI-Powered Applications**: Chat agents, document search, RAG systems
- 📝 **Content Management**: Blog, documentation, knowledge bases
- 🏢 **SaaS Platforms**: Multi-tenant apps with auth and API keys
- 🔧 **Internal Tools**: Admin dashboards, background job processing
- 🚀 **Startup MVPs**: Production-ready foundation to move fast

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Docker & Docker Compose
- pnpm (recommended) or npm

### 1. Use This Template

Click the **"Use this template"** button on GitHub or:

```bash
git clone https://github.com/branch42-team/nestjs-mcp-server.git my-project
cd my-project
pnpm install
```

### 2. Environment Setup

```bash
cp .env.example .env
cp .env.docker.example .env.docker
```

Edit `.env` files with your configuration.

### 3. Start Development Environment

```bash
# Start all services (PostgreSQL, Redis, MailPit, etc.)
pnpm docker:dev:up

# Run database migrations
docker exec -it nestjs-server sh
pnpm migration:up
exit
```

### 4. Access Your Services

- **API Swagger**: http://localhost:3000/swagger
- **GraphQL Playground**: http://localhost:3000/graphql
- **Bull Board** (Queue UI): http://localhost:3000/bullboard
- **MailPit** (Email Testing): http://localhost:18025
- **Prometheus** (Monitoring): http://localhost:9090 (if enabled)
- **Grafana** (Dashboards): http://localhost:3001 (if enabled)

### 5. Create Your First User

Visit Swagger UI and use:

- `POST /api/auth/sign-up/email` to create an account
- `POST /api/auth/sign-in/email` to login

---

## 📚 Documentation

### Core Features

#### 🔒 Better Auth

Modern authentication framework handling all auth patterns out of the box:

- **Email/Password**: Traditional auth with secure password hashing
- **OAuth**: Google, GitHub, and more (easily extensible)
- **Magic Links**: Passwordless authentication
- **Passkeys**: WebAuthn support for biometric auth
- **Two-Factor Authentication**: TOTP-based 2FA
- **Role-Based Access Control**: Admin/User roles with guards
- **Session Management**: Redis-backed sessions with auto-refresh

[Learn more about Better Auth →](https://www.better-auth.com/)

#### 🤖 MCP Server

**Model Context Protocol** server implementation enabling AI agents to query your data:

**Key Features**:

- 6 pre-built tools for course/content management
- API key authentication with user-scoped permissions
- Enrollment-based authorization (example use case)
- Semantic search with RAG pipeline
- Interactive CLI client included

**Quick Example**:

1. Create API key via Swagger: `POST /api/v1/user/api-keys`
2. Setup CLI:
   ```bash
   cd mcp-client
   echo "MCP_API_KEY=your-key" > .env
   pnpm install && pnpm dev
   ```
3. Query naturally:
   ```
   > list courses
   > find lessons about variables
   > search typescript
   ```

**Documentation**:

- [MCP Server Guide](./docs/MCP_SERVER.md) - Complete implementation details
- [API Key Management](./docs/API_KEY_MANAGEMENT.md) - Security best practices
- [CLI Client](./mcp-client/README.md) - Interactive terminal guide

#### 🔑 API Key Management

Secure programmatic access for integrations and MCP clients:

**Endpoints**:

- `POST /api/v1/user/api-keys` - Create new key
- `GET /api/v1/user/api-keys` - List your keys
- `GET /api/v1/user/api-keys/:id` - Get key details
- `DELETE /api/v1/user/api-keys/:id` - Revoke key

**Security Features**:

- SHA-256 hashed storage (raw key shown once)
- Optional expiration dates
- Usage tracking (`lastUsedAt`)
- Instant revocation
- User-scoped permissions

#### 🚀 Automatic Frontend API Generation

Generate type-safe API clients from your Swagger spec:

```bash
# On your frontend project
pnpm codegen
```

This auto-generates all API calls with [TanStack Query](https://tanstack.com/query/latest) hooks. Import and use immediately:

```typescript
import { useGetUserProfile } from '@/api/generated';

function Profile() {
  const { data, isLoading } = useGetUserProfile();
  // Fully typed, with caching, refetching, etc.
}
```

![OpenAPI Codegen](./github-assets/openapi-codegen.png)

#### 🚨 Server & Database Monitoring

Optional Prometheus + Grafana setup for production monitoring:

**Enable monitoring**:

```bash
# In .env
COMPOSE_PROFILES=monitoring
```

**Metrics tracked**:

- HTTP request duration/rate
- Database connection pool stats
- Queue job latency and throughput
- Memory and CPU usage
- Custom business metrics

**Dashboards**:

Server Monitoring:
![Server Monitoring](./github-assets/server-monitoring.png)

Database Monitoring:
![Database Monitoring](./github-assets/database-monitoring.png)

#### 📬 Email Management

**React Email** for beautiful, testable email templates:

- Design emails in React with type safety
- Preview all templates in local web UI
- Automatic compilation to HTML at build time
- Spam, accessibility, and responsiveness checks

**Commands**:

```bash
# Preview templates in browser
pnpm email:dev

# Auto-compiled during build (handled automatically)
pnpm email:build
```

**MailPit** for local testing:

- SMTP server runs automatically in dev mode
- Web UI at http://localhost:18025
- Catch all outgoing emails
- No real emails sent during development

![MailPit](./github-assets/mailpit.png)

---

## 🐳 Docker Commands

### Development

```bash
# Start all services
pnpm docker:dev:up

# Stop all services
pnpm docker:dev:down

# View logs
docker logs nestjs-server -f
```

### Production

```bash
# Build and start production containers
pnpm docker:prod:up

# Stop production containers
pnpm docker:prod:down
```

### Deployment

```bash
# Quick deploy script
sh ./bin/deploy.sh

# Or use GitHub Actions
# Workflow: .github/workflows/main.yml
```

---

## 🛠️ Development Tools

### Dependency Graph

Visualize module dependencies and detect circular references:

```bash
# Requires Graphviz: brew install graphviz

# All dependencies
pnpm graph:app

# Only circular dependencies
pnpm graph:circular
```

![Dependency Graph](./github-assets/graph.png)

### Database ERD

Generate entity relationship diagrams:

```bash
pnpm erd:generate
```

![ERD](./github-assets/erd.png)

---

## 🏗️ Project Structure

```
.
├── src/
│   ├── api/              # API modules (courses, users, etc.)
│   ├── auth/             # Authentication (Better Auth integration)
│   ├── mcp/              # MCP server implementation
│   ├── config/           # Configuration modules
│   ├── database/         # TypeORM setup and migrations
│   ├── services/         # Shared services (embeddings, AWS, etc.)
│   ├── worker/           # Background job processors
│   └── main.ts           # Application entry point
├── mcp-client/           # Interactive CLI client for MCP
├── docker-compose.yml    # Base Docker configuration
├── docker-compose.dev.yml   # Development overrides
├── docker-compose.prod.yml  # Production overrides
└── docs/                 # Additional documentation
```

---

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:cov

# Watch mode
pnpm test:watch
```

---

## 🔧 Customization Guide

### 1. Remove Example Features

This template includes a course management system as an example. To adapt for your use case:

**Remove course-related code**:

```bash
# Delete course modules
rm -rf src/api/courses

# Remove from app.module.ts imports
# Update database migrations
```

**Or keep and modify**:

- Rename entities to match your domain
- Adjust the MCP tools in `src/mcp/tools/`
- Update RAG pipeline in `src/api/courses/courses-rag.service.ts`

### 2. Add Your Own Modules

```bash
# Generate new module
nest g module features/my-feature
nest g service features/my-feature
nest g controller features/my-feature
```

### 3. Configure Authentication

**Add OAuth providers** (edit `src/auth/better-auth.service.ts`):

```typescript
plugins: [
  oauth({
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  }),
],
```

### 4. Customize MCP Tools

Add your own tools in `src/mcp/tools/`:

```typescript
export const myCustomTool: Tool = {
  name: 'my_custom_tool',
  description: 'Description for AI agents',
  inputSchema: {
    type: 'object',
    properties: {
      /* ... */
    },
  },
};
```

---

## 📦 Tech Stack

| Category         | Technology                 | Purpose                                         |
| ---------------- | -------------------------- | ----------------------------------------------- |
| **Runtime**      | Node.js + TypeScript       | Server runtime with type safety                 |
| **Framework**    | NestJS + Fastify           | Enterprise architecture, 2x Express performance |
| **Database**     | PostgreSQL 16              | ACID-compliant relational database              |
| **Vector Store** | pgvector                   | Native Postgres vector extension                |
| **ORM**          | TypeORM                    | Mature ORM with migrations                      |
| **Cache/Queue**  | Redis + BullMQ             | In-memory cache and job queue                   |
| **Auth**         | Better Auth                | Modern authentication framework                 |
| **API**          | REST + GraphQL + WebSocket | Multiple protocol support                       |
| **Embeddings**   | Hugging Face Transformers  | Local, cost-free embeddings                     |
| **Email**        | React Email + MailPit      | Template management + testing                   |
| **Monitoring**   | Prometheus + Grafana       | Metrics and dashboards                          |
| **Logging**      | Pino                       | Structured JSON logging                         |
| **Testing**      | Jest                       | Unit and E2E tests                              |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Better Auth](https://www.better-auth.com/) - Modern authentication
- [Model Context Protocol](https://modelcontextprotocol.io/) - AI agent protocol
- [React Email](https://react.email/) - Email templates
- [Hugging Face](https://huggingface.co/) - ML models and embeddings

---

## 🌟 Star History

If you find this template useful, please consider giving it a star ⭐

---

<div align="center">

**Built with ❤️ by [Branch42 Team](https://github.com/branch42-team)**

[Report Bug](https://github.com/branch42-team/nestjs-mcp-server/issues) • [Request Feature](https://github.com/branch42-team/nestjs-mcp-server/issues)

</div>

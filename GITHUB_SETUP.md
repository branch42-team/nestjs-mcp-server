# GitHub Repository Setup Guide

## 📝 Repository Description

Use this as your GitHub repository description:

```
Production-ready NestJS template with Model Context Protocol (MCP) server, RAG pipeline, pgvector semantic search, Better Auth, and comprehensive developer tooling. Docker-ready with REST/GraphQL/WebSocket APIs.
```

**Alternative (shorter)**:

```
Enterprise NestJS boilerplate with MCP server, RAG, vector search, Better Auth, and full-stack tooling. Production-ready with Docker.
```

---

## 🏷️ Repository Topics (Tags)

Add these topics to help people discover your template:

**Core Technologies**:

- `nestjs`
- `typescript`
- `fastify`
- `postgresql`
- `typeorm`
- `redis`
- `docker`

**AI/ML Features**:

- `mcp`
- `model-context-protocol`
- `rag`
- `retrieval-augmented-generation`
- `pgvector`
- `vector-search`
- `semantic-search`
- `embeddings`
- `huggingface`

**Authentication**:

- `better-auth`
- `authentication`
- `authorization`
- `jwt`
- `api-keys`

**API & Protocols**:

- `rest-api`
- `graphql`
- `websocket`
- `swagger`
- `openapi`

**Developer Tools**:

- `bullmq`
- `prometheus`
- `grafana`
- `react-email`
- `pino`

**General**:

- `boilerplate`
- `template`
- `starter`
- `backend`
- `microservices`
- `production-ready`
- `enterprise`

---

## ⚙️ Repository Settings

### General Settings

1. **Template Repository**: ✅ Enable

   - Go to Settings → Template repository → ✅ Check the box
   - This allows users to click "Use this template"

2. **Features**:

   - ✅ Issues (for bug reports and feature requests)
   - ✅ Discussions (optional, for community Q&A)
   - ⬜ Projects (optional)
   - ⬜ Wiki (README is sufficient)

3. **Pull Requests**:
   - ✅ Allow squash merging
   - ✅ Allow rebase merging
   - ✅ Automatically delete head branches

### Branch Protection (Optional)

For `main` branch:

- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass (CI/CD)
- ✅ Require branches to be up to date before merging

---

## 📁 About Section

**Website**: (optional, if you have documentation site)

**Topics**: Add all topics listed above

**Include in the home page**: ✅ Checked

**Releases**: ✅ Checked (once you create your first release)

**Packages**: ⬜ Unchecked (unless publishing to npm/Docker Hub)

---

## 🎯 Issue Templates

Create these issue templates in `.github/ISSUE_TEMPLATE/`:

### 1. Bug Report (`bug_report.yml`)

```yaml
name: Bug Report
description: File a bug report
title: '[Bug]: '
labels: ['bug', 'triage']
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!

  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: A clear description of the bug
      placeholder: Tell us what you see!
    validations:
      required: true

  - type: textarea
    id: reproduction
    attributes:
      label: Steps to Reproduce
      description: Steps to reproduce the behavior
      placeholder: |
        1. Go to '...'
        2. Click on '....'
        3. Scroll down to '....'
        4. See error
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What you expected to happen
    validations:
      required: true

  - type: textarea
    id: environment
    attributes:
      label: Environment
      description: Your environment details
      value: |
        - OS: [e.g., macOS, Ubuntu, Windows]
        - Node version: [e.g., 20.10.0]
        - pnpm version: [e.g., 9.0.0]
        - Docker version: [e.g., 24.0.0]
    validations:
      required: true
```

### 2. Feature Request (`feature_request.yml`)

```yaml
name: Feature Request
description: Suggest an idea for this project
title: '[Feature]: '
labels: ['enhancement']
body:
  - type: markdown
    attributes:
      value: |
        Thanks for suggesting a feature!

  - type: textarea
    id: problem
    attributes:
      label: Problem Description
      description: Is your feature request related to a problem?
      placeholder: I'm always frustrated when...

  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: Describe the solution you'd like
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
      description: Describe alternatives you've considered

  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Add any other context or screenshots
```

---

## 🚀 GitHub Actions

Your `.github/workflows/main.yml` should include:

```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: pgvector/pgvector:pg17
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7.0.1-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
      - run: pnpm test:e2e
```

---

## 📊 Shields.io Badges

Consider adding more badges to your README:

```markdown
![CI/CD](https://github.com/branch42-team/nestjs-mcp-server/workflows/CI%2FCD/badge.svg)
![License](https://img.shields.io/github/license/branch42-team/nestjs-mcp-server)
![Stars](https://img.shields.io/github/stars/branch42-team/nestjs-mcp-server)
![Forks](https://img.shields.io/github/forks/branch42-team/nestjs-mcp-server)
![Issues](https://img.shields.io/github/issues/branch42-team/nestjs-mcp-server)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
```

---

## 📢 Social Preview

Create a social preview image (1280x640px) showing:

- Template name: "NestJS MCP Server"
- Key features: MCP, RAG, pgvector
- Tech stack logos: NestJS, TypeScript, PostgreSQL, Docker
- Branch42 branding

Upload at: Settings → General → Social preview

---

## 🎁 Release Strategy

### Version 1.0.0 (Initial Release)

**Tag**: `v1.0.0`

**Release Notes Template**:

```markdown
# 🎉 NestJS MCP Server Template v1.0.0

## What's Included

### Core Features

- ✅ NestJS with Fastify for high performance
- ✅ PostgreSQL with TypeORM and pgvector
- ✅ Better Auth for modern authentication
- ✅ Model Context Protocol (MCP) server
- ✅ RAG pipeline with semantic search
- ✅ REST, GraphQL, and WebSocket APIs

### Developer Experience

- ✅ Docker Compose for dev and prod
- ✅ Swagger documentation
- ✅ BullMQ with Bull Board UI
- ✅ React Email templates
- ✅ Prometheus + Grafana monitoring
- ✅ Comprehensive testing setup

### Production Ready

- ✅ Graceful shutdown
- ✅ Health checks
- ✅ Rate limiting
- ✅ Structured logging
- ✅ Database migrations
- ✅ CI/CD with GitHub Actions

## Getting Started

1. Click "Use this template" button
2. Clone your new repository
3. Follow the Quick Start guide in README.md

## Documentation

- [README](README.md) - Complete documentation
- [LICENSE](LICENSE) - MIT License

## Support

- 🐛 [Report bugs](https://github.com/branch42-team/nestjs-mcp-server/issues)
- 💡 [Request features](https://github.com/branch42-team/nestjs-mcp-server/issues)
- ⭐ Star this repo if you find it useful!

---

**Built with ❤️ by Branch42 Team**
```

---

## 📝 Pull Request Template

Create `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## Description

<!-- Describe your changes in detail -->

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## How Has This Been Tested?

<!-- Describe the tests that you ran -->

- [ ] Unit tests
- [ ] E2E tests
- [ ] Manual testing

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Screenshots (if applicable)

<!-- Add screenshots to help explain your changes -->

## Additional Notes

<!-- Any additional information -->
```

---

## 🌐 Community Files

### CODE_OF_CONDUCT.md

```markdown
# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone.

## Our Standards

Examples of behavior that contributes to a positive environment:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

## Enforcement

Instances of abusive behavior may be reported to branch42team@gmail.com.
All complaints will be reviewed and investigated promptly and fairly.
```

### CONTRIBUTING.md

```markdown
# Contributing to NestJS MCP Server

Thank you for your interest in contributing! 🎉

## Development Setup

1. Fork and clone the repository
2. Run `pnpm install`
3. Copy `.env.example` to `.env`
4. Run `pnpm docker:dev:up`
5. Run migrations: `docker exec -it nestjs-server sh -c "pnpm migration:up"`

## Development Workflow

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests: `pnpm test`
4. Run linter: `pnpm lint`
5. Commit with conventional commits: `git commit -m "feat: add new feature"`
6. Push and create a Pull Request

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Questions?

Open an issue or discussion if you need help!
```

---

## 📈 Marketing Suggestions

### 1. Dev.to Article

Write a blog post: "Building Production-Ready NestJS Apps with MCP and RAG"

### 2. Twitter/X Post

```
🚀 Just released: NestJS MCP Server Template

✨ Features:
• Model Context Protocol (MCP) server
• RAG with pgvector semantic search
• Better Auth (OAuth, 2FA, passkeys)
• REST + GraphQL + WebSocket
• Docker-ready with monitoring

Perfect for AI-powered apps!

⭐ Star: https://github.com/branch42-team/nestjs-mcp-server

#NestJS #TypeScript #AI #MCP #OpenSource
```

### 3. Reddit Posts

- r/node
- r/typescript
- r/webdev
- r/programming

### 4. Product Hunt (Later)

When you have some users, launch on Product Hunt with:

- Demo video
- Screenshots
- Use cases
- Comparison with alternatives

---

## ✅ Launch Checklist

Before making the repository public:

- [ ] README.md complete and polished
- [ ] LICENSE file added (MIT)
- [ ] .env.example updated with all variables
- [ ] Docker setup tested and working
- [ ] CI/CD pipeline passing
- [ ] Issue templates created
- [ ] Contributing guidelines added
- [ ] Code of conduct added
- [ ] Repository marked as template
- [ ] Topics/tags added
- [ ] Description set
- [ ] Social preview image created
- [ ] First release (v1.0.0) created
- [ ] Documentation reviewed
- [ ] All assignment-specific references removed

---

Good luck with your template! 🚀

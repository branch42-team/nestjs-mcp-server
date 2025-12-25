# Epicode MCP CLI Client

Interactive command-line interface for querying course content via the Model Context Protocol (MCP) server.

## Features

- 🔐 **Secure Authentication** - API key-based authentication
- 🤖 **Natural Language Queries** - Ask questions in plain English
- 🎨 **Colorized Output** - Beautiful terminal formatting
- 📚 **Course Management** - List, search, and view course details
- 🔍 **Semantic Search** - Find lessons using AI-powered search
- 🔗 **Smart Context** - Remembers course IDs for easier navigation

## Prerequisites

- Node.js 18+ or Bun runtime
- Access to running MCP server (Docker container)
- Valid API key for authentication

## Installation

1. Navigate to the client directory:

```bash
cd mcp-client
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
bun install
```

3. Create `.env` file with your API key:

```bash
cp .env.example .env
```

4. Edit `.env` and add your API key:

```env
MCP_API_KEY=epck_your_api_key_here
MCP_SERVER_CONTAINER=nestjs-mcp
```

## Getting an API Key

You need to create an API key through the REST API:

1. Start the main application:

```bash
cd ..
pnpm docker:dev:up
```

2. Sign in or create an account via Swagger UI:

   - Open http://localhost:3000/swagger
   - Use `/api/auth/sign-up/email` or `/api/auth/sign-in/email`

3. Create an API key:

   - Call `POST /api/v1/user/api-keys` with:

   ```json
   {
     "name": "MCP Client Key"
   }
   ```

   - Copy the returned `key` value (only shown once!)

4. Add the key to your `.env` file

## Usage

### Start the CLI

```bash
npm start
# or during development
npm run dev
```

### Available Commands

#### Course Management

- `list courses` - List all your enrolled courses
- `search [term]` - Search courses by title or description
- `show course [id]` - Get detailed course information with modules and lessons

#### Lesson Management

- `show lesson [id]` - Get full lesson content
- `find lessons about [term]` - Semantic search across all lesson content
- `similar to [lesson-id]` - Find lessons with similar content

#### General

- `help` or `?` - Show help message
- `exit` or `quit` - Exit the CLI

### Example Session

```
epicode> list courses

📚 Found 3 course(s):

1. Introduction to TypeScript
   ID: 123e4567-e89b-12d3-a456-426614174000
   Learn TypeScript fundamentals and advanced features...
   Duration: 300 minutes

...

epicode> find lessons about variables

🔍 Found 5 result(s):

1. Variables in TypeScript
   Similarity: 92.5%
   Lesson ID: 234e5678-e89b-12d3-a456-426614174001
   Variables are containers for storing data values. In TypeScript...

...

epicode> show course 123e4567-e89b-12d3-a456-426614174000

📘 Introduction to TypeScript

ID: 123e4567-e89b-12d3-a456-426614174000
Learn TypeScript fundamentals and advanced features
Duration: 300 minutes

📑 Modules (3):

  1. Getting Started
     ID: 345e6789-e89b-12d3-a456-426614174002
     Introduction to TypeScript basics
     📝 4 lesson(s):
       1. What is TypeScript? (video)
       2. Setting up your environment (text)
       ...

epicode> exit
```

## Natural Language Queries

The CLI understands various natural language patterns:

- "list my courses"
- "search for typescript"
- "find lessons about variables"
- "show me course [id]"
- "what's lesson [id] about?"
- "find similar lessons to [id]"

## Authorization

### User Permissions

- **Regular Users**: Can only access courses they're enrolled in
- **Admins**: Can access all courses and content

The CLI automatically enforces these permissions based on your API key.

## Troubleshooting

### Connection Errors

**Error: Failed to connect to MCP server**

Solution:

1. Check if MCP server is running:

   ```bash
   docker ps | grep nestjs-mcp
   ```

2. Start the server if needed:
   ```bash
   cd ..
   pnpm docker:dev:up
   ```

### Authentication Errors

**Error: Invalid or expired API key**

Solution:

1. Verify your API key in `.env`
2. Create a new API key if needed (keys can expire)
3. Ensure the key starts with `epck_`

### No Results Found

**"No courses found"**

Possible causes:

- You're not enrolled in any courses (regular users)
- Ask an admin to enroll you in courses
- Check if courses exist in the system

## Development

### Build

```bash
npm run build
```

### Run in Development Mode

```bash
npm run dev
```

### Project Structure

```
mcp-client/
├── src/
│   ├── index.ts        # Main CLI application
│   ├── client.ts       # MCP client wrapper
│   ├── agent.ts        # Query processing logic
│   └── formatter.ts    # Output formatting
├── package.json
├── tsconfig.json
└── README.md
```

## Technical Details

### MCP Protocol

The client uses the Model Context Protocol (MCP) SDK to communicate with the server:

- **Transport**: stdio via Docker exec
- **Authentication**: API key in request metadata
- **Tools**: 6 course management tools exposed by server

### Available Tools

1. `list_courses` - Paginated course listing
2. `search_courses` - Keyword search
3. `get_course_details` - Full course structure
4. `get_lesson_content` - Individual lesson data
5. `semantic_search` - AI-powered content search
6. `find_similar_lessons` - Content similarity matching

## Security

- API keys are stored in `.env` (never committed)
- Keys are sent securely via MCP protocol
- Server validates all requests
- Enrollment-based authorization enforced

## Support

For issues or questions:

1. Check the main project documentation
2. Verify your API key is valid
3. Ensure MCP server is running
4. Check Docker logs: `docker logs nestjs-mcp`

## License

MIT

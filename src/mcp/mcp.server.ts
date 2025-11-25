import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CourseHandlers } from './handlers/course.handlers';
import { RagHandlers } from './handlers/rag.handlers';
import { McpAuthMiddleware } from './middleware/auth.middleware';
import { COURSE_TOOLS } from './tools/courses.tools';

/**
 * MCP Server Implementation
 *
 * Exposes course management tools via the Model Context Protocol.
 * Handles authentication, tool registration, and request routing.
 */
@Injectable()
export class McpServer implements OnModuleInit {
  private readonly logger = new Logger(McpServer.name);
  private server: Server;
  private serverName: string;
  private serverVersion: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly authMiddleware: McpAuthMiddleware,
    private readonly courseHandlers: CourseHandlers,
    private readonly ragHandlers: RagHandlers,
  ) {
    this.serverName =
      this.configService.get<string>('mcp.serverName') || 'epicode-course-mcp';
    this.serverVersion =
      this.configService.get<string>('mcp.serverVersion') || '1.0.0';
  }

  async onModuleInit() {
    // Initialize in main.ts when in MCP mode
  }

  /**
   * Initialize and start the MCP server
   */
  async start() {
    this.logger.log('Initializing MCP server...');

    // Create MCP server instance
    this.server = new Server(
      {
        name: this.serverName,
        version: this.serverVersion,
      },
      {
        capabilities: {
          tools: {},
        },
      },
    );

    // Register tool handlers
    this.registerToolHandlers();

    // Set up stdio transport
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    this.logger.log(
      `MCP server started: ${this.serverName} v${this.serverVersion}`,
    );
    this.logger.log(`Registered ${Object.keys(COURSE_TOOLS).length} tools`);
  }

  /**
   * Register all tool handlers
   */
  private registerToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: Object.values(COURSE_TOOLS),
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request: any) => {
        const { name, arguments: args } = request.params;

        try {
          // Extract API key from metadata (if provided)
          const apiKey = args?.apiKey || process.env.MCP_API_KEY;

          // Authenticate user
          const user = await this.authMiddleware.validateRequest(apiKey);

          // Remove apiKey from arguments before passing to handlers
          const cleanArgs = { ...args };
          delete cleanArgs.apiKey;

          // Route to appropriate handler
          let result: any;

          switch (name) {
            case 'list_courses':
              result = await this.courseHandlers.listCourses(user, cleanArgs);
              break;

            case 'search_courses':
              result = await this.courseHandlers.searchCourses(user, cleanArgs);
              break;

            case 'get_course_details':
              result = await this.courseHandlers.getCourseDetails(
                user,
                cleanArgs,
              );
              break;

            case 'get_lesson_content':
              result = await this.courseHandlers.getLessonContent(
                user,
                cleanArgs,
              );
              break;

            case 'semantic_search':
              result = await this.ragHandlers.semanticSearch(user, cleanArgs);
              break;

            case 'find_similar_lessons':
              result = await this.ragHandlers.findSimilarLessons(
                user,
                cleanArgs,
              );
              break;

            default:
              throw new Error(`Unknown tool: ${name}`);
          }

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        } catch (error: any) {
          this.logger.error(`Error handling tool ${name}:`, error);

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    error: error.message || 'An error occurred',
                    status: error.status || 500,
                  },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }
      },
    );
  }

  /**
   * Gracefully shutdown the server
   */
  async stop() {
    if (this.server) {
      this.logger.log('Stopping MCP server...');
      await this.server.close();
      this.logger.log('MCP server stopped');
    }
  }
}

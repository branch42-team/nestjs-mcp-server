import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

/**
 * MCP Client Wrapper
 *
 * Handles connection to MCP server and tool invocation.
 */
export class McpClient {
  private client: Client;
  private transport: StdioClientTransport | null = null;
  private apiKey: string;
  private serverPath: string;
  private useDocker: boolean;
  private containerName: string;

  constructor(
    apiKey: string,
    options: {
      serverPath?: string;
      useDocker?: boolean;
      containerName?: string;
    } = {},
  ) {
    this.apiKey = apiKey;
    this.serverPath = options.serverPath || process.cwd();
    this.useDocker = options.useDocker ?? false;
    this.containerName = (options.containerName || 'assignment-mcp').trim();
    this.client = new Client(
      {
        name: 'epicode-mcp-client',
        version: '1.0.0',
      },
      {
        capabilities: {},
      },
    );
  }

  /**
   * Connect to MCP server (local or Docker)
   */
  async connect(): Promise<void> {
    if (this.useDocker) {
      // eslint-disable-next-line no-console
      console.log(
        `Connecting to MCP server in container: ${this.containerName}...`,
      );

      this.transport = new StdioClientTransport({
        command: 'docker',
        args: [
          'exec',
          '-i',
          '-e',
          'IS_MCP=true',
          this.containerName,
          'node',
          'dist/main.js',
        ],
      });
    } else {
      // eslint-disable-next-line no-console
      console.log(`Connecting to local MCP server at: ${this.serverPath}...`);

      this.transport = new StdioClientTransport({
        command: 'node',
        args: ['dist/main.js'],
        env: {
          ...process.env,
          IS_MCP: 'true',
        },
        cwd: this.serverPath,
      });
    }

    // Connect client to transport
    await this.client.connect(this.transport);

    // eslint-disable-next-line no-console
    console.log('Connected to MCP server');
  }

  /**
   * List available tools
   */
  async listTools(): Promise<any[]> {
    const result = await this.client.listTools();
    return result.tools || [];
  }

  /**
   * Call a tool
   */
  async callTool(name: string, args: Record<string, any> = {}): Promise<any> {
    // Add API key to arguments
    const argsWithAuth = {
      ...args,
      apiKey: this.apiKey,
    };

    const result = await this.client.callTool({
      name,
      arguments: argsWithAuth,
    });

    // Parse the response
    const content = result.content as Array<{ type: string; text?: string }>;
    if (
      content &&
      content.length > 0 &&
      content[0].type === 'text' &&
      content[0].text
    ) {
      return JSON.parse(content[0].text);
    }

    return result;
  }

  /**
   * Disconnect from server
   */
  async disconnect(): Promise<void> {
    if (this.transport) {
      await this.client.close();
      this.transport = null;
      // eslint-disable-next-line no-console
      console.log('Disconnected from MCP server');
    }
  }
}

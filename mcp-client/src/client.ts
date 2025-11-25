import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';

/**
 * MCP Client Wrapper
 *
 * Handles connection to MCP server and tool invocation.
 */
export class McpClient {
  private client: Client;
  private transport: StdioClientTransport | null = null;
  private apiKey: string;
  private containerName: string;

  constructor(apiKey: string, containerName: string = 'assignment-mcp') {
    this.apiKey = apiKey;
    this.containerName = containerName;
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
   * Connect to MCP server via Docker exec
   */
  async connect(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(
      `Connecting to MCP server in container: ${this.containerName}...`,
    );

    // Spawn docker exec process
    const dockerProcess = spawn('docker', [
      'exec',
      '-i',
      this.containerName,
      'node',
      'dist/main.js',
    ]);

    // Create stdio transport
    this.transport = new StdioClientTransport({
      command: dockerProcess.stdio[0] as any,
      stderr: dockerProcess.stderr as any,
    });

    // Connect client to transport
    await this.client.connect(this.transport);

    // eslint-disable-next-line no-console
    console.log('Connected to MCP server');
  }

  /**
   * List available tools
   */
  async listTools(): Promise<any[]> {
    const result = await this.client.request(
      {
        method: 'tools/list',
      },
      { schema: { type: 'object' } } as any,
    );
    return (result as any).tools || [];
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

    const result = await this.client.request(
      {
        method: 'tools/call',
        params: {
          name,
          arguments: argsWithAuth,
        },
      },
      { schema: { type: 'object' } } as any,
    );

    // Parse the response
    const content = (result as any).content;
    if (content && content[0] && content[0].text) {
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

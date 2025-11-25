#!/usr/bin/env node

import chalk from 'chalk';
import * as dotenv from 'dotenv';
import * as readline from 'readline';
import { Agent } from './agent.js';
import { McpClient } from './client.js';
import { Formatter } from './formatter.js';

// Load environment variables
dotenv.config();

/**
 * Main CLI Application
 *
 * Interactive chat interface for querying courses via MCP.
 */
class CLI {
  private client: McpClient | null = null;
  private agent: Agent | null = null;
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.cyan('epicode> '),
    });
  }

  /**
   * Start the CLI
   */
  async start() {
    // eslint-disable-next-line no-console
    console.clear();
    // eslint-disable-next-line no-console
    console.log(chalk.bold.red('\n╔════════════════════════════════════════╗'));
    // eslint-disable-next-line no-console
    console.log(chalk.bold.red('║   Epicode MCP CLI Client v1.0.0        ║'));
    // eslint-disable-next-line no-console
    console.log(chalk.bold.red('╚════════════════════════════════════════╝\n'));

    // Get API key
    const apiKey = process.env.MCP_API_KEY;
    if (!apiKey) {
      // eslint-disable-next-line no-console
      console.error(
        chalk.red(
          '❌ Error: MCP_API_KEY not found in environment variables.\n',
        ),
      );
      // eslint-disable-next-line no-console
      console.log(chalk.yellow('Please set your API key in .env file:\n'));
      // eslint-disable-next-line no-console
      console.log(chalk.dim('  MCP_API_KEY=your-api-key-here\n'));
      // eslint-disable-next-line no-console
      console.log(
        chalk.blue(
          'Get an API key by calling POST /api/v1/user/api-keys endpoint.\n',
        ),
      );
      process.exit(1);
    }

    const useDocker = process.env.MCP_USE_DOCKER === 'true';
    const containerName = (
      process.env.MCP_SERVER_CONTAINER || 'assignment-mcp'
    ).trim();
    // Default to parent directory (the main project)
    const serverPath = process.env.MCP_SERVER_PATH || '..';

    // Connect to MCP server
    // eslint-disable-next-line no-console
    console.log(
      chalk.dim(
        useDocker
          ? `Initializing MCP client (Docker: ${containerName})...`
          : `Initializing MCP client (Local: ${serverPath})...`,
      ),
    );
    this.client = new McpClient(apiKey, {
      useDocker,
      containerName,
      serverPath,
    });

    try {
      await this.client.connect();
      this.agent = new Agent(this.client);

      // eslint-disable-next-line no-console
      console.log(
        Formatter.formatSuccess('Connected to MCP server successfully!'),
      );
      // eslint-disable-next-line no-console
      console.log(chalk.dim('Type "help" for available commands.\n'));

      // Start interactive loop
      this.rl.prompt();
      this.setupHandlers();
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(
        chalk.red(`\n❌ Failed to connect to MCP server: ${error.message}\n`),
      );
      // eslint-disable-next-line no-console
      console.log(
        chalk.yellow('Make sure the MCP server container is running:\n'),
      );
      // eslint-disable-next-line no-console
      console.log(chalk.dim(`  docker ps | grep ${containerName}\n`));
      process.exit(1);
    }
  }

  /**
   * Setup readline handlers
   */
  private setupHandlers() {
    this.rl.on('line', async (line) => {
      const query = line.trim();

      // Exit commands
      if (query === 'exit' || query === 'quit') {
        await this.shutdown();
        return;
      }

      // Skip empty queries
      if (!query) {
        this.rl.prompt();
        return;
      }

      // Process query
      if (this.agent) {
        try {
          const response = await this.agent.processQuery(query);
          // eslint-disable-next-line no-console
          console.log(response);
        } catch (error: any) {
          // eslint-disable-next-line no-console
          console.error(Formatter.formatError(error));
        }
      }

      this.rl.prompt();
    });

    this.rl.on('close', async () => {
      await this.shutdown();
    });

    // Handle Ctrl+C
    process.on('SIGINT', async () => {
      // eslint-disable-next-line no-console
      console.log(chalk.yellow('\n\nReceived SIGINT, shutting down...'));
      await this.shutdown();
    });
  }

  /**
   * Graceful shutdown
   */
  private async shutdown() {
    // eslint-disable-next-line no-console
    console.log(chalk.dim('\nDisconnecting from MCP server...'));

    if (this.client) {
      await this.client.disconnect();
    }

    // eslint-disable-next-line no-console
    console.log(chalk.green('✓ Goodbye!\n'));
    process.exit(0);
  }
}

// Start the CLI
const cli = new CLI();
cli.start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(chalk.red(`\n❌ Fatal error: ${error.message}\n`));
  process.exit(1);
});

import validateConfig from '@/utils/config/validate-config';
import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';
import process from 'node:process';

export type McpConfig = {
  serverName: string;
  serverVersion: string;
};

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  MCP_SERVER_NAME: string;

  @IsString()
  @IsNotEmpty()
  MCP_SERVER_VERSION: string;
}

export default registerAs<McpConfig>('mcp', () => {
  // eslint-disable-next-line no-console
  console.info(`Registering McpConfig from environment variables`);
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    serverName: process.env.MCP_SERVER_NAME || 'epicode-course-mcp',
    serverVersion: process.env.MCP_SERVER_VERSION || '1.0.0',
  };
});

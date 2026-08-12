export { apiClient } from './axios';
export * from './utils';

const dev = process.env.NODE_ENV === 'development';

export function isDevelopment(): boolean {
  return dev;
}

export function getEnvVar(key: string): string | undefined {
  return process.env[key];
}

export function getRequiredEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

import 'reflect-metadata';
import container from './config/container';
import Logger from './logging/logger';
import { TYPES } from './config/types';
import Server from './server';

const server = container.get<Server>(TYPES.Server);

(async (): Promise<void> => {
    await server.start().catch(Logger.error);
  })();

import express from 'express'

import Settings from './config/settings';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error';
import { inject, injectable } from 'inversify';
import { TYPES } from './config/types';
import DataFetcherRoutes from './routes/data-fetcher-routes';
import Logger from './logging/logger';
import DbConnect from './config/db-connect';

/**
 * A small wrapper around an express server.
 */
@injectable()
class Server {
  public app: express.Express;

  constructor(
    @inject(TYPES.DataFetcherRoutes)
    private routes: DataFetcherRoutes,
  ) {
    this.app = express();

    this.app.use(express.json());

    // set up routes
    this.app.use(this.routes.configureRoutes());

    // set up error/404 handlers
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);

    DbConnect.connect();
  }

  public async start(): Promise<void> {
    new Promise(() => {
      this.app.listen(Settings.port, () => {
        Logger.info(`Server started listening on port ${Settings.port}...`);
      })
    })
  }
}

export default Server;

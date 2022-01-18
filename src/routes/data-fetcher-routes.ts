import Router from 'express-promise-router'
import { injectable, inject } from 'inversify';
import { TYPES } from '../config/types';
import DataFetcherController from '../controllers/data-fetcher.controller';

@injectable()
class DataFetcherRoutes {

  constructor(
    @inject(TYPES.DataFetcherController)
    private controller: DataFetcherController,
  ) { }

  configureRoutes() {
    const routes = Router();

    routes.post('/info', this.controller.fetch);

    return routes;
  };
}

export default DataFetcherRoutes;

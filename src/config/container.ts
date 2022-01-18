import { Container } from 'inversify';
import DataFetcherController from '../controllers/data-fetcher.controller';
import DbRepository from '../repository/data-fetcher.repository';
import { Repository } from '../repository/types';
import DataFetcherRoutes from '../routes/data-fetcher-routes';
import Server from '../server';
import DatafetcherService from '../services/data-fetcher.service';
import { TYPES } from './types';

export const makeMainContainer = (): Container => {
  const container = new Container();

  container.bind<Repository>(TYPES.DbRepository)
    .to(DbRepository)
    .inSingletonScope();

  container.bind<DatafetcherService>(TYPES.DataFetcherService)
    .to(DatafetcherService);

  container.bind<DataFetcherController>(TYPES.DataFetcherController)
    .to(DataFetcherController);

  container.bind<Server>(TYPES.Server)
    .to(Server)
    .inSingletonScope();

  container.bind<DataFetcherRoutes>(TYPES.DataFetcherRoutes)
    .to(DataFetcherRoutes);

  return container;
};

const container = makeMainContainer();

export default container;

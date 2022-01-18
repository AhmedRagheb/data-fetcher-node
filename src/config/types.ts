const routes = {
  DataFetcherRoutes: Symbol.for('DataFetcherRoutes'),
};

const controllers = {
  DataFetcherController: Symbol.for('DataFetcherController'),
};

const services = {
  DataFetcherService: Symbol.for('DataFetcherService'),
};

const repositories = {
  DbRepository: Symbol.for('DbRepository'),
};

const host = {
  Server: Symbol.for('Server'),
};

const TYPES = {
  Container: Symbol.for('Container'),

  ...host,
  ...routes,
  ...controllers,
  ...services,
  ...repositories,
};

export {
  TYPES,
};

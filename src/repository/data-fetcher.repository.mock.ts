import { injectable } from 'inversify';
import { Repository } from './types';

@injectable()
export default class MockDbRepository implements Repository {
  get = jest.fn();
}

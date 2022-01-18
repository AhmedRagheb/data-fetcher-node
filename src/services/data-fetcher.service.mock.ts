import { injectable } from 'inversify';

@injectable()
export default class MockDatafetcherService {
  getData = jest.fn();
}

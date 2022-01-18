import { Handler } from 'express'
import { inject, injectable } from 'inversify';
import { TYPES } from '../config/types';
import { BadRequest } from '../logging/bad-request';
import { HttpCodes } from '../logging/types';
import DatafetcherService from '../services/data-fetcher.service';
import { Payload } from './types';

@injectable()
class DataFetcherController {
  constructor(
    @inject(TYPES.DataFetcherService)
    private service: DatafetcherService,
  ) { }

  /**
   * This function comment is parsed by doctrine
   * @route POST /info
   * @group get data from db
   * @returns {object} 200
   * @returns {BadRequest}
   */
  fetch: Handler = async (
    request,
    reply,
  ) => {
    const payload: Payload = request.body;

    if (!payload || Object.keys(payload).length === 0) {
      throw new BadRequest('payload is missing');
    }

    const data = await this.service.getData(payload);

    const response = {
      code: 0,
      msg: 'Success',
      records: data,
    };

    reply.status(HttpCodes.OK).json(response);
  }
};

export default DataFetcherController;

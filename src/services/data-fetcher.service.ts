import { inject, injectable } from 'inversify';
import { TYPES } from '../config/types';
import { DataFilter, IDataItem, Repository } from '../repository/types';
import { NoContent } from '../logging/no-content';
import { Payload } from '../controllers/types';
import { isEmptyArray } from '../utils/utils';
import { RecordModel } from './types';
import { BadRequest } from '../logging/bad-request';

@injectable()
class DatafetcherService {
    constructor(
        @inject(TYPES.DbRepository)
        private repository: Repository
    ) { }

    async getData(payload: Payload): Promise<RecordModel[]> {
        const filter: DataFilter = {
            startDate: payload.startDate,
            endDate: payload.endDate,
            minCount: payload.minCount,
            maxCount: payload.maxCount,
        };

        this.validateFilterData(filter);

        const data = await this.repository.get(filter);

        if (isEmptyArray(data)) {
            throw new NoContent('no data found with this filters');
        }

        const result = this.mapDateItemsToRecordsModel(data);

        return result;
    }

    private mapDateItemsToRecordsModel(data: IDataItem[]): RecordModel[] {
        const result = [...data.reduce((records: Map<string, RecordModel>, item: IDataItem) => {
            const key = item.key;
            const record = records.get(key) || Object.assign({
                key: item.key,
                createdAt: item.createdAt,
                totalCount: 0,
            });
            
            record.totalCount += this.sumCounts(item.counts);
          
            return records.set(key, record);
          }, new Map).values()];

        return result;  
    }

    private sumCounts = (counts: [number]): number => counts.reduce(function(a, b){
        return a + b;
    }, 0);

    private validateFilterData(filter: DataFilter) {
        if (filter.startDate > filter.endDate) {
            throw new BadRequest('startDate gt endDate');
        }

        if (filter.minCount > filter.maxCount) {
            throw new BadRequest('minCount gt maxCount');
        }

        if (filter.minCount < 0 || filter.maxCount < 0) {
            throw new BadRequest('minCount and maxCount should be gt 0');
        }
    }
}

export default DatafetcherService;

import { injectable } from 'inversify';
import Records, { DataFilter, IDataItem, Repository } from './types';

@injectable()
class DbRepository implements Repository {
    async get(dataFilter: DataFilter): Promise<IDataItem[]> {
        return Records.find({
            $and: [
                { createdAt: { $gte: dataFilter.startDate, $lte: dataFilter.endDate } },
                { counts: { $gte: dataFilter.minCount, $lte: dataFilter.maxCount } },
            ]
        }).then((data: IDataItem[]) => {
            return data;
        }).catch((error: Error) => {
            throw error;
        });
    }
}

export default DbRepository;

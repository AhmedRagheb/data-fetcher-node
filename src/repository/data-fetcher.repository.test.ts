import DbRepository from './data-fetcher.repository';
import { DbMock } from './db-mock';
import Records, { DataFilter } from './types';

describe('Db Repository', () => {
    beforeAll(async () => {
        await DbMock.initDbMock();
    });

    afterAll(async () => {
        await DbMock.stopDbMock();
    });

    test('Should validate that find method has been called with right params', async () => {
        const repository = new DbRepository();

        const dataFilter: DataFilter = {
            startDate: new Date("2016-01-26"),
            endDate: new Date("2018-02-02"),
            minCount: 2700,
            maxCount: 3000
        };

        const mockSpy = jest.spyOn(Records, 'find');
        await repository.get(dataFilter);

        const expected = {
            $and: [
                { createdAt: { $gte: dataFilter.startDate, $lte: dataFilter.endDate } },
                { counts: { $gte: dataFilter.minCount, $lte: dataFilter.maxCount } },
            ]
        };
    
        expect(mockSpy).toHaveBeenCalledWith(expected);
    });
});

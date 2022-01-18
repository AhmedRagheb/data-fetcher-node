import { Payload } from "../controllers/types";
import MockDbRepository from "../repository/data-fetcher.repository.mock";
import DatafetcherService from "./data-fetcher.service";

describe('DatafetcherService', () => {
    const dbRepositoryMock = new MockDbRepository();
    const target = new DatafetcherService(
        dbRepositoryMock,
    );

    test('should return data items with right filter', async () => {
        // given
        const data = [{
            key: "TAKwGc6Jr4i8Z487",
            createdAt: "2017-01-28T01:22:14.398Z",
            counts: [1, 2]
        },
        {
            key: "NAeQ8eX7e5TEg7oH",
            createdAt: "2017-01-27T08:19:14.135Z",
            counts: [2, 3, 4]
        },
        {
            key: "TAKwGc6Jr4i8Z487",
            createdAt: "2017-01-28T01:22:14.398Z",
            counts: [5]
        },
        {
            key: "NAeQ8eX7e5TEg7oH",
            createdAt: "2017-01-27T08:19:14.135Z",
            counts: []
        }];

        const payload = {
            startDate: new Date("2016-01-26"),
            endDate: new Date("2018-02-02"),
            minCount: 1,
            maxCount: 10
        };

        const expected = [{
            key: "TAKwGc6Jr4i8Z487",
            createdAt: "2017-01-28T01:22:14.398Z",
            totalCount: 8
        },
        {
            key: "NAeQ8eX7e5TEg7oH",
            createdAt: "2017-01-27T08:19:14.135Z",
            totalCount: 9
        }];

        dbRepositoryMock.get.mockResolvedValueOnce(data);

        // when
        const result = await target.getData(payload);

        // then
        expect(dbRepositoryMock.get).toHaveBeenLastCalledWith(payload);
        expect(result).toEqual(expected);
    });

    test('should throw an error if data not found', async () => {
        // given
        dbRepositoryMock.get.mockResolvedValueOnce(undefined);

        // then
        expect(target.getData({} as Payload))
            .rejects.toThrowError('no data found with this filters');
    });

    test('should throw an error if min gt max', async () => {
        // given
        const payload = {
            startDate: new Date("2016-01-26"),
            endDate: new Date("2018-02-02"),
            minCount: 10,
            maxCount: 1
        };

        // then
        expect(target.getData(payload))
            .rejects.toThrowError('minCount gt maxCount');
    });
});

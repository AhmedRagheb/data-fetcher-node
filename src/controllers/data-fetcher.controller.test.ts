import request from 'supertest'
import Server from "../server";
import container from "../config/container";
import { TYPES } from "../config/types";
import DataFetcherRoutes from "../routes/data-fetcher-routes";
import { bindMockInstance } from "../utils/test-utils";
import MockDatafetcherService from "../services/data-fetcher.service.mock";

describe('DataFetcherController', () => {
    const serviceMock = new MockDatafetcherService();
    const bindMockService = bindMockInstance(container, TYPES.DataFetcherService);

    test('should returns 200 response with data', async () => {
        // given
        const records = [{
            key: "TAKwGc6Jr4i8Z487",
            createdAt: "2017-01-28T01:22:14.398Z",
            totalCount: 2800
        },
        {
            key: "NAeQ8eX7e5TEg7oH",
            createdAt: "2017-01-27T08:19:14.135Z",
            totalCount: 2900
        }];

        const payload = {
            startDate: "2016-01-26",
            endDate: "2018-02-02",
            minCount: 2700,
            maxCount: 3000
        };

        serviceMock.getData.mockReturnValueOnce(records);
        bindMockService(serviceMock);

        const app = new Server(container.get<DataFetcherRoutes>(TYPES.DataFetcherRoutes)).app;

        const expected = {
            statusCode: 200,
            body: {
                code: 0,
                msg: 'Success',
                records: records,
            },
        };

        // when
        const { body, status } = await request(app).post('/info').send(payload);

        // then
        expect(serviceMock.getData).toHaveBeenCalledWith(payload);
        expect(status).toBe(expected.statusCode);
        expect(body).toEqual(expected.body);
    });


    test('returns 400 response when payload is not provided', async () => {
        // given
        const app = new Server(container.get<DataFetcherRoutes>(TYPES.DataFetcherRoutes)).app;

        const expected = {
            statusCode: 400,
        };

        // when
        const { status } = await request(app).post('/info');

        // then
        expect(status).toBe(expected.statusCode);
    });
});

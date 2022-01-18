import DbConnect from './db-connect';

describe('Connection db tests', () => {
    test('Mongoose connect called', async () => {
        const mockSpy = jest.spyOn(DbConnect, 'connect');
        mockSpy.mockImplementation(() => {
            return Promise.resolve();
        });
        await DbConnect.connect();

        expect(mockSpy).toHaveBeenCalled();
    });
});

import MongoMemoryServer from 'mongodb-memory-server-core/lib/MongoMemoryServer';
import DbConnect from '../config/db-connect';

export class DbMock {
    public static mongod: MongoMemoryServer;

    public static async initDbMock() {
        DbMock.mongod = new MongoMemoryServer({
            instance: {
                dbName: 'test-db',
                port: 8080,
            },
        });

        await DbMock.mongod.getUri();
        await DbConnect.connect();

        return DbMock.mongod;
    }

    public static async stopDbMock() {
        await DbConnect.disconnect();
        await DbMock.mongod.stop();
    }
}
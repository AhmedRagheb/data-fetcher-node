import MongoMemoryServer from 'mongodb-memory-server-core/lib/MongoMemoryServer';
import DbConnect from '../config/db-connect';

export class DbMock {
    public static mongod: MongoMemoryServer;

    public static async initDbMock() {
        DbMock.mongod = new MongoMemoryServer({
            instance: {
                port: 8080,
            },
        });

        await DbConnect.connect();

        return DbMock.mongod;
    }

    public static async stopDbMock() {
        await DbConnect.disconnect();
        await DbMock.mongod.stop();
    }
}

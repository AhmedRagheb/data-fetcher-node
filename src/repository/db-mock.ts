import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const mongod = new MongoMemoryServer();

export class DbMock {
    public static async initDbMock() {
        const uri = await mongod.getUri();

        const mongooseOpts = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        };

        await mongoose.connect(uri, mongooseOpts);

        return mongod;
    }

    public static async stopDbMock() {
        await mongod.stop();
    }
}

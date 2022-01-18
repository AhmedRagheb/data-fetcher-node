import mongoose from 'mongoose';
import Logger from '../logging/logger';
import Settings from './settings';

export default class DbConnect {
    public static async connect() {
        const connStr = Settings.connnectionstring;
        return await mongoose.connect(connStr)
            .then((db) => {
                Logger.info(`Successfully connected to ${connStr}`);
            })
            .catch((error) => {
                Logger.error('Error connecting to database: ', error);
            });
    }

    public static async disconnect() {
        await mongoose.connection.close();
    }
}

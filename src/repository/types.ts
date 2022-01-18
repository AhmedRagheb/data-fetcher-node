import mongoose, { Schema } from 'mongoose';

export type DataFilter = {
    startDate: Date,
    endDate: Date,
    minCount: number,
    maxCount: number,
}

export interface IDataItem {
    key: string;
    createdAt: Date;
    counts: [number];
    value: string;
}

const schema: Schema = new Schema({
    key: { type: Schema.Types.String },
    createdAt: { type: Schema.Types.Date },
    counts: { type: Schema.Types.Array },
});

export default mongoose.model<IDataItem>('records', schema);

export interface Repository {
    get(dataFilter: DataFilter): Promise<IDataItem[]>;
}

import { HydratedDocument, Schema } from 'mongoose';

export type Cat = {
  name?: string;
  age: number;
  email: string;
};

export type CatDocument = HydratedDocument<Cat>;

export const CatSchema = new Schema<Cat>({
  name: { type: String },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});

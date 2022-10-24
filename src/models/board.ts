import mongoose, { Schema, Document } from "mongoose";
import { INote } from "./note";
import { IUser } from "./user";

export interface IBoard extends Document {
  _id?: Schema.Types.ObjectId;
  notes?: Schema.Types.ObjectId[];
  admin: Schema.Types.ObjectId;
  viwer?: Schema.Types.ObjectId[];
}

const boardSchema: Schema = new Schema(
  {
    // id: { type: Schema.Types.ObjectId, required: true, unique: true },
    notes: [{ type: Schema.Types.ObjectId, ref: "note", required: false }],
    admin: { type: Schema.Types.ObjectId, ref: "user", required: true },
    viwer: [{ type: Schema.Types.ObjectId, ref: "user", required: false }],
  },
  { timestamps: true }
);

const board = mongoose.model<IUser>("board", boardSchema);

module.exports = board;

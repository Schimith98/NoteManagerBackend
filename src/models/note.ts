import mongoose, { Schema, Document } from "mongoose";
import { IBoard } from "./board";
export interface INote extends Document {
  _id?: Schema.Types.ObjectId;
  title: String;
  description: String;
  board: Schema.Types.ObjectId;
}

const noteSchema: Schema = new Schema(
  {
    // _id: { type: Schema.Types.ObjectId, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    board: { type: Schema.Types.ObjectId, ref: "board", required: true },
  },
  { timestamps: true }
);

const note = mongoose.model<INote>("note", noteSchema);

module.exports = note;

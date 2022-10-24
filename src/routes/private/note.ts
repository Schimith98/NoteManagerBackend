import express, { Request, Response } from "express";
import { Schema } from "mongoose";

import { note as noteController } from "../../controllers/note";
import { checkToken } from "../../validations/checkToken";
import { checkNoteBody } from "../../validations/note";

const noteRouter = express.Router();

noteRouter.post(
  "/note",
  checkToken,
  checkNoteBody.createNote,
  async (request: Request, response: Response) => {
    await noteController.createNote(request, response);
  }
);

noteRouter.post(
  "/notes",
  checkToken,
  checkNoteBody.readAll,
  async (request: Request, response: Response) => {
    await noteController.readAll(request, response);
  }
);

noteRouter.put(
  "/note",
  checkToken,
  checkNoteBody.updateOne,
  async (request: Request, response: Response) => {
    await noteController.updateOne(request, response);
  }
);

noteRouter.delete(
  "/note",
  checkToken,
  checkNoteBody.delete,
  async (request: Request, response: Response) => {
    await noteController.delete(request, response);
  }
);

export default noteRouter;

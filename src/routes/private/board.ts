import express, { Request, Response } from "express";
import { Schema } from "mongoose";

import { board as boardController } from "../../controllers/board";
import { checkBoardBody } from "../../validations/board";
import { checkToken } from "../../validations/checkToken";

const boardRouter = express.Router();

boardRouter.post(
  "/board",
  checkToken,
  checkBoardBody.adminId,
  async (request: Request, response: Response) => {
    await boardController.createBoard(request, response);
  }
);

boardRouter.get(
  "/board",
  checkToken,
  checkBoardBody.boardId,
  async (request: Request, response: Response) => {
    await boardController.readOneBoard(request, response);
  }
);

boardRouter.post(
  "/adminboards",
  checkToken,
  checkBoardBody.adminId,
  async (request: Request, response: Response) => {
    await boardController.readAllAdminBoards(request, response);
  }
);

boardRouter.post(
  "/viwerboards",
  checkToken,
  checkBoardBody.viwerId,
  async (request: Request, response: Response) => {
    await boardController.readAllViwerBoards(request, response);
  }
);

boardRouter.delete(
  "/board",
  checkToken,
  checkBoardBody.delete,
  async (request: Request, response: Response) => {
    await boardController.deleteBoard(request, response);
  }
);

boardRouter.put(
  "/board/addviwer",
  checkToken,
  checkBoardBody.addViwer,
  async (request: Request, response: Response) => {
    await boardController.addViwer(request, response);
  }
);

boardRouter.delete(
  "/board/delviwer",
  checkToken,
  checkBoardBody.deleteViwer,
  async (request: Request, response: Response) => {
    await boardController.removeViwer(request, response);
  }
);

export default boardRouter;

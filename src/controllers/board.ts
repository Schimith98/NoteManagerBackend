import { Request, Response } from "express";
import { IBoard } from "../models/board";
import { IUser } from "../models/user";

const boardModel = require("../models/board");
const userModel = require("../models/user");
const noteModel = require("../models/note");

const board = {
  createBoard: async (request: Request, response: Response) => {
    try {
      const admin = request.body.admin;

      //create board
      const board = new boardModel({ admin });
      const newBoard = await board.save();

      //update user
      const user = await userModel.findOneAndUpdate(
        { _id: admin },
        { $addToSet: { adminBoards: board._id } },
        {
          new: true,
        }
      );

      response
        .status(201)
        .json({ msg: "Quadro criado com sucesso!", newBoard });

      return board;
    } catch (error) {
      // console.log(error);
      response.status(500).json({ msg: "Falha ao criar!", error });
    }
  },

  readOneBoard: async (request: Request, response: Response) => {
    try {
      const _id = request.body._id;
      const board = await boardModel.findById({ _id });
      response
        .status(201)
        .json({ msg: "Quadro encontrado com sucesso!", board });
    } catch (error) {
      response.status(500).json({ msg: "Falha na procura!", error });
    }
  },
  readAllAdminBoards: async (request: Request, response: Response) => {
    try {
      const { admin } = request.body;
      const boards = await boardModel.find({ admin });
      response
        .status(201)
        .json({ msg: "Quadros encontrados com sucesso!", boards });
    } catch (error) {
      response.status(500).json({ msg: "Falha na procura!", error });
    }
  },
  readAllViwerBoards: async (request: Request, response: Response) => {
    try {
      const { viwer } = request.body;
      const boards = await boardModel.find({ viwer });
      response
        .status(201)
        .json({ msg: "Quadros encontrados com sucesso!", boards });
    } catch (error) {
      response.status(500).json({ msg: "Falha na procura!", error });
    }
  },

  deleteBoard: async (request: Request, response: Response) => {
    try {
      const _id = request.body.data._id;
      //delete board
      const board = await boardModel.findByIdAndRemove({ _id });
      //update user
      await userModel.findOneAndUpdate(
        { _id: board.admin },
        { $pull: { adminBoards: board._id } },
        {
          new: true,
        }
      );

      //update note
      const note = await noteModel.deleteMany({ board: _id });
      // console.log(note);

      response.status(201).json({ msg: "Quadro excluído com sucesso!", board });
    } catch (error) {
      response.status(500).json({ msg: "Falha ao excluir!", error });
    }
  },

  addViwer: async (request: Request, response: Response) => {
    try {
      const { _id, viwer } = request.body;

      //update board
      const board = await boardModel.findOneAndUpdate(
        { _id },
        { $addToSet: { viwer: viwer } },
        {
          new: true,
        }
      );

      //update user
      const user = await userModel.findOneAndUpdate(
        { _id },
        { $addToSet: { viwerBoards: _id } },
        {
          new: true,
        }
      );

      response
        .status(201)
        .json({ msg: "Visualizador adicionado com sucesso!", board });
    } catch (error) {
      response.status(500).json({ msg: "Falha ao adicionar!", error });
    }
  },

  removeViwer: async (request: Request, response: Response) => {
    try {
      const { _id, viwer } = request.body.data;

      //update board
      const board = await boardModel.findOneAndUpdate(
        { _id },
        { $pull: { viwer: viwer } },
        {
          new: true,
        }
      );

      //update user
      const user = await userModel.findOneAndUpdate(
        { viwerBoards: viwer },
        { $pull: { viwerBoards: viwer } },
        {
          new: true,
        }
      );

      response
        .status(201)
        .json({ msg: "Visualizador removido com sucesso!", board });
    } catch (error) {
      response.status(500).json({ msg: "Falha ao adicionar!", error });
    }
  },
};

export { board };

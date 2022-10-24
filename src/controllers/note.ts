import { Request, Response } from "express";
import { IBoard } from "../models/board";

const noteModel = require("../models/note");
const boardModel = require("../models/board");

const note = {
  createNote: async (request: Request, response: Response) => {
    try {
      const { title, description, board } = request.body;
      console.log(title, description, board);
      //create Note
      const note = new noteModel({ title, description, board });
      const newNote = await note.save();

      //update board (add note to board)
      const newBoard = await boardModel.findOneAndUpdate(
        { _id: board },
        { $addToSet: { notes: newNote._id } },
        {
          new: true,
        }
      );

      response.status(201).json({ msg: "Nota criada com sucesso!", newNote });
    } catch (error) {
      // console.log(error);
      response.status(500).json({ msg: "Falha ao criar!", error });
    }
  },
  readAll: async (request: Request, response: Response) => {
    try {
      const { board } = request.body;

      const notes = await noteModel.find({ board });
      response
        .status(201)
        .json({ msg: "Notas encontradas com sucesso!", notes });
    } catch (error) {
      response.status(500).json({ msg: "Falha na procura!", error });
    }
  },
  updateOne: async (request: Request, response: Response) => {
    try {
      const { _id, title, description } = request.body;

      const note = await noteModel.findOneAndUpdate(
        { _id },
        { title, description },
        {
          new: true,
        }
      );

      response.status(201).json({ msg: "Nota atualizada com sucesso!", note });
    } catch (error) {
      response.status(500).json({ msg: "Falha na procura!", error });
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { _id } = request.body.data;
      const note = await noteModel.findByIdAndRemove({ _id });
      response.status(201).json({ msg: "Nota excluída com sucesso!", note });
    } catch (error) {
      response.status(500).json({ msg: "Falha na procura!", error });
    }
  },
};

export { note };

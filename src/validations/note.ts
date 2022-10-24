import express, { Request, Response } from "express";

export const checkNoteBody = {
  createNote: (request: Request, response: Response, next: any) => {
    const { title, description, board } = request.body;
    if (!title) {
      return response.status(422).json({ msg: "O título é obrigatório!" });
    } else if (!description) {
      return response.status(422).json({ msg: "A descrição é obrigatório!" });
    } else if (!board) {
      return response
        .status(422)
        .json({ msg: "O id do quadro é obrigatório!" });
    } else {
      next();
    }
  },
  readAll: (request: Request, response: Response, next: any) => {
    const { board } = request.body;
    if (!board) {
      return response
        .status(422)
        .json({ msg: "O id do quadro é obrigatório!" });
    } else {
      next();
    }
  },
  updateOne: (request: Request, response: Response, next: any) => {
    const { _id, title, description } = request.body;

    if (!title) {
      return response.status(422).json({ msg: "O título é obrigatório!" });
    } else if (!_id) {
      return response.status(422).json({ msg: "O id é obrigatório!" });
    } else if (!description) {
      return response.status(422).json({ msg: "A descrição é obrigatório!" });
    } else {
      next();
    }
  },
  delete: (request: Request, response: Response, next: any) => {
    const { _id } = request.body.data;
    if (!_id) {
      return response.status(422).json({ msg: "O id é obrigatório!" });
    } else {
      next();
    }
  },
};

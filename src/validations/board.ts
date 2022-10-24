import express, { Request, Response } from "express";

export const checkBoardBody = {
  adminId: (request: Request, response: Response, next: any) => {
    const { admin } = request.body;
    if (!admin) {
      return response
        .status(422)
        .json({ msg: "O id do usuário é obrigatório!" });
    } else {
      next();
    }
  },
  viwerId: (request: Request, response: Response, next: any) => {
    const { viwer } = request.body;
    if (!viwer) {
      return response
        .status(422)
        .json({ msg: "O id do usuário é obrigatório!" });
    } else {
      next();
    }
  },
  boardId: (request: Request, response: Response, next: any) => {
    const { _id } = request.body;
    if (!_id) {
      return response
        .status(422)
        .json({ msg: "O id do quadro é obrigatório!" });
    } else {
      next();
    }
  },
  delete: (request: Request, response: Response, next: any) => {
    // console.log(request);
    const { _id } = request.body.data;
    if (!_id) {
      return response
        .status(422)
        .json({ msg: "O id do quadro é obrigatório!" });
    } else {
      next();
    }
  },

  addViwer: (request: Request, response: Response, next: any) => {
    const { _id, viwer } = request.body;
    if (!_id) {
      return response
        .status(422)
        .json({ msg: "O id do quadro é obrigatório!" });
    } else if (!viwer) {
      return response
        .status(422)
        .json({ msg: "O id do usuário visualizador é obrigatório!" });
    } else {
      next();
    }
  },

  deleteViwer: (request: Request, response: Response, next: any) => {
    const { _id, viwer } = request.body.data;
    if (!_id) {
      return response
        .status(422)
        .json({ msg: "O id do quadro é obrigatório!" });
    } else if (!viwer) {
      return response
        .status(422)
        .json({ msg: "O id do usuário visualizador é obrigatório!" });
    } else {
      next();
    }
  },
};

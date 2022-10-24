import express, { Request, Response } from "express";

export const checkUserBody = (
  request: Request,
  response: Response,
  next: any
) => {
  const { name, email, password } = request.body;
  if (!name) {
    return response.status(422).json({ msg: "O nome é obrigatório!" });
  } else if (!email) {
    return response.status(422).json({ msg: "O email é obrigatório!" });
  } else if (!password) {
    return response.status(422).json({ msg: "A senha é obrigatória!" });
  } else {
    next();
  }
};

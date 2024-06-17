import { Request, Response } from "express";

const home = (req: Request, res: Response) => {
  res.send("hello world!");
};

export default home;

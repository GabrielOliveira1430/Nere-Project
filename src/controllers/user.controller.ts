import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  async me(req: any, res: Response) {
    try {
      const id = req.user.id;
      const user = await userService.getById(id);
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}

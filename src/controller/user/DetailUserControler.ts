import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserControler {
  async handle(req: Request, res: Response) {
    const userId = req.userId;
    const detailUserService = new DetailUserService();
    const user = await detailUserService.execute(userId);

    res.status(200).json(user);
  }
}

export { DetailUserControler };

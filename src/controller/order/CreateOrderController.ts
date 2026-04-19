import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { table, name } = req.body;

    const createOrderService = new CreateOrderService();

    try {
      const order = await createOrderService.execute({ table: Number(table), name });

      return res.status(201).json(order);
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Erro ao criar pedido",
      });
    }
  }
}

export { CreateOrderController };

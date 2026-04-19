import { Request, Response } from "express";
import { AddItemOrderService } from "../../services/order/AddItemOrderService";

class AddItemController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body;

    const addItemOrderService = new AddItemOrderService();

    try {
      const item = await addItemOrderService.execute({
        order_id,
        product_id,
        amount,
      });

      return res.status(201).json(item);
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message === "Pedido não encontrado" ||
          error.message === "Produto não encontrado")
      ) {
        return res.status(404).json({ error: error.message });
      }

      if (
        error instanceof Error &&
        error.message === "Pedido já foi finalizado"
      ) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao adicionar item ao pedido",
      });
    }
  }
}

export { AddItemController };

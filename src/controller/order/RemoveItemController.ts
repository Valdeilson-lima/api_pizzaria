import { Request, Response } from "express";
import { RemoveItemOrderService } from "../../services/order/RemoveItemOrderService";

class RemoveItemController {
  async handle(req: Request, res: Response) {
    const item_id = req.query.item_id as string;

    const removeItemOrderService = new RemoveItemOrderService();

    try {
      const result = await removeItemOrderService.execute({ item_id });

      return res.status(200).json(result);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Item do pedido não encontrado"
      ) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao remover item do pedido",
      });
    }
  }
}

export { RemoveItemController };

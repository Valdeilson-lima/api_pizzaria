import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;

    const finishOrderService = new FinishOrderService();

    try {
      const updatedOrder = await finishOrderService.execute({
        order_id: order_id,
      });

      return res.status(200).json(updatedOrder);
    } catch (error) {
      if (error instanceof Error && error.message === "Pedido não encontrado") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(400).json({
        error:
          error instanceof Error ? error.message : "Erro ao finalizar pedido",
      });
    }
  }
}

export { FinishOrderController };

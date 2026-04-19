import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, name } = req.body;

    const sendOrderService = new SendOrderService();

    try {
      const order = await sendOrderService.execute({ order_id, name });

      return res.status(200).json(order);
    } catch (error) {
      if (error instanceof Error && error.message === "Pedido não encontrado") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao enviar pedido para a cozinha",
      });
    }
  }
}

export { SendOrderController };
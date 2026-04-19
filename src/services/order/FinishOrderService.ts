
import prismaClient from "../../prisma";

interface FinishOrderProps {
  order_id: string;
}

class FinishOrderService {
  async execute({ order_id }: FinishOrderProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!order) {
        throw new Error("Pedido não encontrado");
      }

      const updatedOrder = await prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          status: true,
        },
        select: {
          id: true,
          table: true,
          name: true,
          status: true,
          draft: true,
          createdAt: true,
        },
      });

      return { updatedOrder, message: "Pedido finalizado com sucesso" };
    } catch (error) {
      throw new Error(
        "Erro ao finalizar pedido: " +
          (error instanceof Error ? error.message : "Erro desconhecido"),
      );
    }
  }
}

export { FinishOrderService };

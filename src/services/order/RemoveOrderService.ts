import prismaClient from "../../prisma";

interface RemoveOrderServiceProps {
  order_id: string;
}

class RemoveOrderService {
  async execute({ order_id }: RemoveOrderServiceProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
        select: {
          id: true,
        },
      });

      if (!order) {
        throw new Error("Pedido não encontrado");
      }

      const itemsCount = await prismaClient.orderItem.count({
        where: {
          order_id,
        },
      });

      await prismaClient.order.delete({
        where: {
          id: order_id,
        },
      });

      if (itemsCount > 0) {
        return {
          message: "Pedido e itens vinculados removidos com sucesso",
        };
      }

      return { message: "Pedido removido com sucesso" };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Erro ao remover pedido",
      );
    }
  }
}

export { RemoveOrderService };
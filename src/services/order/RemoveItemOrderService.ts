import prismaClient from "../../prisma";

interface RemoveItemOrderServiceProps {
  item_id: string;
}

class RemoveItemOrderService {
  async execute({ item_id }: RemoveItemOrderServiceProps) {
    try {
      const item = await prismaClient.orderItem.findFirst({
        where: {
          id: item_id,
        },
        select: {
          id: true,
        },
      });

      if (!item) {
        throw new Error("Item do pedido não encontrado");
      }

      await prismaClient.orderItem.delete({
        where: {
          id: item_id,
        },
      });

      return { message: "Item removido com sucesso" };
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Erro ao remover item do pedido",
      );
    }
  }
}

export { RemoveItemOrderService };

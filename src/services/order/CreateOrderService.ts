import prismaClient from "../../prisma";

interface CreateOrderServiceProps {
  table: number;
  name?: string;
}

class CreateOrderService {
  async execute({ table, name }: CreateOrderServiceProps) {
    try {
      const existingOrderForTable = await prismaClient.order.findFirst({
        where: {
          table,
          status: false,
        },
        select: {
          id: true,
        },
      });

      if (existingOrderForTable) {
        throw new Error("Ja existe um pedido ativo para esta mesa");
      }

      const order = await prismaClient.order.create({
        data: {
          table,
          name,
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

      return order;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Erro ao criar pedido",
      );
    }
  }
}

export { CreateOrderService };

import prismaClient from "../../prisma";

interface DetailOrderServiceProps {
  order_id: string;
}

class DetailOrderService {
  async execute({ order_id }: DetailOrderServiceProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
        select: {
          id: true,
          table: true,
          name: true,
          status: true,
          draft: true,
          createdAt: true,
          updatedAt: true,
          items: {
            select: {
              id: true,
              amount: true,
              order_id: true,
              product_id: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  price: true,
                  banner: true,
                },
              },
            },
          },
        },
      });

      if (!order) {
        throw new Error("Pedido não encontrado");
      }

      return order;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Erro ao detalhar pedido",
      );
    }
  }
}

export { DetailOrderService };

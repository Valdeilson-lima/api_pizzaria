import prismaClient from "../../prisma";

interface ItemProps {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemOrderService {
  async execute({ order_id, product_id, amount }: ItemProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
        select: {
          id: true,
          status: true,
        },
      });

      if (!order) {
        throw new Error("Pedido não encontrado");
      }

      if (order.status) {
        throw new Error("Pedido já foi finalizado");
      }

      const product = await prismaClient.product.findFirst({
        where: {
          id: product_id,
          disable: false,
        },
        select: {
          id: true,
          name: true,
          price: true,
        },
      });

      if (!product) {
        throw new Error("Produto não encontrado");
      }

      const item = await prismaClient.orderItem.create({
        data: {
          order_id: order_id,
          product_id: product_id,
          amount: amount,
        },
        select: {
          id: true,
          order_id: true,
          product_id: true,
          amount: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              banner: true,
            },
          },
        },
      });

      return item;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Erro ao adicionar item ao pedido",
      );
    }
  }
}

export { AddItemOrderService };

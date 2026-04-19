import prismaClient from "../../prisma";

interface SendOrderProps {
  name: string;
  order_id: string;
}

class SendOrderService {
  async execute({ name, order_id }: SendOrderProps) {
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
          draft: false,
          name: name
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

      return { updatedOrder, message: "Pedido enviado com sucesso" };
    } catch (error) {
      throw new Error(
        "Erro ao enviar pedido: " +
          (error instanceof Error ? error.message : "Erro desconhecido"),
      );
    }
  }
}

export { SendOrderService };

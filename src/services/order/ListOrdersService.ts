import prismaClient from "../../prisma";

interface ListOrdersServiceProps {
  draft?: string;
}

class ListOrdersService {
  async execute({ draft }: ListOrdersServiceProps) {
    const orders = await prismaClient.order.findMany({
      where: {
        draft: draft === "true" ? true : false,
      },
      select: {
        id: true,
        table: true,
        name: true,
        status: true,
        draft: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            amount: true,
            product_id: true,
            order_id: true,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
    // Implementation for listing orders
  }
}

export { ListOrdersService };

import prismaClient from "../../prisma";

interface ListProductServiceProps {
  disabled: boolean;
}

class ListProductService {
  async execute({ disabled }: ListProductServiceProps) {
    try {
      const products = await prismaClient.product.findMany({
        where: {
          disable: disabled,
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          banner: true,
          disable: true,
          category_id: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return products;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Erro ao listar produtos",
      );
    }
  }
}

export { ListProductService };

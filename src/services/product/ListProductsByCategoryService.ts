import prismaClient from "../../prisma";

interface ListProductsByCategoryServiceProps {
  category_id: string;
}

class ListProductsByCategoryService {
  async execute({ category_id }: ListProductsByCategoryServiceProps) {
    try {
      const category = await prismaClient.category.findFirst({
        where: {
          id: category_id,
        },
        select: {
          id: true,
        },
      });

      if (!category) {
        throw new Error("Categoria não encontrada");
      }

      const products = await prismaClient.product.findMany({
        where: {
          category_id,
          disable: false,
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
        error instanceof Error
          ? error.message
          : "Erro ao listar produtos da categoria",
      );
    }
  }
}

export { ListProductsByCategoryService };

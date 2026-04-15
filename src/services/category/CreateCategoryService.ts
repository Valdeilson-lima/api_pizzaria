import prismaClient from "../../prisma";

interface CreateCategoryProps {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CreateCategoryProps) {
    try {
      const categoryAlreadyExists = await prismaClient.category.findFirst({
        where: {
          name,
        },
      });

      if (categoryAlreadyExists) {
        throw new Error("Ja existe uma categoria com esse nome");
      }

      const category = await prismaClient.category.create({
        data: {
          name,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });

      return category;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Erro ao criar categoria",
      );
    }
  }
}

export { CreateCategoryService };

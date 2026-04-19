import prismaClient from "../../prisma";

interface DeleteProductServiceProps {
  product_id: string;
}

class DeleteProductService {
  async execute({ product_id }: DeleteProductServiceProps) {
    try {
      await prismaClient.product.update({
        where: {
          id: product_id,
        },
        data: {
          disable: true,
        },
      });
      return { message: "Produto desativado com sucesso" };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Erro ao desativar produto",
      );
    }
  }
}

export { DeleteProductService };

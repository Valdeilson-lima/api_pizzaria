import prismaClient from "../../prisma";

class DetailUserService {
  async execute(userId: string) {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error("Usuario não encontrado");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      };
    } catch (error) {
      throw new Error("Erro ao detalhar usuário");
    }
  }
}

export { DetailUserService };

import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthUserProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserProps) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Usuario não encontrado");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Senha incorreta");
    }

    const token = sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "1d",
      },
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      Role: user.role,
      createdAt: user.createdAt,
      token,
    };
  }
}

export { AuthUserService };

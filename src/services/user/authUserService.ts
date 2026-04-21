import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { isValidEmail, normalizeEmail } from "../../utils/email";

interface AuthUserProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserProps) {
    if (!isValidEmail(email)) {
      throw new Error("Email inválido");
    }

    const normalizedEmail = normalizeEmail(email);

    const user = await prismaClient.user.findFirst({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      throw new Error("Email ou senha incorretos");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos");
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

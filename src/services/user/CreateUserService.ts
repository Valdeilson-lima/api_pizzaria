import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { isValidEmail, normalizeEmail } from "../../utils/email";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserProps) {
    if (!isValidEmail(email)) {
      throw new Error("Email inválido");
    }

    const normalizedEmail = normalizeEmail(email);

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: normalizedEmail,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuario já existe");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: normalizedEmail,
        password: passwordHash,
      },
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      Role: user.role,
      createdAt: user.createdAt,
    };
  }
}

export { CreateUserService };

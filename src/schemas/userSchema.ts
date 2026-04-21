import z from "zod";
import { isValidEmail } from "../utils/email";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().trim().refine(isValidEmail, { message: "Email inválido" }),
    password: z.string({ message: "A senha é obrigatória" }).min(6, "A senha deve conter pelo menos 6 caracteres"),
  }),
});


export const authUserSchema = z.object({
  body: z.object({
    email: z.string().trim().refine(isValidEmail, { message: "Email inválido" }),
    password: z.string({ message: "A senha é obrigatória" }).min(6, "A senha deve conter pelo menos 6 caracteres"),
  }),
});


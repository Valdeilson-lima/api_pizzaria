import z from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.email({ message: "Email inválido" }),
    password: z.string({ message: "A senha é obrigatória" }).min(6, "A senha deve conter pelo menos 6 caracteres"),
  }),
});


export const authUserSchema = z.object({
  body: z.object({
    email: z.email({ message: "Email inválido" }),
    password: z.string({ message: "A senha é obrigatória" }).min(6, "A senha deve conter pelo menos 6 caracteres"),
  }),
});


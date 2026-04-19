import z from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: "O numero da mesa e obrigatorio" })
      .int({ message: "O numero da mesa deve ser um inteiro valido" }),
    name: z.string().optional(),
  }),
});

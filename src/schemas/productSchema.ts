import z from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "O nome do produto é obrigatório" }),

    price: z
      .string()
      .min(1, { message: "O preço do produto é obrigatório" })
      .refine(
        (value) => {
          const price = parseInt(value, 10);
          return !isNaN(price) && price >= 0;
        },
        {
          message:
            "Preço inválido. Envie um número inteiro maior ou igual a zero.",
        },
      ),
    description: z
      .string()
      .min(1, { message: "A descrição do produto é obrigatória" }),
    category_id: z
      .string()
      .min(1, { message: "O ID da categoria é obrigatório" }),
  }),
});

export const listProductSchema = z.object({
  query: z.object({
    disabled: z.enum(["true", "false"]).optional(),
  }),
});

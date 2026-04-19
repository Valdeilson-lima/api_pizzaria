import z from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: "O numero da mesa e obrigatorio" })
      .int({ message: "O numero da mesa deve ser um inteiro valido" }),
    name: z.string().optional(),
  }),
});

export const addItemSchema = z.object({
  body: z.object({
    order_id: z.string({ message: "O ID do pedido é obrigatório" }).min(1, {
      message: "O ID do pedido é obrigatório",
    }),
    product_id: z.string({ message: "O ID do produto é obrigatório" }).min(1, {
      message: "O ID do produto é obrigatório",
    }),
    amount: z
      .number({ message: "A quantidade é obrigatória" })
      .int({ message: "A quantidade deve ser um inteiro válido" })
      .positive({ message: "A quantidade deve ser um número positivo" }),
  }),
});

export const removeItemSchema = z.object({
  query: z.object({
    item_id: z.string({ message: "O ID do item e obrigatorio" }).min(1, {
      message: "O ID do item e obrigatorio",
    }),
  }),
});

export const detailOrderSchema = z.object({
  query: z.object({
    order_id: z.string({ message: "O ID do pedido e obrigatorio" }).min(1, {
      message: "O ID do pedido e obrigatorio",
    }),
  }),
});

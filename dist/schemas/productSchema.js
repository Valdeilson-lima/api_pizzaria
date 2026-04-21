"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProductsByCategorySchema = exports.listProductSchema = exports.createProductSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProductSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().min(1, { message: "O nome do produto é obrigatório" }),
        price: zod_1.default
            .string()
            .min(1, { message: "O preço do produto é obrigatório" })
            .refine((value) => {
            const price = parseInt(value, 10);
            return !isNaN(price) && price >= 0;
        }, {
            message: "Preço inválido. Envie um número inteiro maior ou igual a zero.",
        }),
        description: zod_1.default
            .string()
            .min(1, { message: "A descrição do produto é obrigatória" }),
        category_id: zod_1.default
            .string()
            .min(1, { message: "O ID da categoria é obrigatório" }),
    }),
});
exports.listProductSchema = zod_1.default.object({
    query: zod_1.default.object({
        disabled: zod_1.default.enum(["true", "false"]).optional(),
    }),
});
exports.listProductsByCategorySchema = zod_1.default.object({
    query: zod_1.default.object({
        category_id: zod_1.default
            .string({ message: "O ID da categoria é obrigatório" })
            .min(1, { message: "O ID da categoria é obrigatório" }),
    }),
});
//# sourceMappingURL=productSchema.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishOrderSchema = exports.sendOrderSchema = exports.detailOrderSchema = exports.removeOrderSchema = exports.removeItemSchema = exports.addItemSchema = exports.createOrderSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createOrderSchema = zod_1.default.object({
    body: zod_1.default.object({
        table: zod_1.default
            .number({ message: "O numero da mesa e obrigatorio" })
            .int({ message: "O numero da mesa deve ser um inteiro valido" }),
        name: zod_1.default.string().optional(),
    }),
});
exports.addItemSchema = zod_1.default.object({
    body: zod_1.default.object({
        order_id: zod_1.default.string({ message: "O ID do pedido é obrigatório" }).min(1, {
            message: "O ID do pedido é obrigatório",
        }),
        product_id: zod_1.default.string({ message: "O ID do produto é obrigatório" }).min(1, {
            message: "O ID do produto é obrigatório",
        }),
        amount: zod_1.default
            .number({ message: "A quantidade é obrigatória" })
            .int({ message: "A quantidade deve ser um inteiro válido" })
            .positive({ message: "A quantidade deve ser um número positivo" }),
    }),
});
exports.removeItemSchema = zod_1.default.object({
    query: zod_1.default.object({
        item_id: zod_1.default.string({ message: "O ID do item e obrigatorio" }).min(1, {
            message: "O ID do item e obrigatorio",
        }),
    }),
});
exports.removeOrderSchema = zod_1.default.object({
    query: zod_1.default.object({
        order_id: zod_1.default.string({ message: "O ID do pedido e obrigatorio" }).min(1, {
            message: "O ID do pedido e obrigatorio",
        }),
    }),
});
exports.detailOrderSchema = zod_1.default.object({
    query: zod_1.default.object({
        order_id: zod_1.default.string({ message: "O ID do pedido e obrigatorio" }).min(1, {
            message: "O ID do pedido e obrigatorio",
        }),
    }),
});
exports.sendOrderSchema = zod_1.default.object({
    body: zod_1.default.object({
        order_id: zod_1.default.string({ message: "O ID do pedido e obrigatorio" }).min(1, {
            message: "O ID do pedido e obrigatorio",
        }),
        name: zod_1.default.string({ message: "O nome e obrigatorio" }).min(2, {
            message: "O nome deve ter pelo menos 2 caracteres",
        }).optional(),
    }),
});
exports.finishOrderSchema = zod_1.default.object({
    body: zod_1.default.object({
        order_id: zod_1.default.string({ message: "O ID do pedido e obrigatorio" }).min(1, {
            message: "O ID do pedido e obrigatorio",
        }),
    }),
});
//# sourceMappingURL=orderSchema.js.map
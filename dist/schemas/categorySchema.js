"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ message: "O nome da categoria é obrigatório" })
            .min(3, "O nome da categoria deve conter no mínimo 3 caracteres"),
    }),
});
//# sourceMappingURL=categorySchema.js.map
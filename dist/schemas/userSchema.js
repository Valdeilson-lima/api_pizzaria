"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUserSchema = exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().min(1, "O nome é obrigatório"),
        email: zod_1.default.email({ message: "Email inválido" }),
        password: zod_1.default.string({ message: "A senha é obrigatória" }).min(6, "A senha deve conter pelo menos 6 caracteres"),
    }),
});
exports.authUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.email({ message: "Email inválido" }),
        password: zod_1.default.string({ message: "A senha é obrigatória" }).min(6, "A senha deve conter pelo menos 6 caracteres"),
    }),
});
//# sourceMappingURL=userSchema.js.map
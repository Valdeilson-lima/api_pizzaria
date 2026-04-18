"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const isAdmin = async (req, res, next) => {
    const user_id = req.userId;
    if (!user_id) {
        return res.status(401).json({ error: "Usuário não tem permissão." });
    }
    const user = await prisma_1.default.user.findFirst({
        where: {
            id: user_id,
        },
    });
    if (!user) {
        return res.status(403).json({ error: "Acesso negado. Admins apenas." });
    }
    if (user.role !== "ADMIN") {
        return res.status(403).json({ error: "Acesso negado. Admins apenas." });
    }
    return next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=isAdmin.js.map
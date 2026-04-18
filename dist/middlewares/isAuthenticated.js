"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ message: "Token não fornecido" });
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.userId = sub;
        return next();
    }
    catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }
}
//# sourceMappingURL=isAuthenticated.js.map
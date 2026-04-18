"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUserController = void 0;
const authUserService_1 = require("../../services/user/authUserService");
class authUserController {
    async handle(req, res) {
        const { email, password } = req.body;
        const authUserService = new authUserService_1.AuthUserService();
        const result = await authUserService.execute({ email, password });
        res.status(200).json(result);
    }
}
exports.authUserController = authUserController;
//# sourceMappingURL=authUserController.js.map